import React from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";

import baseUrl from "./../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const BlogDetail = ({ isAuthenticated, blog }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
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
  const slug = ctx.query.blog; // coming from blogs Link component as blog
  const url = `${baseUrl}/api/blog`;
  const payload = { params: { slug } };
  const response = await axios.get(url, payload);
  console.log(response.data)
  return { blog: response.data };
};

export default BlogDetail;
