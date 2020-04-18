import React from "react";
import BaseLayout from "./../components/layouts/BaseLayout";
import BasePage from "./../components/BasePage";
import Editor from "./../components/slate-editor/Editor";

const BlogEditor = ({ user, isAuthenticated }) => {
  return (
    <BaseLayout isAuthenticated={isAuthenticated}>
      <BasePage containerClass='editor-wrapper' className="blog-editor-page" title="Blog Editor">
        <Editor />
      </BasePage>
    </BaseLayout>
  );
};

export default BlogEditor;
