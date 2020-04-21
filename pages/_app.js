import App, { Container } from "next/app";
import { ToastContainer } from "react-toastify";
import auth0 from "./../services/auth0";
import NProgress from "nprogress";
import Router from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/main.scss";
import "react-toastify/dist/ReactToastify.css";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const NAMESPACE = process.env.NAMESPACE;

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <ToastContainer newestOnTop autoClose={2000} />
      <Component {...pageProps} />;
    </Container>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  const user =
    typeof window === "undefined" //we are at server
      ? await auth0.serverAuth(appContext.ctx.req)
      : await auth0.clientAuth();

  const userRole = user && user[`${NAMESPACE}/role`];
  appProps.pageProps.user = user;
  appProps.pageProps.isAuthenticated = !!user;
  appProps.pageProps.userRole = userRole;

  return { ...appProps };
};

export default MyApp;
