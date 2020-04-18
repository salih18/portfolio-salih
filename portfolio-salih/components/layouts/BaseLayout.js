import React from "react";
import Head from "next/head";
import Header from "./../shared/Header";

const BaseLayout = ({
  className,
  children,
  user,
  isAuthenticated,
  headerType = "default",
}) => {
  return (
    <>
      <Head>
        <title>Salih Sert</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          user={user}
          isAuthenticated={isAuthenticated}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
