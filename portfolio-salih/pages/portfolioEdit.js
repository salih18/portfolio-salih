import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import PortfolioCreateForm from "./../components/portfolios/PortfolioCreateForm";
import withAuth from "./../components/hoc/withAuth";
import { Row, Col } from "reactstrap";
import Cookies from "js-cookie";
import catchErrors from "../utils/catchErrors";

const BASE_URL = process.env.BASE_URL;

const PortfolioEdit = ({ user, isAuthenticated, portfolio, userRole }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(true);
  const router = useRouter();

  const updatePortfolio = async (portfolioData) => {
    try {
      setLoading(true);
      const token = Cookies.get("jwt");
      const url = `${BASE_URL}/api/portfolio`;
      const payload = portfolioData;
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      toast.success("Portfolio updated successfully");
      setSuccess(true);
      router.push("/portfolios");
    } catch (error) {
      catchErrors(error, toast.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout isAuthenticated={isAuthenticated} userRole={userRole}>
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
  const url = `${BASE_URL}/api/portfolio`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { portfolio: response.data };
};

export default withAuth("siteOwner")(PortfolioEdit);
