import { Menu, Transition } from "@headlessui/react";
import { HeartIcon, MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../api/api";
const Navbar = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getListCategory = async () => {
      const data = await getAllCategory();
      setCategory(data);
    };

    getListCategory();
  }, []);

  return (
    <nav className="bg-orange-600 shadow dark:bg-gray-800">
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
                  <Menu.Button className="relative z-10 flex items-center p-2 uppercase align-middle text-white">
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
                    <Menu.Items className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
                      {category.map(({ id, name, slug }) => (
                        <Menu.Item
                          as={Link}
                          key={id}
                          to={`/category/${slug}`}
                          className="uppercase block px-4 py-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white border-b-gray-200 border-b-2"
                        >
                          {name}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-white dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <MenuIcon className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>{" "}
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className="flex-1">
            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
              <div className="hidden mx-10 md:block flex-1">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full py-2 pl-4 pr-10 text-gray-700 text-sm bg-white border-orange-600 rounded-full dark:bg-gray-800 dark:text-gray-300 dark:border-orange-700 focus:border-orange-400 dark:focus:border-orange-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-orange-300"
                    placeholder="Tìm sản phẩm mong muốn"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button
              className="relative hidden mx-4 text-white transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
              aria-label="show notifications"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -bottom-2 -right-3 px-1 text-xs text-white bg-blue-500 rounded-full">2</span>
            </button>
            <button
              className="hidden mx-4 text-white transition-colors duration-200 transform md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
              aria-label="show notifications"
            >
              <HeartIcon className="w-6 h-6" />
            </button>
            <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                  className="object-cover w-full h-full"
                  alt="avatar"
                />
              </div>
              <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">Khatab wedaa</h3>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
