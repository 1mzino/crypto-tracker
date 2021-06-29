import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../styles/theme";
import { CurrencyProvider } from "../contexts/CurrencyContext";
import "../styles/nprogress.css";
import nProgress from "nprogress";

import Router from "next/router";

//Layout
import Layout from "../components/Layout";

export default function App({ Component, pageProps, coinData }) {
  nProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", (url) => nProgress.start());
  Router.events.on("routeChangeComplete", (url) => nProgress.done());

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Crypto Tracker</title>
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
