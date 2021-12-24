import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import Layout from "../components/Layout";
import theme from "../styles/theme";

import { CurrencyProvider } from "../contexts/CurrencyContext";

import "../styles/nprogress.css";
import nProgress from "nprogress";

export default function App({ Component, pageProps }) {
  nProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", (url) => nProgress.start());
  Router.events.on("routeChangeComplete", (url) => nProgress.done());

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Crypto Tracker</title>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <ChakraProvider theme={theme}>
        <CurrencyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrencyProvider>
      </ChakraProvider>
    </>
  );
}
