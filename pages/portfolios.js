import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import catchErrors from "../utils/catchErrors";
import PortfolioCard from "./../components/portfolios/PortfolioCard";
import { Row, Col, Button, ButtonGroup } from "reactstrap";

const BASE_URL = process.env.BASE_URL;

const Portfolios = ({ user, isAuthenticated, portfolios, userRole }) => {
  const router = useRouter();
  const isSiteOwner = user && user.sub === portfolios[0].userId;

  const navigaToUpdate = (e) => {
    e.stopPropagation();
  };

  const displayDeleteWarning = async (portfolioId, e) => {
    e.stopPropagation();
    const isConfirm = confirm("Do you want to delete this portfolio?");
    if (isConfirm) {
      await deletePortfolio(portfolioId);
    }
  };

  const deletePortfolio = async (portfolioId) => {
    try {
      const token = Cookies.get("jwt");
      const url = `${BASE_URL}/api/portfolio`;
      const payload = {
        params: { _id: portfolioId },
        headers: { Authorization: token },
      };
      await axios.delete(url, payload);
      router.push("/portfolios");
    } catch (error) {
      catchErrors(error, toast.error);
    }
  };

  const renderPortfolios = (portfolios) => {
    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={portfolio._id}>
          <PortfolioCard portfolio={portfolio}>
            {isAuthenticated && isSiteOwner && (
              <Row>
                <Col>
                  <ButtonGroup>
                    <Link
                      href={{
                        pathname: "/portfolioEdit",
                        query: { _id: portfolio._id },
                      }}
                    >
                      <Button
                        color="primary"
                        size="sm"
                        onClick={(e) => navigaToUpdate(e)}
                        color="warning"
                        className="m-2 px-2"
                      >
                        Update
                      </Button>
                    </Link>

                    <Button
                      color="primary"
                      size="sm"
                      onClick={(e) => displayDeleteWarning(portfolio._id, e)}
                      color="danger"
                      className="m-2 px-2"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            )}
          </PortfolioCard>
        </Col>
      );
    });
  };

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      userRole={userRole}
      title="Salih - Learn About My Career"
    >
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
  const url = `${BASE_URL}/api/portfolios`;
  const response = await axios.get(url);
  return { portfolios: response.data };
};

export default Portfolios;
