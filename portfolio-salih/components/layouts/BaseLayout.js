import React from "react";
import Header from "./../shared/Header";

const BaseLayout = ({ className, children, user, isAuthenticated }) => {
  console.log('header', isAuthenticated)
 // console.log("baselayout", isAuthenticated);
  return (
    <div className="layout-container">
      <Header user={user} isAuthenticated={isAuthenticated} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
