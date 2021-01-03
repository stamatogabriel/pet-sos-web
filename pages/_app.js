import App from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { store, persistor } from "../store";

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
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="APVA, Associação Protetora da Vida Animal, ONG, Associação, Caẽs, Gatos, Cachorro, Dog, Cat"
          />
          <meta
            name="keywords"
            content="APVA - Associação Protetora da Vida Animal - Ajudando os nossos amigos de 4 patas de Paulínia e região"
          />
          <meta
            name="og:image"
            content="/assets/Logo.png"
          />
          <meta charSet="UTF-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <GlobalStyle />
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
