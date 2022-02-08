import { User } from "./entities/User";
import { Post } from "./entities/Post";
import "reflect-metadata";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { HelloResolver } from "./resolvers/HelloResolver";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import path from "path";

import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  const connectDB = await createConnection({
    type: "postgres",
    username: "postgres",
    database: "full_stack",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User],
    password: "0492355",
  });
  await connectDB.runMigrations();
  // await Post.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      name: "coolID",
      secret: "hard_coded_secret",
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({
      //   em: connectDB.manager,
      req,
      res,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true,
    },
  });

  app.listen(3999, () =>
    console.log(
      "Server running at http://localhost:3999/graphql, Client running at http://localhost:3000"
    )
  );
};

main().catch((err) => console.error("error from server: ", err));
