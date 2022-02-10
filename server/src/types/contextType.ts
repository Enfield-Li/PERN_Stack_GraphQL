import { Redis } from "ioredis";
import { Request, Response } from "express";
// import { EntityManager } from "typeorm";

export type MyContext = {
  // em: EntityManager;
  req: Request & { session: { userId?: number } };
  res: Response;
  redis: Redis;
};
