import React, { useState } from "react";
import { CashIcon, ChatAltIcon, UserGroupIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
import { BASE_URL, getAdminDashboardInfo } from "../../api/api";
import { useUserContext } from "../../context/user";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
let limitUser = 4;
const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUserContext();
  const token = user.token;
  const { data, isLoading, isError, error } = useQuery("dashboard", () => getAdminDashboardInfo(token), {
    retry: false,
  });
  if (isLoading) return <Loader />;
  if (isError) return <span>{error.message}</span>;
  const indexOfLastProduct = currentPage * limitUser;
  const indexOfFirstProduct = indexOfLastProduct - limitUser;
  const currentProducts = data.clients.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const previousPaginate = () => setCurrentPage(currentPage - 1);
  const nextPaginate = () => setCurrentPage(currentPage + 1);
  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Dashboard</h2>
        {/* Cards */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <UserGroupIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total clients</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{data.total_client}</p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <CashIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Account balance</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{data.account_balance}</p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <ShoppingCartIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">New sales</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{data.new_sales}</p>
            </div>
          </div>
          {/* Card */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <ChatAltIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Pending contacts</p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{data.pending_contacts}</p>
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
                {currentProducts.map((user) => (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        {/* Avatar with inset shadow */}
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={BASE_URL + "/" + user.avatar}
                            alt=""
                            loading="lazy"
                          />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.amount} ₫</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            indexOfFirstProduct={indexOfFirstProduct}
            indexOfLastProduct={indexOfLastProduct}
            currentPage={currentPage}
            productsPerPage={limitUser}
            totalProducts={data.clients.length}
            paginate={paginate}
            previousPaginate={previousPaginate}
            nextPaginate={nextPaginate}
          />
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
