import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Portfolio = ({ user, isAuthenticated, userRole}) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated} userRole={userRole}>
      <BasePage title="Portfolios"></BasePage>
    </BaseLayout>
  );
};

export default Portfolio;
