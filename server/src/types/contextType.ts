import { createPostLoader } from "./../utils/createPostLoader";
import { createVoteLoader } from "./../utils/createVoteLoader";
import { createUserLoader } from "../utils/createUserLoader";
import { Redis } from "ioredis";
import { Request, Response } from "express";
// import { EntityManager } from "typeorm";

export type MyContext = {
  // em: EntityManager;
  req: Request & { session: { userId?: number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  voteLoader: ReturnType<typeof createVoteLoader>;
  postLoader: ReturnType<typeof createPostLoader>;
};
