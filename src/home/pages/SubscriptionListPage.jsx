import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getSubscriptionList } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import Loader from "../components/loader/Loader";

const SubscriptionListPage = () => {
  const subscriptionList = useQuery("subscriptions", getSubscriptionList);
  if (subscriptionList.isLoading) return <Loader />;
  if (subscriptionList.isError) return <p className="text-red-600">{subscriptionList.error}</p>;
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-2 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Gói đăng ký</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {subscriptionList.data.map((subItem) => (
            <div key={subItem.id} className="group relative">
              <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 border-1">
                <div className="grid grid-cols-2 gap-1">
                  {{
                    0: (
                      <div className="relative col-span-2">
                        <div className="text-white text-xl absolute inset-0  bg-slate-900/80 flex justify-center items-center">
                          Không có sản phẩm
                        </div>
                      </div>
                    ),
                    1: (
                      <div className="bg-gray-400 col-span-2 overflow-hidden">
                        <img
                          src={subItem.details[0]?.product.image}
                          alt={subItem.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    ),
                    2: (
                      <>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[0]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[1]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-white col-span-1 overflow-hidden h-1"></div>
                      </>
                    ),
                    3: (
                      <>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[0]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[1]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[2]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </>
                    ),
                    4: (
                      <>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[0]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[1]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[2]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="bg-gray-400 col-span-1 overflow-hidden">
                          <img
                            src={subItem.details[3]?.product.image}
                            alt={subItem.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </>
                    ),
                  }[subItem.details.length] || (
                    <>
                      <div className="bg-gray-400 col-span-1 overflow-hidden">
                        <img
                          src={subItem.details[0]?.product.image}
                          alt={subItem.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="bg-gray-400 col-span-1 overflow-hidden">
                        <img
                          src={subItem.details[1]?.product.image}
                          alt={subItem.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="bg-gray-400 col-span-1 overflow-hidden">
                        <img
                          src={subItem.details[2]?.product.image}
                          alt={subItem.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="bg-gray-400 col-span-1 overflow-hidden relative">
                        <div className="text-white bg-slate-800/80 text-xl absolute inset-0 flex justify-center items-center">
                          + {subItem.details.length - 3}
                        </div>
                        <img
                          src={subItem.details[3]?.product.image}
                          alt={subItem.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-semibold">
                    <Link to={`/subscriptions/${subItem.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {subItem.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{subItem.duration} tháng</p>
                </div>
                <p className="text-md font-semibold text-gray-900">{formatPrice(subItem.total_price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionListPage;
