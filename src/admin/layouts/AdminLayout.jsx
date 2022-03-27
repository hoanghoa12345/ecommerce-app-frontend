import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";

import DesktopSidebar from "../components/DesktopSidebar";
import MobileSidebar from "../components/MobileSidebar";

const AdminLayout = () => {
  document.title = "Admin Page";
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Desktop sidebar */}
        <DesktopSidebar />
        {/* Mobile sidebar */}
        {/* Backdrop */}
        <MobileSidebar />
        <div className="flex flex-col flex-1 w-full">
          <AdminHeader />
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AdminLayout;
