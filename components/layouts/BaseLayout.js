import React from "react";
import Head from "next/head";
import Header from "./../shared/Header";
import Footer from "./../shared/Footer";

const BASE_URL = process.env.BASE_URL;

const BaseLayout = ({
  className,
  children,
  user,
  isAuthenticated,
  userRole,
  headerType = "default",
  title = "",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="My name is Salih and I am a full stack engineer and freelance developer."
        />
        <meta
          name="keywords"
          content="salih portfolio, salih developer, salih reactjs, salih career, salih experiences, salih web, salih next js,salih javascript, salih front end, salih back end, full stack"
        />
        <meta
          property="og:title"
          content="Salih - programmer, developer, bloger, react js, next js, javascript, front end, back end, full stack"
        />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content={`${BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="My name is Salih and I am a fullstack web developer."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          user={user}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
