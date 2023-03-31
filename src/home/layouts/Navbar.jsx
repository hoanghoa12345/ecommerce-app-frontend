import { Combobox, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  TagIcon,
  ArchiveIcon,
  FolderAddIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import React, { useState, Fragment, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, getAllCategory, getFullHeader, getProfileByUserId, getSearchResult } from "../../api/api";
import Axios from "axios";
import { useUserContext } from "../../context/user";
import { setUser } from "../../action/user";
import { initialUser } from "../../constants/initialUser";
import { useMutation, useQuery } from "react-query";
import useStore from "../states/state";
import useCartStore from "../states/cartState";
import user_icon from "../../assets/images/icon_user.png";
import logo from "../../assets/images/logo-eclean.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userDispatch } = useUserContext();
  const cbInputRef = useRef(null);
  const [isShowing, setIsShowing] = useState(false);

  const categoryQuery = useQuery("categories", getAllCategory);
  const { data: userProfile } = useQuery("profile", () => getProfileByUserId(user.id, user.token), {
    retry: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const resultsMutation = useMutation((search) => getSearchResult(search), {});

  const handleInputChange = (e) => {
    let query = e.target.value;
    if (query.length > 1) {
      if (query.length % 2 === 0) {
        resultsMutation.mutateAsync(query);
      }
    } else {
      resultsMutation.reset();
    }
  };

  const handleLogout = async () => {
    const headers = getFullHeader(user.token);
    try {
      const res = await Axios.post(
        "/api/v1/logout",
        {},
        {
          headers,
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("user");
        userDispatch(setUser(initialUser));
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("user");
      userDispatch(setUser(initialUser));
      navigate("/login");
      throw new Error(error);
    }
  };

  const openCartSlide = useStore((state) => state.setCartSlideOpen);
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <Disclosure as="nav" className="bg-orange-500 shadow">
      <div className="container px-6 py-4 mx-auto max-w-6xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <Link
                className="text-2xl font-bold text-white transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                to="/"
              >
                <img className="h-6" src={logo} alt="Eclean logo" />
              </Link>
            </div>
            <Menu as="div" className="hidden md:block relative ml-4">
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center p-2 uppercase align-middle text-white hover:bg-orange-600 rounded-md">
                    <ViewGridIcon className="w-6 h-6 text-white" />
                  </Menu.Button>
                  <Transition
                    show={open}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute -left-20 z-20 w-80 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-md dark:bg-gray-800">
                      {categoryQuery.isFetched &&
                        categoryQuery.data.map(({ id, name, slug }) => (
                          <Menu.Item
                            as={Link}
                            key={id}
                            to={`/category/${slug}`}
                            className="flex justify-between py-2 px-4 hover:bg-gray-200"
                          >
                            <div className="flex space-x-1 items-center">
                              <TagIcon className="w-6 h-6" />
                              <span className="text-base">{name}</span>
                            </div>
                            <ChevronRightIcon className="w-6 h-6" />
                          </Menu.Item>
                        ))}
                      <Menu.Item as={Link} to="/subscriptions" className="flex justify-between py-2 px-4 hover:bg-gray-200">
                        <div className="flex space-x-1 items-center">
                          <ArchiveIcon className="w-6 h-6" />
                          <span className="text-base">Gói đăng ký</span>
                        </div>
                        <ChevronRightIcon className="w-6 h-6" />
                      </Menu.Item>
                      <Menu.Item as={Link} to="/create-subscription" className="flex justify-between py-2 px-4 hover:bg-gray-200">
                        <div className="flex space-x-1 items-center">
                          <FolderAddIcon className="w-6 h-6" />
                          <span className="text-base">Tạo gói đăng ký</span>
                        </div>
                        <ChevronRightIcon className="w-6 h-6" />
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <Disclosure.Button
                type="button"
                className="text-white dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <MenuIcon className="w-6 h-6 fill-current" />
              </Disclosure.Button>
            </div>
          </div>{" "}
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center ">
              <Combobox
                onChange={(item) => {
                  navigate(`/products/${item.slug}`);
                }}
                as="div"
                className="hidden mx-10 md:block flex-1"
              >
                <div className="relative">
                  <Combobox.Input
                    ref={cbInputRef}
                    onChange={handleInputChange}
                    onFocus={() => setIsShowing(true)}
                    onBlur={() => setIsShowing(false)}
                    className="w-full h-11 text-gray-700 text-sm bg-white border-orange-600 rounded-md focus:border-orange-400 focus:outline-none focus:ring-0 focus:ring-opacity-40 focus:ring-orange-300"
                    placeholder="Tìm sản phẩm mong muốn"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <Transition
                  show={isShowing}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Combobox.Options
                    static
                    className="absolute bg-white rounded-md max-h-96 mt-1 overflow-y-auto px-4 text-sm z-10 shadow-md"
                    style={{ width: cbInputRef.current ? cbInputRef.current.offsetWidth : "auto" }}
                  >
                    {resultsMutation.isSuccess ? (
                      resultsMutation.data.map((item) => (
                        <Combobox.Option key={item.id} value={item}>
                          {({ active }) => (
                            <div
                              className={`px-2 py-2 flex overflow-hidden items-center cursor-pointer hover:bg-gray-100 ${
                                active ? "bg-orange-500" : "bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <img src={`${BASE_URL}/${item.image}`} alt={item.name} />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.description.substring(0, 80)}...</p>
                              </div>
                            </div>
                          )}
                        </Combobox.Option>
                      ))
                    ) : resultsMutation.isIdle ? (
                      <Combobox.Option>
                        <p className="text-gray-700 text-sm px-2 py-4">Nhập từ khóa để tìm kiếm</p>
                      </Combobox.Option>
                    ) : null}
                  </Combobox.Options>
                </Transition>
              </Combobox>
            </div>
          </div>
          <div className="hidden md:flex items-center mt-4 md:mt-0 space-x-4">
            <button
              onClick={openCartSlide}
              className="relative hidden mx-4 text-white transition-colors duration-200 transform md:block"
              aria-label="show notifications"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              <span className="absolute -bottom-2 -right-3 px-1 text-xs text-white bg-blue-500 rounded-full">{cartItems.length}</span>
            </button>
            {user.id !== "" ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                  type="button"
                  className="flex items-center focus:outline-none rounded-2xl bg-gray-50"
                  aria-label="toggle profile dropdown"
                >
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img
                      src={userProfile?.avatar ? `${BASE_URL}/${userProfile?.avatar}` : user_icon}
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>
                  <h3 className="mx-2 text-xs font-semibold">{user.name}</h3>
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
                  <Menu.Items className="absolute z-10 right-0 lg:right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      {user.roles === "admin" && (
                        <Menu.Item as={Link} to={"/admin"}>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              Trang Admin
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item as={Link} to={"/profile"}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Thông tin tài khoản
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item as={Link} to={"/manager-subscription"}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Quản lý gói đăng ký
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item as={Link} to={"/wishlist"}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Sản phẩm yêu thích
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={handleLogout}
                          >
                            Thoát tài khoản
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button
                type="button"
                className="px-2 py-2 border border-white bg-white rounded-md font-semibold text-sm text-gray-800"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Disclosure.Panel>
          <div className="px-2 pt-2 pb-3 space-y-1 md:hidden">
            <p className="text-gray-100 uppercase text-sm font-semibold">Danh mục sản phẩm</p>
            {categoryQuery.isFetched &&
              categoryQuery.data.map(({ id, name, slug }) => (
                <Link
                  key={id}
                  to={`/category/${slug}`}
                  className="text-white hover:bg-orange-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {name}
                </Link>
              ))}
            <p className="text-gray-100 uppercase text-sm font-semibold">Tài khoản</p>
            <div className="flex justify-between items-center">
              <div>
                {user.id !== "" ? (
                  <div className="flex items-center">
                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img src={`${BASE_URL}/${userProfile?.avatar}`} className="object-cover w-full h-full" alt="avatar" />
                    </div>
                    <h3 className="mx-2 text-sm font-medium text-white dark:text-gray-200">{user.name}</h3>
                  </div>
                ) : (
                  <button className="font-semibold text-sm text-white" onClick={() => navigate("/login")}>
                    Đăng nhập
                  </button>
                )}
              </div>
              <div>
                <button
                  onClick={openCartSlide}
                  className="mx-4 text-white transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                  aria-label="show notifications"
                >
                  <ShoppingBagIcon className="w-6 h-6" />
                  <span className="absolute -bottom-2 -right-3 px-1 text-xs text-white bg-blue-500 rounded-full">{cartItems.length}</span>
                </button>
              </div>
            </div>
          </div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};

export default Navbar;
