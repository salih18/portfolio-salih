import React from "react";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";

const About = ({ user, isAuthenticated }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage>
        <h1>About Page</h1>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
