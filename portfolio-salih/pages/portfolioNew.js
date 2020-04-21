import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import PortfolioCreateForm from "./../components/portfolios/PortfolioCreateForm";
import withAuth from "./../components/hoc/withAuth";
import { Row, Col } from "reactstrap";
import moment from "moment";
import Cookies from "js-cookie";
import catchErrors from "../utils/catchErrors";

const BASE_URL = process.env.BASE_URL;

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: moment(),
  endDate: moment(),
};

const PortfolioNew = ({ isAuthenticated, userRole }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const savePortfolio = async (portfolioData) => {
    try {
      setLoading(true);
      const token = Cookies.get("jwt");
      const url = `${BASE_URL}/api/portfolio`;
      const payload = portfolioData;
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      toast.success("Portfolio created successfully");
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
      <BasePage className="portfolio-create-page" title="Create New Portfolio">
        <Row>
          <Col md="6">
            <PortfolioCreateForm
              onSubmit={savePortfolio}
              initialValues={INITIAL_VALUES}
            />
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(PortfolioNew);
