import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllProducts } from "../api/api";
import AddProductModal from "../components/AddProductModal";

export default function ProductsPage() {
  const { data, error, isLoading, isError } = useQuery(
    "products",
    getAllProducts
  );
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("/api/v1/products", {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((res) => setProducts(res.data.data));
  // }, []);
  const [open, setOpen] = useState(false);
  const handleAddProduct = () => {
    setOpen(true);
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="container grid px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Products
      </h2>
      <div className="flex items-center justify-between">
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Manage product
        </h4>
        <button
          onClick={handleAddProduct}
          className="flex px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add <div className="ml-2">+</div>
        </button>
      </div>
      <AddProductModal open={open} setOpen={setOpen} />
      {/* With actions */}
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {data.data.map((item) => (
                <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-sm">{item.price}</td>
                  <td className="px-4 py-3 text-xs">
                    <img
                      className="h-32"
                      src={"/" + item.image}
                      alt={item.name}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm">{item.created_at}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
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
  );
}
