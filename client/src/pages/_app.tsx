import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PaginatedPosts, PostsQuery } from "../generated/graphql";

// const client = new ApolloClient({
//   uri: "http://localhost:3999/graphql",
//   cache: new InMemoryCache({
//     typePolicies: {
//       Query: {
//         fields: {
//           posts: {
//             keyArgs: [],
//             merge(
//               existing: PaginatedPosts | undefined,
//               incoming: PaginatedPosts
//             ): PaginatedPosts {
//               console.log(existing, incoming);
//               return {
//                 ...incoming,
//                 posts: [...(existing?.posts || []), ...incoming.posts],
//               };
//             },
//           },
//         },
//       },
//     },
//   }),
//   credentials: "include",
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* bootstrap responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* bootstrap CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        ></link>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300&display=swap"
          rel="stylesheet"
        />

        <title>Myapp</title>
      </Head>

      {/* <ApolloProvider client={client}> */}
      <Component {...pageProps} />
      {/* </ApolloProvider> */}

      {/* bootstrap script */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default MyApp;
