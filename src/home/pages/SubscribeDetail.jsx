import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, getSubscriptionById } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import Loader from "../components/loader/Loader";
const SubscribeDetail = () => {
  const { id } = useParams();
  const { isLoading, data: subscription } = useQuery(`subscription_id_${id}`, () => getSubscriptionById(id));
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col max-w-6xl w-full p-10 bg-white text-gray-800">
      <h1 className="text-3xl font-semibold">{subscription.name}</h1>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
        {subscription.details.length > 0 &&
          subscription.details.map((item) => (
            <div key={item.id}>
              <div className="block h-64 rounded-lg shadow-lg bg-white">
                <img src={`${BASE_URL}/${item.product.image}`} alt="product" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <Link to={`/products/${item.product.slug}`} className="font-medium">
                    {item.product.name}
                  </Link>
                  <a className="flex items-center" href="/">
                    <span className="text-xs font-medium text-gray-600">{item.quantity}</span>
                    <span className="text-xs font-medium ml-1 text-indigo-500"> sản phẩm</span>
                  </a>
                </div>
                <span className="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">{formatPrice(item.price)}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-10 space-x-1">
        <p className="flex text-center font-semibold text-2xl">Đăng ký mua gói sản phẩm</p>
      </div>
    </div>
  );
};

export default SubscribeDetail;
