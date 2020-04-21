import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import SlateEditor from "./../components/slate-editor/Editor";
import Cookies from "js-cookie";
import catchErrors from "../utils/catchErrors";

const BASE_URL = process.env.BASE_URL;

const BlogEditorUpdate = ({ user, isAuthenticated, blog, userRole }) => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateBlog = async (story, heading) => {
    const newBlog = {};
    newBlog._id = blog._id;
    newBlog.title = heading.title;
    newBlog.subTitle = heading.subtitle;
    newBlog.story = story;

    try {
      const token = Cookies.get("jwt");
      const url = `${BASE_URL}/api/blog`;
      const payload = newBlog;
      const headers = { headers: { Authorization: token } };
      setSaving(true);
      await axios.post(url, payload, headers);
      toast.success("Blog updated successfully");
      setSuccess(true);
    } catch (error) {
      catchErrors(error, toast.error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseLayout isAuthenticated={isAuthenticated} userRole={userRole}>
      <BasePage containerClass="editor-wrapper" className="blog-editor-page">
        <SlateEditor
          initialValue={blog.story}
          saveBlog={updateBlog}
          isSaving={saving}
        />
      </BasePage>
    </BaseLayout>
  );
};

BlogEditorUpdate.getInitialProps = async (ctx) => {
  const _id = ctx.query._id;
  const url = `${BASE_URL}/api/blog`;
  const payload = { params: { _id } };
  const response = await axios.get(url, payload);
  return { blog: response.data };
};

export default BlogEditorUpdate;
