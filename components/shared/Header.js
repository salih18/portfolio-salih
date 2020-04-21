import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import auth0 from "../../services/auth0";

const BsNavlink = ({ route, title, active, className = "" }) => {
  return (
    <NavItem className="port-navbar-item">
      <Link href={route}>
        <a
          className={`nav-link port-navbar-link ${
            active && "active"
          } ${className}`}
        >
          {title}
        </a>
      </Link>
    </NavItem>
  );
};

const Login = () => {
  return (
    <NavItem className="port-navbar-item">
      <span
        onClick={auth0.login}
        className="nav-link port-navbar-link clickable"
      >
        Login
      </span>
    </NavItem>
  );
};
const Logout = () => {
  return (
    <NavItem className="port-navbar-item">
      <span
        onClick={auth0.logout}
        className="nav-link port-navbar-link clickable"
      >
        Logout
      </span>
      ;
    </NavItem>
  );
};

const Header = ({ isAuthenticated, className, userRole }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const isActive = (route) => route === router.pathname;

  const renderBlogMenu = () => {
    if (userRole === "siteOwner") {
      return (
        <Dropdown
          className="port-navbar-link port-dropdown-menu"
          nav
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
        >
          <DropdownToggle className="port-dropdown-toggle" nav caret>
            Blog
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavlink
                className="port-dropdown-item"
                route="/blogs"
                title="Blogs"
                active={isActive("/blogs")}
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavlink
                className="port-dropdown-item"
                route="/blogEditor"
                title="Create a Blog"
                active={isActive("/blogEditor")}
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavlink
                className="port-dropdown-item"
                route="/userBlogs"
                title="Blogs Dashboard"
                active={isActive("/userBlogs")}
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
  };
  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className} ${
          isOpen ? "menu-open" : "menu-close"
        }`}
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          Salih
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <BsNavlink route="/" title="Home" active={isActive("/")} />
            <BsNavlink
              route="/about"
              title="About"
              active={isActive("/about")}
            />
            <BsNavlink
              route="/portfolios"
              title="Portfolio"
              active={isActive("/portfolios")}
            />
            {userRole !== "siteOwner" && (
              <BsNavlink
                route="/blogs"
                title="Blog"
                active={isActive("/blogs")}
              />
            )}
            {renderBlogMenu()}
            <BsNavlink route="/cv" title="CV" active={isActive("/cv")} />
            {!isAuthenticated && <Login />}
            {isAuthenticated && <Logout />}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
