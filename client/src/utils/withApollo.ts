import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from "../generated/graphql";

// https://github.com/adamsoffer/next-apollo/issues/86

const createClient = (ctx?: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:3999/graphql",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: ["limit"],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                // console.log(existing, incoming);
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
    credentials: "include",
  });

export default createWithApollo(createClient);
// const withApollo = createWithApollo(createClient);

// export default withApollo;
