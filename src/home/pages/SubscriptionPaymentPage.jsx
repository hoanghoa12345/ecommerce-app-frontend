import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { BASE_URL, getSubscriptionById, postUserSubscription } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserContext } from "../../context/user";
import { getProfileByUserId } from "../../api/api";
import PaymentModel from "../components/payment-model/PaymentModel";
import { zaloPayCreateOrder } from "../../utils/zaloPay";

const SubscriptionPaymentPage = () => {
  const { id } = useParams();

  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState(null);

  const { user } = useUserContext();

  const userProfileQuery = useQuery("profile", () => getProfileByUserId(user.id, user.token));
  const schema = yup
    .object({
      start_date: yup.string().required(),
      end_date: yup.string().required("Vui lòng chọn thời gian kết thúc gói"),
      delivery_schedule: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({ resolver: yupResolver(schema) });
  const {
    isLoading,
    data: subscription,
    isError,
    isSuccess,
    error: queryError,
  } = useQuery(`subscription_id_${id}`, () => getSubscriptionById(id), {
    retry: false,
  });

  useEffect(() => {
    const currentDate = new Date();
    setValue("start_date", currentDate.toISOString().split("T")[0]);
    register("subscription_id", { value: id });
    register("payment_status", { value: "Chưa thanh toán" });
  }, [id, register, setValue]);

  const userSubscriptionMutation = useMutation(postUserSubscription);
  const onSubmit = (formData) => {
    userSubscriptionMutation.mutate(
      { formData, token: user.token },
      {
        onSuccess: (data) => {
          localStorage.setItem("user_sub_id", data.sub_id);
        },
      }
    );
    setMessage("Đăng ký gói thành công!");
    zaloPayCreateOrder({
      bank_code: formData.paymentModel,
      amount: totalPrice,
    });
  };

  const handleTimeChange = (e) => {
    const times = e.target.value;

    setTotalPrice(subscription?.total_price * Number(times));

    let duration = subscription?.duration;

    let startDateValue = getValues(["start_date"])[0];
    let startDateEpoch = new Date(startDateValue).getTime();

    let epochMonth = 1000 * 60 * 60 * 24 * 30;

    let endDateEpoch = startDateEpoch + duration * epochMonth * Number(times);

    const endDate = new Date(endDateEpoch).toISOString().split("T")[0];

    setValue("end_date", endDate);
  };

  if (userProfileQuery.isSuccess) {
    //Set user profile data to form
    let data = userProfileQuery.data;
    setValue("email", user.email);
    setValue("address", data.address);
    setValue("phone_number", data.phone_number);
  }

  if (isSuccess && subscription.details.length === 0) {
    return <p>Không có sản phẩm</p>;
  }
  return (
    <div className="w-full mt-10 container max-w-6xl mx-auto">
      <div className="mt-10 sm:mt-0">
        {message ? (
          <div className="mx-4 my-2 bg-green-500 text-sm text-white rounded-md p-4">
            <span className="font-bold">✔</span> {message}
          </div>
        ) : null}

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 py-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Thông tin gói đăng ký</h3>
            </div>
            {isLoading ? (
              <div className="w-full h-24 border-2 rounded-md mx-auto">
                <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                  <div className="w-12 bg-gray-300 h-12 rounded-full"></div>
                  <div className="flex flex-col space-y-3">
                    <div className="w-48 bg-gray-300 h-6 rounded-md"></div>
                    <div className="w-32 bg-gray-300 h-6 rounded-md"></div>
                  </div>
                </div>
              </div>
            ) : isError ? (
              <>
                <p className="text-red-600 font-semibold text-sm">{queryError.message}</p>
                <Navigate to="/404" />
              </>
            ) : (
              <div className="w-full h-24 border-2 rounded-md mx-auto">
                <div className="flex flex-row items-center h-full justify-center space-x-5">
                  <div className="w-12 h-12 rounded-full ">
                    <img className="w-12 h-12 object-cover" src={`${BASE_URL}/${subscription.details[0].product.image}`} alt="imgd" />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="h-6">
                      <p className="font-semibold">{subscription.name}</p>
                    </div>
                    <div className="h-10">
                      <p>
                        {formatPrice(subscription.total_price)} ({subscription.duration} tháng)
                      </p>
                      <p className="text-black font-semibold text-sm">Tổng số tiền: {formatPrice(totalPrice)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="schedule_picker" className="block text-sm font-medium text-gray-700">
                        Chọn số lần đăng ký
                      </label>
                      <select
                        {...register("schedule_picker", {
                          onChange: handleTimeChange,
                        })}
                        id="schedule_picker"
                        name="schedule_picker"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <span className="text-xs text-red-600 dark:text-red-400">{errors.delivery_schedule?.message}</span>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                        Ngày bắt đầu
                      </label>
                      <input
                        {...register("start_date")}
                        readOnly
                        type="date"
                        name="start_date"
                        id="start_date"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <span className="text-xs text-red-600 dark:text-red-400">{errors.start_date?.message}</span>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                        Ngày kết thúc
                      </label>
                      <input
                        {...register("end_date")}
                        readOnly
                        type="date"
                        name="end_date"
                        id="end_date"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <span className="text-xs text-red-600 dark:text-red-400">{errors.end_date?.message}</span>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        {...register("email")}
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <span className="text-xs text-red-600 dark:text-red-400">{errors.email?.message}</span>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="delivery_schedule" className="block text-sm font-medium text-gray-700">
                        Lịch giao hàng
                      </label>
                      <select
                        {...register("delivery_schedule")}
                        id="delivery_schedule"
                        name="delivery_schedule"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      >
                        <option value="08:00:00">8:00</option>
                        <option value="11:00:00">11:00</option>
                        <option value="16:00:00">16:00</option>
                      </select>
                      <span className="text-xs text-red-600 dark:text-red-400">{errors.delivery_schedule?.message}</span>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Địa chỉ giao hàng
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register("address")}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                        Điện thoại
                      </label>
                      <input
                        {...register("phone_number")}
                        type="tel"
                        name="phone_number"
                        id="phone_number"
                        autoComplete="tel"
                        className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <span className="text-xs text-red-600 dark:text-red-400">{errors.phone_number?.message}</span>
                    </div>
                  </div>
                </div>

                <PaymentModel register={register} />
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPaymentPage;
