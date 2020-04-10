import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

const Blogs = ({user, isAuthenticated}) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>Blogs Page</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default Blogs;
