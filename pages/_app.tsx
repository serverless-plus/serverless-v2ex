import App from 'next/app';
import React from 'react';
import { AppProps } from 'next/app';

import '../assets/css/app.css';

type APageProps = {
  props: any;
};

type MyAppProps = AppProps & APageProps;

// @ts-ignore
class MyApp extends App<MyAppProps, AppComponentContext> {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
