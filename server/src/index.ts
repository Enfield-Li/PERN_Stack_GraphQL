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

  app.get("/", (req, res) => res.send("hello world"));

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
    // cors: {
    //   origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    //   credentials: true,
    // },
  });

  app.listen(3999, () =>
    console.log("server running at http://localhost:3999/graphql")
  );
};

main().catch((err) => console.error(err));
