import React from "react";

import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";

import withAuth from "./../components/hoc/withAuth";

const Secret = ({ isAuthenticated }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>Secret Page</h1>
        <p>This is a secret page...</p>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth('guest')(Secret);
