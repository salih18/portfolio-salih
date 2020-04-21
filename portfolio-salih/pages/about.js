import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import { Row, Col } from "reactstrap";

const About = ({ user, isAuthenticated, userRole }) => {
  return (
    <BaseLayout title="Salih - Learn More About Me" isAuthenticated={isAuthenticated} userRole={userRole}>
      <BasePage className="about-page">
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className="title fadein">Hello, Welcome</h1>
              <h4 className="subtitle fadein">To About Page</h4>
              <p className="subsubTitle fadein">
                Feel free to read short description about me.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className="fadein">
              <p>
                My name is Salih SERT. After worked in different companies I
                have moved my career into the fullstack engineering{" "}
              </p>
              <p>
                I have a Bachelor degree in Electronic Engineering and several
                years of experience working on a wide range of technologies.
                After several years working at different companies as an
                electronic engineer I have moved my career into the fullstack
                web development in React and NextJS.
              </p>
              <p>
                Throughout my career, I have acquired advanced technical
                knowledge and the ability to explain programming topics clearly
                and in detail to a broad audience. I invite you to take my
                course, where I have put a lot of effort to explain web and
                software engineering concepts in a detailed, hands-on and
                understandable way.
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
