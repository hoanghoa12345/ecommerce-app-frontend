import React from "react";
import { useQuery } from "react-query";
import { getListUserSubscription } from "../../api/api";
import Loader from "../components/Loader";

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSubscriptionPage;
