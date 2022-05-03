import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AdminLayout from "./admin/layouts/AdminLayout";
import DashboardPage from "./admin/pages/DashboardPage";
import ProductsPage from "./admin/pages/ProductsPage";
import HomeLayout from "./home/layouts/HomeLayout";
import HomePage from "./home/pages/HomePage";
import ProductPage from "./home/pages/ProductPage";
import ShopPage from "./home/pages/ShopPage";
import CategoryPage from "./admin/pages/CategoryPage";
import CategoryListPage from "./home/pages/CategoryPage";
import SubscriptionPage from "./admin/pages/SubscriptionPage";
import Register from "./auth/pages/register/index";
import Login from "./auth/pages/login/index";
import UserPage from "./admin/pages/UserPage";
import Page404 from "./Page_404";
import SubscriptionListPage from "./home/pages/SubscriptionListPage";
import SubscriptionDetailsPage from "./home/pages/SubscriptionDetailsPage";
import SubscriptionPaymentPage from "./home/pages/SubscriptionPaymentPage";
import { useUserContext } from "./context/user";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CreateSubscriptionPage from "./home/pages/CreateSubscriptionPage";
import EditSubscriptionPage from "./home/pages/EditSubscriptionPage";

const App = () => {
  const queryClient = new QueryClient();
  //const navigate = useNavigate();
  const { user } = useUserContext();
  // axios.interceptors.response.use(
  //   (res) => res,
  //   (err) => {
  //     if (err.response?.status === 401) {
  //       localStorage.removeItem("user");
  //       userDispatch(setUser(initialUser));
  //       navigate("/login");
  //       throw new Error(err.response?.statusText);
  //     }
  //     throw err;
  //   }
  // );
  // useEffect(() => {
  //   console.log("Updated User context: ", user.name, user.token);
  //   let token = user.token;
  //   axios.interceptors.request.use((req) => {
  //     req.headers.authorization = "Bearer " + token;
  //     return req;
  //   });
  // }, [user]);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="products/:productSlug" element={<ProductPage />} />
          <Route path="category/:categorySlug" element={<CategoryListPage />} />
          <Route path="subscriptions" element={<SubscriptionListPage />} />
          <Route path="subscriptions/:id" element={<SubscriptionDetailsPage />} />
          <Route path="subscription-payment/:id" element={<SubscriptionPaymentPage />} />
          <Route path="create-subscription" element={<CreateSubscriptionPage />} />
          <Route path="create-subscription/:id" element={<EditSubscriptionPage />} />
          <Route path="checkout" element={<p>Checkout</p>} />
        </Route>
        {user.roles === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
          </Route>
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
