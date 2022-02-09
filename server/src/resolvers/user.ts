import { registerUserToDB } from "./../actions/dbQuery";
import { COOKIE_NAME } from "../utils/constants";
import {
  validateSingleFieldFromDB,
  validateSingleField,
  validateUserInput,
  validateFieldsFromDB,
} from "../actions/validateUserFromDB";
import { MyContext } from "../types/contextType";
import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { UserResponse, UserInput } from "../types/resolvertypes";

@Resolver()
export class UserResolver {
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

    req.session.userId = user?.id;

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
    console.log("user: ", user);

    if (!user) {
      return validateSingleField("usernameOrEmail");
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return validateSingleField("password");
    }

    req.session.userId = user?.id;

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
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
