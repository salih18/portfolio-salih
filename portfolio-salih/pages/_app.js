import App, { Container } from "next/app";
import { ToastContainer } from "react-toastify";
import auth0 from "./../services/auth0";

// Call it once in your app. At the root of your app is the best place

import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/main.scss";
import "react-toastify/dist/ReactToastify.css";

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

  appProps.pageProps.user = user;
  appProps.pageProps.isAuthenticated = !!user;

  return { ...appProps };
};

export default MyApp;
