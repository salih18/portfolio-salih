import React from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import catchErrors from "../utils/catchErrors";

const BASE_URL = process.env.BASE_URL;

const BlogDetail = ({ isAuthenticated, blog, userRole }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated} userRole={userRole}>
      <BasePage className="blog-detail-page">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: blog.story }}></div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

BlogDetail.getInitialProps = async (ctx) => {
  try {
    const slug = ctx.query.blog; // coming from blogs Link component as blog
    const url = `${BASE_URL}/api/blog`;
    const payload = { params: { slug } };
    const response = await axios.get(url, payload);
    return { blog: response.data };
  } catch (error) {
    catchErrors(error, toast.error);
  }
};

export default BlogDetail;
