import App from "next/app";
import Head from 'next/head'
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../styles/Global";
import { theme } from "../styles/theme";

import Header from "../components/Header";
import Footer from "../components/Footer";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
      <Head>
        <title>APVA - Associação Protetora da Vida Animal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
