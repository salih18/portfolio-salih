import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import PortfolioCreateForm from "./../components/portfolios/PortfolioCreateForm";
import withAuth from "./../components/hoc/withAuth";
import { Row, Col } from "reactstrap";
import moment from "moment";
import Cookies from "js-cookie";
import Portfolios from "./portfolios";
import baseUrl from "./../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const PortfolioEdit = ({ user, isAuthenticated, portfolio }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const router = useRouter();


  const updatePortfolio = async (portfolioData) => {
    try {
      setLoading(true);
      const token = Cookies.get("jwt");
      const url = `${baseUrl}/api/portfolio`;
      const payload = portfolioData;
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      setSuccess(true);
      router.push("/portfolios");
    } catch (error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage className="portfolio-create-page" title="Edit Portfolio">
        <Row>
          <Col md="6">
            <PortfolioCreateForm
              editing={editing}
              onSubmit={updatePortfolio}
              initialValues={portfolio}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

PortfolioEdit.getInitialProps = async (ctx) => {
  const _id = ctx.query._id;
  const url = `${baseUrl}/api/portfolio`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { portfolio: response.data };
};

export default withAuth("siteOwner")(PortfolioEdit);