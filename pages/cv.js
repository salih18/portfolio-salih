import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Row, Col } from "reactstrap";
const Cv = ({ user, isAuthenticated, userRole }) => {
  return (
    <BaseLayout
      title="Salih - My Resume"
      isAuthenticated={isAuthenticated}
      userRole={userRole}
    >
      <BasePage title="My CV" className="cv-page text-center">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="cv-title text-center mt-5">
              <a
                download="jerga_cv.pdf"
                className="btn btn-lg btn-primary mb-2"
                href="/static/resume.pdf"
              >
                Download
              </a>
            </div>
            <iframe
              style={{ width: "100%", height: "800px" }}
              src="/static/resume.pdf"
            ></iframe>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Cv;
