import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Cv = ({user, isAuthenticated}) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>CV Page</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Cv;
