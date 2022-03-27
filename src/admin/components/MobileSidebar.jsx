import React from "react";
import { Link } from "react-router-dom";
import {
  ChartPieIcon,
  ChevronDownIcon,
  ClipboardListIcon,
  CollectionIcon,
  CursorClickIcon,
  DuplicateIcon,
  HomeIcon,
  TemplateIcon,
  MenuIcon,
} from "@heroicons/react/outline";
export default function MobileSidebar() {
  return (
    <React.Fragment>
      {/* <div className="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center" /> */}
      <aside className="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="/admin"
          >
            Admin Page
          </Link>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              />
              <a
                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                href="index.html"
              >
                <HomeIcon className="w-5 h-5" />
                <span className="ml-4">Dashboard</span>
              </a>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              <a
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="forms.html"
              >
                <ClipboardListIcon className="w-5 h-5" />
                <span className="ml-4">Forms</span>
              </a>
            </li>
            <li className="relative px-6 py-3">
              <a
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="cards.html"
              >
                <CollectionIcon className="w-5 h-5" />
                <span className="ml-4">Cards</span>
              </a>
            </li>
            <li className="relative px-6 py-3">
              <a
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="charts.html"
              >
                <ChartPieIcon className="w-5 h-5" />
                <span className="ml-4">Charts</span>
              </a>
            </li>
            <li className="relative px-6 py-3">
              <a
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="buttons.html"
              >
                <CursorClickIcon className="w-5 h-5" />
                <span className="ml-4">Buttons</span>
              </a>
            </li>
            <li className="relative px-6 py-3">
              <a
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="modals.html"
              >
                <DuplicateIcon className="w-5 h-5" />
                <span className="ml-4">Modals</span>
              </a>
            </li>
            <li className="relative px-6 py-3">
              <a
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                href="tables.html"
              >
                <MenuIcon className="w-5 h-5" />
                <span className="ml-4">Tables</span>
              </a>
            </li>
            <li className="relative px-6 py-3">
              <button
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                aria-haspopup="true"
              >
                <span className="inline-flex items-center">
                  <TemplateIcon className="w-5 h-5" />
                  <span className="ml-4">Pages</span>
                </span>
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </li>
          </ul>
          <div className="px-6 my-6">
            <button className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create account
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}
