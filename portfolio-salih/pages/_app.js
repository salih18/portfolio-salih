import App from "next/app";

import auth0 from "./../services/auth0";

import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/main.scss";

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  console.log({ appProps });

  const user =
    typeof window === "undefined" //we are at server
      ? await auth0.serverAuth(appContext.ctx.req)
      : await auth0.clientAuth();
  //console.log({ user });

  appProps.pageProps.user = user;
  appProps.pageProps.isAuthenticated = !!user;

  return { ...appProps };
};

export default MyApp;
 