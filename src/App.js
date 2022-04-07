import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "./admin/layouts/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import ProductsPage from "./admin/pages/ProductsPage";
import HomeLayout from "./home/layouts/HomeLayout";
import HomePage from "./home/pages/HomePage";
import ProductPage from "./home/pages/ProductPage";
import ShopPage from "./home/pages/ShopPage";
import CategoryPage from "./admin/pages/CategoryPage";
import Login from "./auth/pages/login";
import Register from "./auth/pages/register";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="shop" element={<ShopPage />}></Route>
        <Route path="products/:productSlug" element={<ProductPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoryPage />}></Route>
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
