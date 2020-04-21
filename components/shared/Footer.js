import React from "react";
import { Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <Row className="m-0">
      <Col md="10" lg="8" className="mx-auto">
        <footer>
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <a href="mailto: salihsert18@gmail.com">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fas fa-envelope fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
            <li className="list-inline-item">
              <a target="_blank" href="https://github.com/salih18">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                  <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                </span>
              </a>
            </li>
          </ul>
          <p className="copyright text-muted text-center">
            Copyright &copy; Salih SERT 2020
          </p>
        </footer>
      </Col>
    </Row>
  );
};

export default Footer;
