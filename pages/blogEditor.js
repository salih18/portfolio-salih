import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import withAuth from "./../components/hoc/withAuth";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import SlateEditor from "./../components/slate-editor/Editor";
import Cookies from "js-cookie";
import catchErrors from "../utils/catchErrors";

const BASE_URL = process.env.BASE_URL;

const BlogEditor = ({ isAuthenticated, userRole }) => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const saveBlog = async (story, heading) => {
    let blog = {};
    blog.title = heading.title;
    blog.subTitle = heading.subtitle;
    blog.story = story;

    try {
      const token = Cookies.get("jwt");
      const url = `${BASE_URL}/api/blog`;
      const payload = blog;
      const headers = { headers: { Authorization: token } };
      setSaving(true);
      const response = await axios.post(url, payload, headers);
      toast.success("Blog created successfully");
      setSuccess(true);
      router.push(`/blogEditorUpdate?_id=${response.data._id}`);
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
          saveBlog={saveBlog}
          isSaving={saving}
          isSuccess={success}
        />
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(BlogEditor);
