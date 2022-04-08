import React from "react";
import { ClipboardListIcon, CollectionIcon, HomeIcon, ViewGridIcon } from "@heroicons/react/outline";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
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
  return (
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
        </ul>
        <div className="px-6 my-6">
          <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            Create account
            <span className="ml-2" aria-hidden="true">
              +
            </span>
          </button>
        </div>
      </div>
    </Disclosure.Panel>
  );
}
