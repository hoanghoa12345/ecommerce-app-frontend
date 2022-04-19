import React from "react";
import {
  CashIcon,
  ChatAltIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";

const DashboardPage = () => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h2>
        {/* Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <UserGroupIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total clients
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                6389
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <CashIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Account balance
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                $ 46,760.89
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <ShoppingCartIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                New sales
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                376
              </p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <ChatAltIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending contacts
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                35
              </p>
            </div>
          </div>
        </div>
        {/* New Table */}
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          10x Developer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Jolina Angelie</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Unemployed
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 369.95</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Sarah Curry</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Designer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 86.00</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                      Denied
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Rulia Joberts</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Actress
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 1276.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1546456073-6712f79251bb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Wenzel Dashington</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Actor
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                      Expired
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=b8377ca9f985d80264279f277f3a67f5"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Dave Li</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Influencer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Maria Ramovic</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Runner
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hitney Wouston</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Singer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* Avatar with inset shadow */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">Hans Burger</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          10x Developer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">$ 863.45</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">6/10/2020</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              Showing 21-30 of 100
            </span>
            <span className="col-span-2" />
            {/* Pagination */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
