import React from "react";
import { Outlet } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
const HomeLayout = () => {
  return (
    <div>
      HomeLayout
      <Outlet />
    </div>
  );
};

export default HomeLayout;
