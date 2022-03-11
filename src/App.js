import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./layouts/Admin";
import Index from "./layouts/Index";
import Home from "./pages/Home";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import AdminLogin from "./pages/Admin/Login/Login";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
