import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./admin/layouts/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import HomeLayout from "./home/layouts/HomeLayout";
import HomePage from "./home/pages/HomePage";
import ShopPage from "./home/pages/ShopPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="shop" element={<ShopPage />} />
        <Route path="*" element={<p>Không tìm thấy trang!</p>} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="*" element={<p>Không tìm thấy trang!</p>} />
      </Route>
    </Routes>
  );
};

export default App;
