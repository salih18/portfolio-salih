import React from "react";
import axios from "axios";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import baseUrl from "./../utils/baseUrl";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import catchErrors from "../utils/catchErrors";

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

const Portfolios = ({ user, isAuthenticated, portfolios }) => {
  const router = useRouter();
  const isSiteOwner = user && user.sub === portfolios[0].userId;

  const displayDeleteWarning = async (portfolioId) => {
    const isConfirm = confirm("Do you want to delete this portfolio?");
    if (isConfirm) {
      await deletePortfolio(portfolioId);
    }
  };

  const deletePortfolio = async (portfolioId) => {
    try {
      const token = Cookies.get("jwt");
      const url = `${baseUrl}/api/portfolio`;
      const payload = {
        params: { _id: portfolioId },
        headers: { Authorization: token },
      };
      await axios.delete(url, payload);
      router.push("/portfolios");
    } catch (error) {
      catchErrors(error, window.alert);
    }
  };

  const renderPortfolios = (portfolios) => {
    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={portfolio._id}>
          <>
            <span>
              <Card className="portfolio-card">
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
                {isAuthenticated && isSiteOwner && (
                  <Row>
                    <Col md="4">
                      <Link
                        href={{
                          pathname: "/portfolioEdit",
                          query: { _id: portfolio._id },
                        }}
                      >
                        <Button color="warning" className="m-2 px-4">
                          Update
                        </Button>
                      </Link>

                      <Button
                        onClick={() => displayDeleteWarning(portfolio._id)}
                        color="danger"
                        className="m-2 px-4"
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                )}
              </Card>
            </span>
          </>
        </Col>
      );
    });
  };

  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage className="portfolio-page" title="Portfolios">
        {isAuthenticated && (
          <Link href="/portfolioNew">
            <Button color="secondary" className="mt-2 mb-5">
              Add Portfolio
            </Button>
          </Link>
        )}
        <Row>{renderPortfolios(portfolios)}</Row>
      </BasePage>
    </BaseLayout>
  );
};

Portfolios.getInitialProps = async () => {
  const url = `${baseUrl}/api/portfolios`;
  const response = await axios.get(url);
  return { portfolios: response.data };
};

export default Portfolios;
