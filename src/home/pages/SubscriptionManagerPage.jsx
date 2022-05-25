import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/user";
import { getSubsByUserId, getUserSubsByUserId } from "../../api/api";
import { useQuery } from "react-query";
import Loader from "../../admin/components/Loader";

const Subscriptionmanagerpage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUserContext();
  const Subscription = useQuery("SubsByUserId", () => getSubsByUserId(user.id));
  const UserSubscription = useQuery("UserSubsByUserId", () => getUserSubsByUserId({ id: user.id, token: user.token }));

  if (Subscription.isError || UserSubscription.isError) {
    return (
      <p>
        {Subscription.error.message} || {UserSubscription.error.message}
      </p>
    );
  }

  if (Subscription.isLoading) {
    return <Loader />;
  }

  console.log("Subs ", Subscription.data);
  console.log("UserSubs ", UserSubscription.data);

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
              ? "text-orange-600 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-500 border-orange-600 dark:border-orange-500"
              : ""
          } inline-block p-4 rounded-t-lg border-b-2`}
        >
          Danh sách gói
        </Tab>
        <Tab
          className={`${
            selectedIndex === 1
              ? "text-orange-600 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-500 border-orange-600 dark:border-orange-500"
              : ""
          } inline-block p-4 rounded-t-lg border-b-2`}
        >
          Đã kích hoạt
        </Tab>
      </Tab.List>
      <Tab.Panels className={"pt-4"}>
        <div className="flex justify-end mb-4">
          <Link to={"/create-subscription"}>
            <button className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
              Thêm gói mới
            </button>
          </Link>
        </div>
        <Tab.Panel>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tên gói
                  </th>
                  <th scope="col" className="px-4 py-3">
                    chu kỳ (tháng)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tổng tiền (vnđ)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {Subscription.data.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </th>
                    <td className="px-4 py-3">{item.duration}</td>
                    <td className="px-4 py-3">{item.total_price}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          // onClick={() => onEdit(item)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                          aria-label="Edit"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          // onClick={() => onDelete(item.id)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                          aria-label="Delete"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        <button
                          // onClick={() => onDelete(item.id)}
                          className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                          aria-label="Delete"
                        >
                          <PlusCircleIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tên gói
                  </th>
                  <th scope="col" className="px-4 py-3">
                    chu kỳ (tháng)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    tổng tiền (vnđ)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    ngày bắt đầu
                  </th>
                  <th scope="col" className="px-4 py-3">
                    ngày kết thúc
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {UserSubscription.isLoading ? (
                  <Loader />
                ) : (
                  UserSubscription.data.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {item?.subscription.name}
                      </th>
                      <td className="px-4 py-3">{item?.subscription.duration}</td>
                      <td className="px-4 py-3">{item?.subscription.total_price}</td>
                      <td className="px-4 py-3">{item?.start_date}</td>
                      <td className="px-4 py-3">{item?.end_date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            // onClick={() => onEdit(item)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Subscriptionmanagerpage;
