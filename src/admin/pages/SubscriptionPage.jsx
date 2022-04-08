import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { ClipboardListIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { getSubscriptionList } from "../../api/api";

const SubscriptionPage = () => {
  const { data, error, isLoading, isError } = useQuery("subscriptions", getSubscriptionList);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container grid px-6 mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="my-6 text-2xl font-semibold text-gray-700">Subscription List</h2>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create
        </button>
      </div>
      <table className="w-full whitespace-nowrap shadow sm:rounded-lg bg-white">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Total Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {isLoading ? (
            <span>Loading...</span>
          ) : isError ? (
            <span>{error}</span>
          ) : (
            data.map((item) => (
              <Disclosure as={Fragment}>
                <tr key={item.id} className="text-gray-700">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.duration}</td>
                  <td className="px-4 py-3">{item.total_price}</td>
                  <td className="px-4 py-3 flex items-center space-x-4">
                    <Disclosure.Button className="flex items-center justify-between px-2 py-2 text-purple-600 text-sm hover:bg-gray-200 hover:border-gray-200 hover:rounded-full">
                      <ClipboardListIcon className="w-5 h-5" />
                    </Disclosure.Button>
                    <button className="flex items-center justify-between px-2 py-2 text-purple-600 text-sm hover:bg-gray-200 hover:border-gray-200 hover:rounded-full">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-between px-2 py-2 text-purple-600 text-sm hover:bg-gray-200 hover:border-gray-200 hover:rounded-full">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
                <Disclosure.Panel as="tr">Subscription Details</Disclosure.Panel>
              </Disclosure>
            ))
          )}
        </tbody>
      </table>

      {/** Modal Create */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Create new subscription
                </Dialog.Title>
                <div className="mt-2">
                  <div>
                    <label htmlFor="subscriptionName" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="subscriptionName"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="subscriptionDuration" className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <select
                      id="subscriptionDuration"
                      name="subscriptionDuration"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>1 month</option>
                      <option>2 mouth</option>
                      <option>3 mouth</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SubscriptionPage;
