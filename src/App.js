import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/layouts/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import HomeLayout from "./home/layouts/HomeLayout";
import HomePage from "./home/pages/HomePage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />}></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
