import { useState, useEffect } from "react";
import Typed from "react-typed";
import { Row, Col, Container } from "reactstrap";
import BaseLayout from "./../components/layouts/BaseLayout";

const Index = ({ user, isAuthenticated, userRole }) => {
  const [flipping, setFlipping] = useState(false);
  const roleTyped = ["Web Developer", "React.js", "Next.js", "Tech Lover"];

  const animateCard = () => {
    const cardAnimationInterval = setInterval(() => {
      setFlipping(!flipping);
    }, 15000);
    return cardAnimationInterval;
  };

  useEffect(() => {
    const cardAnimationInterval = animateCard();
    return () => {
      cardAnimationInterval && clearInterval(cardAnimationInterval);
    };
  }, [flipping]);

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      className={`cover ${flipping ? "cover-1" : "cover-0"}`}
      headerType="index"
      userRole={userRole}
      title="Salih - Portfolio Page"
    >
      <div className="main-section">
        <div className="background-image img-fluid">
          <img
            className="img-fluid"
            src="/static/images/background-index.png"
            alt="background-image"
          />
        </div>

        <Container>
          <Row>
            <Col md="6">
              <div className="hero-section">
                <div className={`flipper ${flipping ? "isFlipping" : ""}`}>
                  <div className="front">
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img
                      className="image"
                      src="/static/images/section-1.png"
                      alt="home page flipping image first"
                    />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                  <div className="back">
                    <div className="hero-section-content">
                      <h2> Full Stack Web Developer </h2>
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history.
                      </div>
                    </div>
                    <img
                      className="image"
                      src="/static/images/section-2.png"
                      alt="home page flipping image second"
                    />
                    <div className="shadow-custom shadow-custom-2">
                      <div className="shadow-inner"> </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" className="hero-welcome-wrapper">
              <div className="hero-welcome-text">
                <h1>
                  Welcome to the portfolio website of Salih SERT. Get informed,
                  collaborate and discover projects I was working on through the
                  web development journey!
                </h1>
              </div>

              <Typed
                loop
                typeSpeed={70}
                backSpeed={70}
                strings={roleTyped}
                backDelay={1000}
                fadeOutDelay={100}
                loopCount={0}
                showCursor
                className="self-typed"
                cursorChar="|"
              />
              <div className="hero-welcome-bio">
                <h1>Let's take a look on my work.</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BaseLayout>
  );
};

export default Index;
