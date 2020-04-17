import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Portfolio = ({ user, isAuthenticated }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage title="Portfolios"></BasePage>
    </BaseLayout>
  );
};

export default Portfolio;
