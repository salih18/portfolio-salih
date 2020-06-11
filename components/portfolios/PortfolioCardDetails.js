/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

const PortfolioCardDetails = ({ toggle, className, isOpen, portfolio }) => {
  const handleClick = () => {};
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{portfolio.title}</ModalHeader>
        <ModalBody>
          <p>
            <b>Description: </b>
            {portfolio.description}
          </p>
          <p>
            <b>Company: </b>
            {portfolio.company}
          </p>
          <p>
            <b>Position: </b>
            {portfolio.position}
          </p>
          <p>
            <b>Location: </b>
            {portfolio.location}
          </p>
          <p>
            <b>Start Date: </b>
            {moment(portfolio.startDate).format("MMMM YYYY")}
          </p>
          <p>
            <b>End Date: </b>
            {portfolio.endDate
              ? moment(portfolio.endDate).format("MMMM YYYY")
              : "Still Working Here"}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>

          <a target="_blank" href={portfolio.link}>
            Preview
          </a>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PortfolioCardDetails;
