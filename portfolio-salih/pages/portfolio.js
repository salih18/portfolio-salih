import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Portfolio = ({user, isAuthenticated}) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>Portfolio Page</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Portfolio;

