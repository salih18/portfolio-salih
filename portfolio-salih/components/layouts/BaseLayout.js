import React from "react";
import Header from "./../shared/Header";

const BaseLayout = ({
  className,
  children,
  user,
  isAuthenticated,
  headerType = "default",
}) => {
  return (
    <div className="layout-container">
      <Header
        className={`port-nav-${headerType}`}
        user={user}
        isAuthenticated={isAuthenticated}
      />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
    </div>
  );
};

export default BaseLayout;
