import React, { useState } from "react";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MdOutlineMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="md"
    >
      <Button color="info" onClick={toggleSidebar}>
        <MdOutlineMenu />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="me-auto" navbar>
          {/*Nav Item */}
        </Nav>
        <Dropdown
          toggle={() => setMenuIsOpen((prevState) => !prevState)}
          isOpen={menuIsOpen}
        >
          <DropdownToggle caret nav>
            Admin
          </DropdownToggle>
          <DropdownMenu container="body">
            <DropdownItem onClick={() => navigate("/admin/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem onClick={() => navigate("/admin/logout")}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
