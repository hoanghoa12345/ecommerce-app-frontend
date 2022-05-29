import React from "react";
import {
  ClipboardListIcon,
  UserGroupIcon,
  CollectionIcon,
  HomeIcon,
  UsersIcon,
  ViewGridIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
function SidebarLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className="relative px-6 py-3">
      {match && <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true" />}
      <Link
        className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
          match && "text-gray-800 dark:text-gray-100"
        }`}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}
export default function DesktopSidebar() {
  const navigate = useNavigate();
  return (
    <Transition
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <Disclosure.Panel as="aside" className="w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" to="/admin">
            Admin Page
          </Link>
          <ul className="mt-6">
            <SidebarLink to="/admin/dashboard">
              <HomeIcon className="w-5 h-5" />
              <span className="ml-4">Dashboard</span>
            </SidebarLink>
            <SidebarLink to="/admin/users">
              <UserGroupIcon className="w-5 h-5" />
              <span className="ml-4">Users</span>
            </SidebarLink>
            <SidebarLink to="/admin/products">
              <ClipboardListIcon className="w-5 h-5" />
              <span className="ml-4">Products</span>
            </SidebarLink>
            <SidebarLink to="/admin/categories">
              <CollectionIcon className="w-5 h-5" />
              <span className="ml-4">Categories</span>
            </SidebarLink>
            <SidebarLink to="/admin/subscriptions">
              <ViewGridIcon className="w-5 h-5" />
              <span className="ml-4">Subscriptions</span>
            </SidebarLink>
            <SidebarLink to="/admin/user-subscriptions">
              <UsersIcon className="w-5 h-5" />
              <span className="ml-4">User Subs</span>
            </SidebarLink>
            <SidebarLink to="/admin/orders">
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="ml-4">Orders</span>
            </SidebarLink>
          </ul>
          <div className="px-6 my-6">
            <button
              onClick={() => navigate("/admin/users?createUser")}
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Create account
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </div>
        </div>
      </Disclosure.Panel>
    </Transition>
  );
}
