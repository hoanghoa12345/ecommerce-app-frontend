import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import Axios from "axios";
import { useUserContext } from "../../context/user";
import { getFullHeader } from "../../api/api";
import { setUser } from "./../../action/user";
import { initialUser } from "../../constants/initialUser";

export default function AdminHeader() {
  const navigate = useNavigate();
  const { user, userDispatch } = useUserContext();

  const handleLogout = async () => {
    const headers = getFullHeader(user.token);
    const res = await Axios.post("/api/v1/logout", {}, { headers });

    if (res.status === 200) {
      localStorage.removeItem("user");
      userDispatch(setUser(initialUser));
      navigate("/login");
    }
  };

  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* Mobile hamburger */}
        <Disclosure.Button className="p-1 mr-5 -ml-1 rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
          <MenuIcon className="w-6 h-6" />
        </Disclosure.Button>
        {/* Search input */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" />
            </div>
            <input
              className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
              type="text"
              placeholder="Search for products"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Theme toggler */}
          <li className="flex">
            <button className="rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Toggle color mode"></button>
          </li>
          {/* Notifications menu */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" />
              {/* Notification badge */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              />
            </button>
          </li>
          {/* Profile menu */}
          <li className="relative">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button
                type="button"
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                aria-label="Account"
                aria-haspopup="true"
              >
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=b8377ca9f985d80264279f277f3a67f5"
                  alt=""
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item as={Link} to={"/"}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                          Profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={handleLogout}
                        >
                          <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        </ul>
      </div>
    </header>
  );
}
