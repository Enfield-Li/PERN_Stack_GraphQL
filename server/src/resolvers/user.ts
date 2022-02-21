import argon2 from "argon2";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { v4 } from "uuid";
import {
  validateFieldsFromDB,
  validateSingleField,
  validateUserInput,
} from "../actions/validateUserFromDB";
import { User } from "../entities/User";
import { MyContext } from "../types/contextType";
import {
  PostAndUserInfo,
  UserInput,
  UserResponse,
} from "../types/resolvertypes";
import { COOKIE_NAME } from "../utils/constants";
import sendEmail from "../utils/mailer";
import { registerUserToDB } from "./../actions/dbQuery";
import { Post } from "./../entities/Post";
import { UserInputField } from "./../types/resolvertypes";
import { FORGET_PASSWORD_PREFIX } from "./../utils/constants";

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => PostAndUserInfo, { nullable: true })
  async userPost(@Root() user: User): Promise<PostAndUserInfo | null> {
    const posts = await Post.find({ where: { creatorId: user.id } });

    const postAmount = posts.length;

    return {
      posts,
      postAmount,
    };
  }

  @FieldResolver(() => String)
  async email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @Query(() => User, { nullable: true })
  async user(
    @Arg("userId", () => Int) userId: number
  ): Promise<User | undefined> {
    const user = User.findOne({ where: { id: userId } });
    if (!user) return undefined;

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateUserInput(input);
    if (errors) return { errors };

    let user;
    const { username, email } = input;

    const hashedPassword = await argon2.hash(input.password);

    try {
      const result = await registerUserToDB({
        username,
        email,
        password: hashedPassword,
      });

      user = result.raw[0];
    } catch (err) {
      const fieldError = validateFieldsFromDB(err.detail, [
        "username",
        "email",
      ]);

      return fieldError;
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) return validateSingleField("usernameOrEmail");

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) return validateSingleField("password");

    req.session.userId = user.id;

    return { user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) return undefined;

    const user = await User.findOne(req.session.userId);

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.error(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: UserInputField,
    @Ctx() { redis }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return true;

    const token = v4();

    // (method) IORedis.Commands.set(key: IORedis.KeyType,
    //   value: IORedis.ValueType,
    //   expiryMode ?: string | any[] | undefined,
    //   time ?: string | number | undefined, setMode ?: string | number | undefined): Promise <...>
    redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 // one day
    );

    sendEmail(
      email,
      `<a href=http://localhost:3998/change-password/${token}>Change password</a>`
    );

    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length < 3) return validateSingleField("password");

    const key = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: {
          field: "password",
          message: "token expired",
        },
      };
    }

    const userIdNum = parseInt(userId);

    const user = await User.findOne(userIdNum);

    if (!user) {
      return {
        errors: {
          field: "password",
          message: "user no longer exists",
        },
      };
    }

    await redis.del(key);

    await User.update(
      { id: userIdNum },
      { password: await argon2.hash(newPassword) }
    );

    // log in user after change password
    req.session.userId = user.id;

    return { user };
  }
}
