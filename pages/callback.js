import React, { useEffect } from "react";
import { useRouter } from "next/router";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import auth0Client from "./../services/auth0";

const Callback = () => {
  const router = useRouter();
  const authorize = async () => {
    await auth0Client.handleAuthentication();
    router.push("/");
  };

  useEffect(() => {
    authorize();
  }, [authorize, auth0Client]);
  return (
    <BaseLayout>
      <BasePage>
        <h1> Verifying login data...</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Callback;
