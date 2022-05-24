import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

const Subscriptionmanagerpage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      as={"div"}
      className="max-w-2xl mx-auto py-2 px-4 mb-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 min-h-[500px]"
    >
      <Tab.List className={"flex flex-wrap -mb-px text-sm font-medium text-center"}>
        <Tab
          className={`${
            selectedIndex === 0
              ? "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
              : ""
          } inline-block p-4 rounded-t-lg border-b-2`}
        >
          Inactive
        </Tab>
        <Tab
          className={`${
            selectedIndex === 1
              ? "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
              : ""
          } inline-block p-4 rounded-t-lg border-b-2`}
        >
          Active
        </Tab>
      </Tab.List>
      <Tab.Panels className={"pt-4"}>
        <div className="flex justify-end mb-4">
          <button className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
            Add Subscription
          </button>
        </div>
        <Tab.Panel>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    duration (month)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    total price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    start_date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    end_date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3">$2999</td>
                  <td className="px-4 py-3">25/02/2022</td>
                  <td className="px-4 py-3">30/10/2022</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        // onClick={() => onEdit(item)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 dark:text-blue-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        // onClick={() => onDelete(item.id)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 dark:text-blue-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        // onClick={() => onEdit(item)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 dark:text-blue-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        // onClick={() => onDelete(item.id)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 dark:text-blue-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        // onClick={() => onEdit(item)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 dark:text-blue-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        // onClick={() => onDelete(item.id)}
                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 dark:text-blue-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </Tab.Panel>
        <Tab.Panel>Đã kích hoạt</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Subscriptionmanagerpage;
