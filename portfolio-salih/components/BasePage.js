import React from "react";
import { Container } from "reactstrap";
import PropTypes from "prop-types";

const BasePage =  ({ children, className, title, containerClass }) => {
  return (
    <div className={`base-page ${className}`}>
      <Container className={containerClass}>
        {" "}
        {title && (
          <div className="page-header">
            <h1 className="page-header-title">{title}</h1>
          </div>
        )}
        {children}
      </Container>
    </div>
  );
};

BasePage.defaultProps = {
  className: "",
  containerClass: "",
};

BasePage.propTypes = {
  className: PropTypes.string.isRequired,
};

export default BasePage;
