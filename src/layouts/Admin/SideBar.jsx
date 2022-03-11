import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import { HiUsers, HiLogout } from "react-icons/hi";
import { FaBox } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { RiInboxArchiveFill } from "react-icons/ri";

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
            <AiFillDashboard className="me-4" />
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/admin/dashboard"}>
            <FaBox className="me-4" />
            Sản phẩm
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/admin/dashboard"}>
            <BiCategory className="me-4" />
            Danh mục
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/admin/dashboard"}>
            <RiInboxArchiveFill className="me-4" />
            Đơn hàng
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/admin/dashboard"}>
            <HiUsers className="me-4" />
            Khách hàng
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/logout"}>
            <HiLogout className="me-4" />
            Đăng xuất
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
