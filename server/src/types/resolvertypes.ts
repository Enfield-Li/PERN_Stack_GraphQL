import { User } from "../entities/User";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
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

export type InputField = "username" | "email" | "usernameOrEmail" | "password";

export interface ErrorResponse {
  errors: FieldError;
}
