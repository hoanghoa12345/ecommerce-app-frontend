import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { getListUserSubscription } from "../../api/api";
import Loader from "../components/Loader";
import { formatDate } from "../../utils/date";
import { DotsVerticalIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

const UserSubscriptionPage = () => {
  const { data: userSubscriptionList, isLoading } = useQuery("user-subscriptions-list", () => getListUserSubscription());
  if (isLoading) return <Loader />;
  return (
    <div className="container grid px-6 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="my-6 text-2xl font-semibold text-gray-700">User Subscriptions</h2>
      </div>
      <table className="w-full whitespace-nowrap shadow sm:rounded-lg bg-white">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Start date</th>
            <th className="px-4 py-3">End date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Delivery At</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {userSubscriptionList.map((item) => (
            <tr key={item.id} className="text-gray-700">
              <td className="px-4 py-3">{item.user.name}</td>
              <td className="px-4 py-3">{item.start_date}</td>
              <td className="px-4 py-3">{item.end_date}</td>
              <td className="px-4 py-3 text-xs">
                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3">{item.delivery_schedule}</td>
              <td className="px-4 py-3">{formatDate(item.created_at)}</td>
              <td className="px-4 py-3">
                <Menu as="div">
                  <Menu.Button
                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray hover:bg-gray-300 hover:rounded-full"
                    aria-label="Delete"
                  >
                    <DotsVerticalIcon className="w-5 h-5" />
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
                    <Menu.Items className="absolute right-10 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSubscriptionPage;
