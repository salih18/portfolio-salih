import React, { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import auth0 from "../../services/auth0";

const BsNavlink = ({ route, title }) => {
  return (
    <NavItem className="port-navbar-item">
      <Link href={route}>
        <a className="nav-link port-navbar-link">{title}</a>
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
      ;
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

const Header = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  //console.log("header", isAuthenticated);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className="port-navbar port-default absolute"
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
            <BsNavlink route="/" title="Home" />
            <BsNavlink route="/about" title="About" />
            <BsNavlink route="/portfolios" title="Portfolio" />
            <BsNavlink route="/blogs" title="Blog" />
            <BsNavlink route={"/salih18"} title="Github" />
            <BsNavlink route="/cv" title="CV" />
            {!isAuthenticated && <Login />}
            {isAuthenticated && <Logout />}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
