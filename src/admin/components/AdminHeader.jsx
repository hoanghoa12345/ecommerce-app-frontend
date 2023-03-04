import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, LogoutIcon, UserCircleIcon, MoonIcon, SunIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useMutation, useQuery } from "react-query";

import { useUserContext } from "../../context/user";
import { getProfileByUserId, BASE_URL, getSearchResult } from "../../api/api";
import { setUser } from "./../../action/user";
import { initialUser } from "../../constants/initialUser";
import { useColorModeStore } from "../state/colorModeState";

export default function AdminHeader() {
  const ref = useRef();
  const navigate = useNavigate();
  const [isShowing, setIsShowing] = useState(false); //Show search result
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user, userDispatch } = useUserContext();
  const { colorMode, toggleMode } = useColorModeStore();
  const { data } = useQuery("profile", () => getProfileByUserId(user.id, user.token), {
    retry: false,
    retryOnMount: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const logoutMutation = useMutation(
    () => {
      return Axios.post("/api/v1/logout", null, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + user.token,
        },
      });
    },
    {
      onError: (error) => {
        throw error;
      },
      onSuccess: () => {
        localStorage.removeItem("user");
        userDispatch(setUser(initialUser));
        navigate("/login");
      },
    }
  );
  const handleSearchProduct = (e) => {
    setSearchInput(e.target.value);
    setIsShowing(true);
  };
  useEffect(() => {
    if (searchInput.trim().length === 0) {
      setIsShowing(false);
    }

    const sendSearchRequest = async (value) => {
      if (value.trim().length % 2 === 0) {
        const data = await getSearchResult(value);
        setSearchResult(data);
      }
    };

    sendSearchRequest(searchInput);
  }, [searchInput]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isShowing && ref.current && !ref.current.contains(e.target)) {
        setIsShowing(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShowing]);

  useEffect(() => {
    if (colorMode === "dark") {
      document.body.classList.add("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              type="search"
              placeholder="Search for products"
              aria-label="Search"
              onChange={(e) => handleSearchProduct(e)}
              value={searchInput}
            />
            {/* Suggest products list*/}
            {isShowing && (
              <div
                className="absolute right-0 mt-2 h-72 w-full overflow-y-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                ref={ref}
              >
                <div className="px-1 py-1">
                  {searchResult.length > 0 ? (
                    searchResult.map((i) => (
                      <Link
                        to={`/products/${i.slug}`}
                        key={i.id}
                        className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-violet-500 hover:text-white text-gray-900"
                      >
                        <img className="w-10 h-10 border rounded-md mr-2" src={`${BASE_URL}/${i.image}`} alt="" />
                        <span>{i.name}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="flex flex-col items-center">
                      <p className="text-black">Không có sản phẩm phù hợp!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Theme toggler */}
          <li className="flex">
            <button
              onClick={toggleMode}
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Toggle color mode"
              title="Toggle color mode"
            >
              {colorMode === "dark" ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </li>
          {/* Notifications menu */}
          <Menu as="li" className="relative">
            <Menu.Button
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
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 w-64 h-80 overflow-y-auto mt-2 flex flex-col items-center justify-center origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item as="div" className="flex flex-col items-center">
                  <BellIcon className="w-8 h-8" />
                  <div>Not have notifications yet!</div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
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
                  src={data ? `${BASE_URL}/${data.avatar}` : ""}
                  alt="user avatar"
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
                          onClick={() => logoutMutation.mutate()}
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
