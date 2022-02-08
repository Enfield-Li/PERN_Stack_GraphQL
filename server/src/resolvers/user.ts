import { validateRegister } from "./../utils/validateRegister";
import { MyContext } from "./../types";
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { getConnection } from "typeorm";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
}

@InputType()
export class UserInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(input);
    if (errors) return { errors };

    let user;

    const hashedPassword = await argon2.hash(input.password);

    const { username, email } = input;

    try {
      // user = await User.create({
      //   username,
      //   email,
      //   password: hashedPassword,
      // }).save();
      // console.log("user: ", user);

      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();

      user = result.raw[0];

      // const result = await getConnection().query(
      //   `
      //  INSERT INTO "user"("username", "email", "password")
      //  VALUES ($1, $2, $3) RETURNING "id", "createdAt", "updatedAt"
      // `,
      //   [username, email, hashedPassword]
      // );
      // console.log("result: ", result);
      // result:  [
      //    {
      //      id: 45,
      //      createdAt: 2022-02-08T07:48:29.370Z,
      //      updatedAt: 2022-02-08T07:48:29.370Z
      //    }
      //  ]
    } catch (err) {
      if (err.detail.includes("username")) {
        return {
          errors: {
            field: "username",
            message: "Username already taken",
          },
        };
      }

      if (err.detail.includes("email")) {
        return {
          errors: {
            field: "email",
            message: "Email already taken",
          },
        };
      }
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

    if (!user) {
      return {
        errors: {
          field: "usernameOrEmail",
          message: "Username or Email doesn't exist.",
        },
      };
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      return {
        errors: {
          field: "password",
          message: "Wrong password",
        },
      };
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
}
