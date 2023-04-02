import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CreateSubscriptionPage from "./home/pages/CreateSubscriptionPage";
import EditSubscriptionPage from "./home/pages/EditSubscriptionPage";
import SubscriptionManagerpage from "./home/pages/SubscriptionManagerPage";
import UserSubscriptionPage from "./admin/pages/UserSubscriptionPage";
import CheckoutPage from "./home/pages/CheckoutPage";
import OrdersPage from "./admin/pages/OrdersPage";
import ProfilePage from "./home/pages/ProfilePage";
import ResetPassword from "./auth/pages/resetPassword";
import WishListPage from "./home/pages/WishListPage";
import PaymentResultPage from "./home/pages/PaymentResultPage";
import ShoppingCart from "./home/pages/ShoppingCart";

const App = () => {
  useEffect(() => {
    document.title = "eClean - Cung cấp sản phẩm vệ sinh dành cho gia đình";
  }, []);
  const queryClient = new QueryClient();
  const { user } = useUserContext();
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
          <Route path="manager-subscription" element={<SubscriptionManagerpage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wishlist" element={<WishListPage />} />
          <Route path="payment-result" element={<PaymentResultPage />} />
          <Route path="cart" element={<ShoppingCart />} />
        </Route>
        {user.roles === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="subscriptions" element={<SubscriptionPage />} />
            <Route path="user-subscriptions" element={<UserSubscriptionPage />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
