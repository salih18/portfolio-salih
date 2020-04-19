import React from "react";
import Link from 'next/link'
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import withAuth from "./../components/hoc/withAuth";
import { Col, Row, Container } from "reactstrap";
import baseUrl from "./../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const UserBlogs = ({ user, isAuthenticated, userBlogs }) => {
  console.log({ userBlogs });

  const separateBlogs = (blogs) => {
    const published = [];
    const drafts = [];
    blogs.forEach((blog) => {
      blog.status === "draft" ? drafts.push(blog) : published.push(blog);
    });
    return { published, drafts };
  };

  const renderBlogs = (blogs) => {
    return (
      <ul className="user-blogs-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <Link href={`/blogEditorUpdate?_id=${blog._id}`}>
              <a>{blog.title}</a>
            </Link>
            {/* <PortButtonDropdown items={this.dropdownOptions(blog)} /> */}
          </li>
        ))}
      </ul>
    );
  };

  const { published, drafts } = separateBlogs(userBlogs);

  return (
    <BaseLayout
      headerType={"landing"}
      isAuthenticated={isAuthenticated}
      className="blog-listing-page"
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
          <Col md="6" className="mx-auto text-center">
          <h2 className="blog-status-title"> Published Blogs </h2>
              {renderBlogs(published)}
          </Col>
          <Col md="6" className="mx-auto text-center">
          <h2 className="blog-status-title"> Draft Blogs </h2>
              {renderBlogs(drafts)}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

UserBlogs.getInitialProps = async (ctx) => {
  try {
    const { jwt } = parseCookies(ctx);
    if (!jwt) {
      toast.error("You should login again");
      return { userBlogs: [] };
    }
    const url = `${baseUrl}/api/userblogs`;
    const payload = { headers: { Authorization: jwt } };
    const response = await axios.get(url, payload);
    return { userBlogs: response.data };
  } catch (error) {
    catchErrors(error, toast.error);
  }
};

export default withAuth("siteOwner")(UserBlogs);
