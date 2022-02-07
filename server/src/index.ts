import { MyContext } from "./types";
import "reflect-metadata";
import { HelloResolver } from "./resolvers/HelloResolver";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

const main = async () => {
  const connectDB = await createConnection();

  console.log("hey there");

  const app = express();

  app.get("/", (req, res) => res.send("hello world"));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => {
      em: connectDB.manager, req, res;
    },
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
    console.log("server running at http://localhost:3999/graphql")
  );
};

main().catch((err) => console.error(err));
