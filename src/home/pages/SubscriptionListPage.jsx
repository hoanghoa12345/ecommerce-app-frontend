import React, { useState } from "react";
import { useQuery } from "react-query";
import _ from "lodash-es";
import { getSubscriptionsByAdmin } from "../../api/api";
import Loader from "../components/loader/Loader";
import SubscriptionItem from "../components/subscription/SubscriptionItem";
import { Link } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/outline";
import ErrorCard from "../components/error-card/ErrorCard";

const SubscriptionListPage = () => {
  const [limitProduct, setLimitProduct] = useState(8);
  const { data, isLoading, isError, error } = useQuery("subscriptions", () => getSubscriptionsByAdmin());

  if (isLoading) return <Loader />;
  if (isError) return <ErrorCard title="Lỗi" message="Không tìm thấy danh mục sản phẩm" errors={error} />;

  const paginateData = _.isArray(data.data) ? _.slice(data.data, 0, limitProduct) : [];
  const subscriptionListLength = _.isArray(data.data) ? data.data.length : 0;

  return (
    <div className="bg-gray-100">
      <div className="max-w-2xl mx-auto py-2 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-sm uppercase flex text-gray-900">
          <Link to="/">eClean</Link>
          <ChevronRightIcon className="w-5 h-5" /> Gói đăng ký
        </h2>
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
              className="py-2 px-4 inline-flex bg-orange-500 hover:bg-orange-400 focus:ring-orange-400 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              <ChevronDownIcon className="w-6 h-6" /> Xem thêm gói
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionListPage;
