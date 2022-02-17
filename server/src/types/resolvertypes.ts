import { Post } from "./../entities/Post";
import { User } from "../entities/User";
import { ObjectType, Field, InputType, Int } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class PostActivitiesStatusType {
  @Field({ nullable: true })
  vote: boolean;
  @Field({ nullable: true })
  like: boolean;
  @Field({ nullable: true })
  laugh: boolean;
}

@InputType()
export class InteractWithPostInput {
  @Field(() => Int)
  postId: number;
  @Field({ nullable: true })
  vote: boolean;
  @Field({ nullable: true })
  like: boolean;
  @Field({ nullable: true })
  laugh: boolean;
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field(() => Boolean, { nullable: false })
  hasMore: boolean;
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

export type UserInputField =
  | "username"
  | "email"
  | "usernameOrEmail"
  | "password";

export interface ErrorResponse {
  errors: FieldError;
}
