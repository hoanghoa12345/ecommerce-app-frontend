import React from "react";
import { Outlet } from "react-router-dom";
import CartSlide from "../components/cart/CartSlide";
import Footer from "./Footer";
import Navbar from "./Navbar";

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <CartSlide />
    </>
  );
};

export default HomeLayout;
