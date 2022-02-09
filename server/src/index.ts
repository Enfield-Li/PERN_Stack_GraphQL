import "reflect-metadata";
import express from "express";
import session from "./utils/sessionConfig";
import connectDB from "./utils/connectDB";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { MyContext } from "./types/contextType";
import { resolvers } from "./utils/resolvers";

const main = async () => {
  const conn = await connectDB;
  await conn.runMigrations();
  // await Post.delete({});

  const app = express();
  app.use(session);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
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
      origin: ["https://studio.apollographql.com", "http://localhost:3998"],
      credentials: true,
    },
  });

  app.listen(3999, () =>
    console.log(
      "Server running at http://localhost:3999/graphql, Client running at http://localhost:3998"
    )
  );
};

main().catch((err) => console.error("error from server: ", err));
