import React from "react";
import { parseCookies } from "nookies";
import axios from "axios";

import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";

const Owner = ({ isAuthenticated, secretValue }) => (
  <BaseLayout isAuthenticated={isAuthenticated}>
    <BasePage>
      <h1> I am Owner Page </h1>
      <h1> {secretValue} </h1>
    </BasePage>
  </BaseLayout>
);

Owner.getInitialProps = async (ctx) => {
  const { jwt } = parseCookies(ctx);
  if (!jwt) {
    return { secretValue: "no token" };
  }
  const payload = { headers: { Authorization: jwt } };
  const url = "http://localhost:3000/api/owner";
  const response = await axios.get(url, payload);
  console.log("resssponse from owner", response.data);
  return { secretValue: response.data[0].description };
};

export default withAuth("siteOwner")(Owner);
