import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";
import { HiHome, HiLogout } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";

const SideBar = ({ isOpen, toggle }) => (
  <div className={`sidebar ${isOpen && "is-open"}`}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Admin Panel</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Xin chào! Admin</p>
        <NavItem>
          <NavLink tag={Link} to={"/admin/dashboard"}>
            <AiFillDashboard className="me-2" />
            Dashboard
          </NavLink>
        </NavItem>
        <SubMenu
          title="Home"
          icon={<HiHome className="me-2" />}
          items={submenus[0]}
        />
        <SubMenu
          title="Pages"
          icon={<HiHome className="me-2" />}
          items={submenus[1]}
        />
        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            <HiHome className="me-2" />
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            <HiHome className="me-2" />
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/logout"}>
            <HiLogout className="me-2" />
            Đăng xuất
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Dashboard",
      target: "dashboard",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;
