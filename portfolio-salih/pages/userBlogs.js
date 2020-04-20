import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import ButtonDropdown from "./../components/ButtonDropDown";
import withAuth from "./../components/hoc/withAuth";

import { Col, Row, Container, Button } from "reactstrap";
import baseUrl from "./../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const UserBlogs = ({ user, isAuthenticated, userBlogs }) => {
  const router = useRouter();

  const separateBlogs = (blogs) => {
    const published = [];
    const drafts = [];
    blogs.forEach((blog) => {
      blog.status === "draft" ? drafts.push(blog) : published.push(blog);
    });
    return { published, drafts };
  };

  const changeBlogStatus = async (status, blogId) => {
    const newBlog = {};
    newBlog._id = blogId;
    newBlog.status = status;
    try {
      const token = Cookies.get("jwt");
      const url = `${baseUrl}/api/blog`;
      const payload = newBlog;
      const headers = { headers: { Authorization: token } };
      await axios.post(url, payload, headers);
      toast.success(`Blog status successfully changed to ${status}`);
      router.push("/userBlogs");
    } catch (error) {
      catchErrors(error, toast.error);
    }
  };

  const deleteBlogWarning = async (blogId) => {
    const res = confirm("Are you sure you want to delete this blog post?");

    if (res) {
      try {
        const token = Cookies.get("jwt");
        const url = `${baseUrl}/api/blog`;
        const payload = {
          params: { _id: blogId },
          headers: { Authorization: token },
        };
        await axios.delete(url, payload);
        toast.success("Blog successfully deleted");
        router.push("/userBlogs");
      } catch (error) {
        catchErrors(error, toast.error);
      }
    }
  };

  const createStatus = (status) => {
    return status === "draft"
      ? { view: "Publish Story", value: "published" }
      : { view: "Make a Draft", value: "draft" };
  };

  const dropdownOptions = (blog) => {
    const status = createStatus(blog.status);

    return [
      {
        text: status.view,
        handlers: { onClick: () => changeBlogStatus(status.value, blog._id) },
      },
      {
        text: "Delete",
        handlers: { onClick: () => deleteBlogWarning(blog._id) },
      },
    ];
  };

  const renderBlogs = (blogs) => {
    return (
      <ul className="user-blogs-list">
        {blogs.map((blog, index) => (
          <li key={index}>
            <Link href={`/blogEditorUpdate?_id=${blog._id}`}>
              <a>{blog.title}</a>
            </Link>
            <ButtonDropdown items={dropdownOptions(blog)} />
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
                <h1>Blogs Dashboard</h1>
                <span className="subheading">
                  Let's write an amazing blog...
                </span>
                <Link href="/blogEditor">
                  <Button size="lg" className="mt-5">
                    Create a new blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <BasePage className="blog-body">
        <Row>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Published Blogs </h2>
            <hr className="w-50" />

            {renderBlogs(published)}

          </Col>
          <Col md="6" className="mx-auto text-center">
            <h2 className="blog-status-title"> Draft Blogs </h2>
            <hr className="w-50" />

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
