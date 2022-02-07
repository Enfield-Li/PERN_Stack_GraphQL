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

    const hashedPassword = await argon2.hash(input.password);

    let user;
    try {
      user = await User.create({
        username: input.username,
        email: input.email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        console.log(err);
        return {
          errors: {
            field: "username",
            message: "username already taken",
          },
        };
      }
    }

    return { user };
  }
}
