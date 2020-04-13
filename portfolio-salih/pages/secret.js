import React from "react";
import axios from "axios";
import { parseCookies } from "nookies";

import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import withAuth from "./../components/hoc/withAuth";

const Secret = ({ isAuthenticated, secretValue }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>Secret Page</h1>
        <p>This is a secret page...</p>
        <p>{secretValue}</p>
      </BasePage>
    </BaseLayout>
  );
};

Secret.getInitialProps = async (ctx) => {
  const { jwt } = parseCookies(ctx);
  if (!jwt) {
    return { secretValue: "no token" };
  }
  const payload = { headers: { Authorization: jwt } };
  const url = "http://localhost:3000/api/secret";
  const response = await axios.get(url, payload);
  console.log("resssponse", response.data);
  return { secretValue: response.data[0].description };
};
export default withAuth(Secret);
