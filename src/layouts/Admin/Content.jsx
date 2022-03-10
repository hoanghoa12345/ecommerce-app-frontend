import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Outlet } from "react-router-dom";

import Topbar from "./Topbar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Outlet />
  </Container>
);

export default Content;
