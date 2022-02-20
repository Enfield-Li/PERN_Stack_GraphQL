import type { AppProps } from "next/app";
import Head from "next/head";
import GlobalProvider from "../context/GlobalState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* bootstrap responsive meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      

        <title>Myapp</title>
      </Head>

      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>

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
