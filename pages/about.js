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
                electronic engineer I wanted to move my career into the fullstack
                web development especially in React and NextJS.
              </p>
              <p>
                Throughout my learning career as a web developer, I have acquired lots of technical
                knowledge and the ability. Having developed a taste for web development about one year, 
                I have made a lot of progress in this field in a short time with the help of my previous job experiences.
              </p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
