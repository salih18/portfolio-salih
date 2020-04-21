import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import PortfolioCardDetails from "./PortfolioCardDetails";

const PortfolioCard = ({ portfolio, children }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <span onClick={toggle}>
      <PortfolioCardDetails
        isOpen={modal}
        toggle={toggle}
        portfolio={portfolio}
      />
      <Card className="portfolio-card" >
        <CardHeader className="portfolio-card-header">
          {portfolio.position}
        </CardHeader>
        <CardBody>
          <p className="portfolio-card-city"> {portfolio.location} </p>
          <CardTitle className="portfolio-card-title">
            {portfolio.company}
          </CardTitle>
          <CardText className="portfolio-card-text">
            {portfolio.description}
          </CardText>
          <div className="readMore"> </div>
        </CardBody>
        {children}
      </Card>
    </span>
  );
};

export default PortfolioCard;
