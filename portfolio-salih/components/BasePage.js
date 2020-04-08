import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

const BasePage = ({ children, className }) => {
  return (
    <div className={`base-page ${className}`}>
      <Container>{children}</Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: "",
};

BasePage.propTypes = {
  className : PropTypes.string.isRequired,
}

export default BasePage;
