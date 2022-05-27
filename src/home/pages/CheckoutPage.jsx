import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCartStore from "../states/cartState";
import { formatPrice } from "../../utils/formatType";
import { BASE_URL, getProfileByUserId } from "../../api/api";
import { TrashIcon } from "@heroicons/react/solid";
import { useUserContext } from "../../context/user";
import { useQuery } from "react-query";
import Loader from "../components/loader/Loader";

const schema = yup
  .object({
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    phone_number: yup.string().required("Vui lòng nhập số điện thoại"),
    delivery_schedule: yup.string().required(),
  })
  .required();

const CheckoutPage = () => {
  const { cartRemoveItem, cartItems: products, cartIncrementQty, cartDecrementQty } = useCartStore();
  const { user } = useUserContext();
  const userProfileQuery = useQuery("profile", () => getProfileByUserId(user.id, user.token));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (formdata) => {
    console.log(formdata);
  };

  if (userProfileQuery.isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full my-10 px-4 container max-w-6xl mx-auto">
      <div className="overflow-x-auto shadow-sm">
        <OrderTable
          cartIncrementQty={cartIncrementQty}
          cartDecrementQty={cartDecrementQty}
          cartRemoveItem={cartRemoveItem}
          products={products}
        />
      </div>

      <div className="border-t-4 border-orange-300 w-2/6 h-3 mx-auto my-5"></div>

      <div className="mt-5">
        <div className="uppercase mt-8 my-4 font-bold text-base">Thông tin thanh toán</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    readOnly
                    defaultValue={user.email}
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
                    defaultValue={userProfileQuery.data.address}
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    {...register("address")}
                  />
                  <span className="text-xs text-red-600 dark:text-red-400">{errors.address?.message}</span>
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    Tỉnh
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                    Điện thoại
                  </label>
                  <input
                    {...register("phone_number")}
                    type="tel"
                    defaultValue={userProfileQuery.data.phone_number}
                    name="phone_number"
                    id="phone_number"
                    autoComplete="tel"
                    className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <span className="text-xs text-red-600 dark:text-red-400">{errors.phone_number?.message}</span>
                </div>
              </div>
            </div>
            <span className="text-left text-sm font-medium text-gray-700 py-2 px-6">Phương thức thanh toán: Vui lòng chọn</span>
            <select className="text-sm border-0" {...register("payment_status")}>
              <option value="atm_debit_card">Thẻ ghi nợ nội địa</option>
              <option value="online_wallet">Ví điện tử</option>
              <option value="visa_debit_card">Thẻ thanh toán quốc tế</option>
            </select>
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
  );
};

const OrderTable = ({ cartDecrementQty, cartIncrementQty, cartRemoveItem, products }) => {
  let total_price = products.reduce((previousValue, currentsValue) => previousValue + currentsValue.product.price * currentsValue.qty, 0);

  return (
    <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            Tên sản phẩm
          </th>
          <th scope="col" className="px-4 py-3">
            giá
          </th>
          <th scope="col" className="px-4 py-3">
            số lượng
          </th>
          <th scope="col" className="px-4 py-3">
            tổng
          </th>
          <th scope="col" className="px-4 py-3">
            Chức năng
          </th>
        </tr>
      </thead>
      <tbody>
        {products.length !== 0 ? (
          <>
            {products.map(({ product, qty }) => (
              <tr
                key={product.id}
                className="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  <div className="flex items-center text-sm">
                    <div className="relative hidden w-8 h-8 mr-3 md:block">
                      <img className="object-cover w-full h-full" src={`${BASE_URL}/${product.image}`} alt={product.name} loading="lazy" />
                      {/* <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" /> */}
                    </div>
                    <p className="font-semibold text-ellipsis max-w-xs overflow-hidden">{product.name}</p>
                  </div>
                </th>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3 flex overflow-hidden h-14">
                  <button
                    onClick={() => cartDecrementQty({ product, qty })}
                    className="bg-gray-300 rounded-l-lg text-gray-600 hover:text-gray-700 hover:bg-gray-400 w-10"
                  >
                    -
                  </button>
                  <input type="text" className="w-10 text-center outline-none border-gray-300" readOnly value={qty} />
                  <button
                    onClick={() => cartIncrementQty({ product, qty })}
                    className="bg-gray-300 rounded-r-lg text-gray-600 hover:text-gray-700 hover:bg-gray-400 w-10"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-3">{formatPrice(product.price * qty)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => cartRemoveItem(product.id)}
                    type="button"
                    className="text-orange-600 hover:text-orange-400 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="text-base text-gray-900 dark:text-white font-bold">
              <td colSpan={3} className="px-4 py-3">
                Tổng tiền
              </td>
              <td colSpan={2} className="px-4 py-3">
                {formatPrice(total_price)}
              </td>
            </tr>
          </>
        ) : (
          <tr className="h-7"></tr>
        )}
      </tbody>
    </table>
  );
};

export default CheckoutPage;
