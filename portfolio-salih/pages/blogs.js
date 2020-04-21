import React from "react";
import axios from "axios";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import moment from "moment";
import { shortenText } from "./../utils/helpers";

const BASE_URL = process.env.BASE_URL;

const Blogs = ({ isAuthenticated, blogs, userRole }) => {
  const renderBlogs = (blogs) =>
    blogs.map((blog, index) => (
      <div key={index} className="post-preview">
        <Link
          href={{
            pathname: `/blogDetail`,
            query: { blog: blog.slug },
          }}
        >
          <a>
            <h2 className="post-title">{blog.title}</h2>
            <h3 className="post-subtitle">{shortenText(blog.subTitle)}</h3>
          </a>
        </Link>
        <p className="post-meta">
          Posted by
          <a href="#"> {blog.author} </a>
          {moment(blog.createdDate).format("LL")}
        </p>
      </div>
    ));

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      headerType={"landing"}
      className="blog-listing-page"
      title="Salih - Newest Blogs to Read"
      userRole={userRole}
    >
      <div
        className="masthead"
        style={{ backgroundImage: "url('/static/images/home-bg.jpg')" }}
      >
        <div className="overlay"></div>
        <Container>
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Fresh Blogs</h1>
                <span className="subheading">Programming, travelling...</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-body">
        <Row>
          <Col md="10" lg="8" className="mx-auto">
            {renderBlogs(blogs)}
            <div className="clearfix">
              <a className="btn btn-primary float-right" href="#">
                Older Posts &rarr;
              </a>
            </div>
          </Col>
        </Row>
      </BasePage>
      <style jsx>
        {`
          @import url("https://use.fontawesome.com/releases/v5.5.0/css/all.css");
        `}
      </style>
    </BaseLayout>
  );
};

Blogs.getInitialProps = async () => {
  const url = `${BASE_URL}/api/blogs`;
  const response = await axios.get(url);
  return { blogs: response.data };
};

export default Blogs;
