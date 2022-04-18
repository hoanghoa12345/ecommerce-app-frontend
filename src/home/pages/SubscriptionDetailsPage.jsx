import React from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, getSubscriptionById } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import Loader from "../components/loader/Loader";
const SubscriptionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data: subscription } = useQuery(`subscription_id_${id}`, () => getSubscriptionById(id));

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col mx-auto max-w-6xl w-full p-10 bg-white text-gray-800">
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
                  <Link to={`/products/${item.product.slug}`} className="flex items-center">
                    <span className="text-xs font-medium text-gray-600">{item.quantity}</span>
                    <span className="text-xs font-medium ml-1 text-indigo-500"> sản phẩm</span>
                  </Link>
                </div>
                <span className="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">{formatPrice(item.price)}</span>
              </div>
            </div>
          ))}
      </div>

      <section>
        <div className="container max-w-7xl mx-auto mt-6 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800">
          <div className="flex flex-wrap -mx-8">
            <div className="w-full lg:w-1/2 px-8">
              <div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
                <h2 className="mb-4 text-3xl lg:text-2xl font-bold font-heading dark:text-white">Đăng ký mua gói sản phẩm</h2>
                <p className="mb-8 leading-loose text-gray-500 dark:text-gray-300">
                  Đăng ký mua hàng với nhiều ưu đãi, tận hưởng trải nghiệm mua sắm với sản phẩm tốt nhất.
                </p>
                <div className="w-full md:w-1/3">
                  <button
                    type="button"
                    onClick={() => navigate(`/subscription-payment/${id}`)}
                    className="py-2 px-4  bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-8">
              <ul className="space-y-12">
                <li className="flex -mx-4">
                  <div className="px-4">
                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-orange-50 text-orange-600">
                      1
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">Chọn gói sản phẩm</h3>
                    <p className="text-gray-500 dark:text-gray-300 leading-loose">Đăng ký gói sản phẩm đăng ký</p>
                  </div>
                </li>
                <li className="flex -mx-4">
                  <div className="px-4">
                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-orange-50 text-orange-600">
                      2
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">Chọn chu kỳ giao hàng</h3>
                    <p className="text-gray-500 dark:text-gray-300 leading-loose">Chọn thời gian đăng ký gói sản phẩm</p>
                  </div>
                </li>
                <li className="flex -mx-4">
                  <div className="px-4">
                    <span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-orange-50 text-orange-600">
                      3
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">Chọn thời gian giao hàng</h3>
                    <p className="text-gray-500 dark:text-gray-300 leading-loose">Chọn thời gian giao hàng trong ngày theo chu kỳ</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionDetailsPage;
