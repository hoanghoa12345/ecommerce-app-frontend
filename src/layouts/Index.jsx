import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import "./index.css";
const Index = () => {
  return (
    <div className="customer-layout">
      <Header />
      <Container>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
