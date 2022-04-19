import React, { useEffect } from "react";
import { Disclosure } from "@headlessui/react";

import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import Sidebar from "../components/DesktopSidebar";

const AdminLayout = () => {
  useEffect(() => {
    document.title = "Admin Page";
  }, []);
  return (
    <Disclosure as="div" defaultOpen={true} className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <AdminHeader />
        <Outlet />
      </div>
    </Disclosure>
  );
};

export default AdminLayout;
