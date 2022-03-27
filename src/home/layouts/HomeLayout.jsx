import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/sass/style.scss";
import AppFooter from "../components/footer/Footer";
import AppHeader from "../components/header/Header";
const HomeLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default HomeLayout;
