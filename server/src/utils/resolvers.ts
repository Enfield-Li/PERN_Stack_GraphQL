import { NonEmptyArray } from "type-graphql";
import { UserResolver } from "./../resolvers/user";
import { HelloResolver } from "../resolvers/HelloResolver";
import { PostResolver } from "../resolvers/post";

export const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloResolver,
  PostResolver,
  UserResolver,
];
