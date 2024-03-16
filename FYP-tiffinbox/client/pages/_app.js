import React, { useEffect } from "react";
import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import Nav from "../components/Nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <UserProvider>
      <Head>
        <link rel="stylesheet" href="/css/styles.css" />
      </Head>
      <Nav />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </UserProvider>
  );
}
