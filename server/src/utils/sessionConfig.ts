import { COOKIE_NAME } from "./constants";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);
export const redis = new Redis();

export const sessionConfig = session({
  store: new RedisStore({
    client: redis,
    disableTouch: true,
  }),
  name: COOKIE_NAME,
  secret: "hard_coded_secret",
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});
