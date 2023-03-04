import React, { useState } from "react";
import { useQuery } from "react-query";
import _ from "lodash-es";
import { getSubscriptionsByAdmin } from "../../api/api";
import Loader from "../components/loader/Loader";
import SubscriptionItem from "../components/subscription/SubscriptionItem";

const SubscriptionListPage = () => {
  const [limitProduct, setLimitProduct] = useState(8);
  const { data, isLoading, isError, error } = useQuery("subscriptions", () => getSubscriptionsByAdmin());

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-600">{error.message}</p>;

  const paginateData = _.isArray(data.data) ? _.slice(data.data, 0, limitProduct) : [];
  const subscriptionListLength = _.isArray(data.data) ? data.data.length : 0;

  return (
    <div className="bg-gray-100">
      <div className="max-w-2xl mx-auto py-2 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Gói đăng ký</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* Display list subscription */}
          {paginateData.map((subItem, index) => (
            <SubscriptionItem key={subItem.id} item={subItem} />
          ))}
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center w-full">
          {paginateData.length < subscriptionListLength && (
            <button
              onClick={() => {
                setLimitProduct(subscriptionListLength);
              }}
              type="button"
              className="py-2 px-4  bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Xem thêm gói
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionListPage;
