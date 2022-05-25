import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { CollectionIcon, HeartIcon, LogoutIcon, MenuIcon, SearchIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/outline";
import React, { useState, Fragment } from "react";
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

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userDispatch } = useUserContext();
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
    }
  };

  const handleLogout = async () => {
    const headers = getFullHeader(user.token);
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
  };

  const openCartSlide = useStore((state) => state.setCartSlideOpen);
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <Disclosure as="nav" className="bg-orange-600 shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto max-w-6xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-700">
              <Link
                className="text-2xl font-bold text-white transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                to="/"
              >
                eClean
              </Link>
            </div>
            <Menu as="div" className="hidden md:block relative ml-4">
              {({ open }) => (
                <>
                  <Menu.Button className="relative flex items-center p-2 uppercase align-middle text-white">
                    <MenuIcon className="w-5 h-5 text-white" />
                    <span className="mx-1">Tất cả danh mục</span>
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
                    <Menu.Items className="absolute left-[10px] z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                      {categoryQuery.isFetched &&
                        categoryQuery.data.map(({ id, name, slug }) => (
                          <Menu.Item
                            as={Link}
                            key={id}
                            to={`/category/${slug}`}
                            className="uppercase block px-4 py-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white border-b-gray-200 border-b-2"
                          >
                            {name}
                          </Menu.Item>
                        ))}
                      <Menu.Item
                        as={Link}
                        to="/subscriptions"
                        className="uppercase block px-4 py-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white border-b-gray-200 border-b-2"
                      >
                        Gói đăng ký
                      </Menu.Item>
                      <Menu.Item
                        as={Link}
                        to="/create-subscription"
                        className="uppercase block px-4 py-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white border-b-gray-200 border-b-2"
                      >
                        Tạo gói đăng ký
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
            <div className="flex flex-col -mx-4 md:flex-row md:items-center ">
              <Popover className="hidden mx-10 md:block flex-1">
                <div className="relative">
                  <input
                    type="search"
                    className="w-full py-2 pl-4 pr-10 text-gray-700 text-sm bg-white border-orange-600 rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-orange-700 focus:border-orange-400 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-orange-300"
                    placeholder="Tìm sản phẩm mong muốn"
                    onChange={handleInputChange}
                    onFocus={() => setIsShowing(true)}
                    onBlur={() => setIsShowing(false)}
                  />
                  <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <Transition
                  show={isShowing}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    static
                    className="absolute z-10 w-screen max-w-md px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-2xl"
                  >
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-8 bg-white p-7">
                        {resultsMutation.isSuccess &&
                          resultsMutation.data.map((item) => (
                            <Link
                              key={item.id}
                              to={`/products/${item.slug}`}
                              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                                <img src={`${BASE_URL}/${item.image}`} alt={item.name} />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.description.substring(0, 40)}...</p>
                              </div>
                            </Link>
                          ))}
                        {resultsMutation.isIdle && <p>Nhập từ khóa để tìm kiếm</p>}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
          <div className="hidden md:flex items-center mt-4 md:mt-0">
            <button
              onClick={openCartSlide}
              className="relative hidden mx-4 text-white transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
              aria-label="show notifications"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -bottom-2 -right-3 px-1 text-xs text-white bg-blue-500 rounded-full">{cartItems.length}</span>
            </button>
            <button
              className="hidden mx-4 text-white transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
              aria-label="show notifications"
            >
              <HeartIcon className="w-6 h-6" />
            </button>
            {user.id !== "" ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                    <img
                      src={userProfile?.avatar ? `${BASE_URL}/${userProfile?.avatar}` : user_icon}
                      className="object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>
                  <h3 className="mx-2 text-sm font-medium text-white dark:text-gray-200">{user.name}</h3>
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
                  <Menu.Items className="absolute z-10 right-0 lg:left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item as={Link} to={"/"}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            Thông tin cá nhân
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
                            <CollectionIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            Quản lý gói đăng ký
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
                            Đăng xuất
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button className="font-semibold text-sm text-white" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
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
                  <ShoppingCartIcon className="w-6 h-6" />
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
