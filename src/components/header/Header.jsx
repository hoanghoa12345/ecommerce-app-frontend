import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Form,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

import {TiShoppingCart} from 'react-icons/ti'
import {AiOutlineSearch} from 'react-icons/ai'
import {RiMapPin2Line} from 'react-icons/ri'

import "./header.css"
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <Navbar container color="success" expand="md" dark className="py-1">
        <NavbarBrand tag={Link} to="/">Home Clean</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/chon-tinh-thanh"><RiMapPin2Line/>{' '}Chọn tỉnh thành phố</NavLink>
            </NavItem>
          </Nav>
          <Form className="search-form">
            <Input name="search" type="text" placeholder="Bạn tìm gì?" />
            <Button className="search-button" type="submit" outline color="secondary"><AiOutlineSearch size={20}/></Button>
          </Form>
          <NavbarText>Đơn hàng của bạn</NavbarText>
          <Button className="cart-button" color="success"><TiShoppingCart size={24} /> GIỎ HÀNG</Button>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
