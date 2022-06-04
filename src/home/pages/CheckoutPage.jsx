import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCartStore from "../states/cartState";
import { formatPrice } from "../../utils/formatType";
import { BASE_URL, createNewOrder, getProfileByUserId } from "../../api/api";
import { CheckIcon, SelectorIcon, TrashIcon } from "@heroicons/react/solid";
import { useUserContext } from "../../context/user";
import { useMutation, useQuery } from "react-query";
import Loader from "../components/loader/Loader";
import Modal from "../components/modal/Modal";
import { Combobox, Transition } from "@headlessui/react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    phone_number: yup.string().required("Vui lòng nhập số điện thoại"),
    delivery_schedule: yup.string().required(),
  })
  .required();

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isOpenView, setIsOpenView] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const { cartRemoveItem, cartItems: products, cartIncrementQty, cartDecrementQty, cartDestroy } = useCartStore();
  const { user } = useUserContext();
  const userProfileQuery = useQuery("profile", () => getProfileByUserId(user.id, user.token));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const checkoutMutation = useMutation(createNewOrder);

  const onSubmit = (formdata) => {
    setCheckoutInfo(formdata);
    setIsOpenView(true);
    //Show ATM Bank choose
    setIsOpenPayment(true);
    console.log(formdata);
  };

  const handlePayment = (data) => {
    console.log(data);
    //Hide form fill bank info to payment and show successful payment
    setIsOpenPayment(false);
    let total_price = products.reduce((previousValue, currentsValue) => previousValue + currentsValue.product.price * currentsValue.qty, 0);
    let total_qty = products.reduce((previousValue, currentsValue) => previousValue + currentsValue.qty, 0);
    let order_detail = [];
    products.forEach((element) => {
      order_detail.push({
        product_id: element.product.id,
        quantity: element.qty,
        price: element.product.price,
      });
    });
    checkoutMutation.mutate(
      {
        formData: {
          user_id: user.id,
          total_price: total_price,
          total_qty: total_qty,
          status: "not_delivery",
          address: checkoutInfo.address,
          phone_number: checkoutInfo.phone_number,
          order_detail: order_detail,
        },
        token: user.token,
      },
      {
        onSuccess: () => {
          cartDestroy();
        },
      }
    );
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
              <option value="atm_debit_card">Thẻ ngân hàng nội địa</option>
              <option value="online_wallet">Ví điện tử</option>
              <option value="visa_debit_card">Thẻ quốc tế</option>
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

      <Modal title={checkoutMutation.isLoading ? "Đang xử lý..." : ""} setIsClose={() => setIsOpenView(false)} isOpen={isOpenView}>
        {isOpenPayment ? (
          <ATMPaymentView onPayment={(data) => handlePayment(data)} />
        ) : (
          <div>
            {checkoutMutation.isLoading ? (
              <Loader />
            ) : (
              <div className="flex flex-col justify-center items-center mx-12">
                <BadgeCheckIcon className="w-8 h-8 text-green-600 text-center" />
                <h2 className="text-2xl font-semibold">Thanh toán thành công!</h2>
                <p className="text-sm text-gray-700">
                  Đơn hàng đã được thanh toán thành công! Vui lòng kiểm tra thông tin đơn hàng trong email
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="inline-flex w-4/12 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Trở về trang chủ
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
      {/* <Modal title={checkoutMutation.isLoading ? "Đang xử lý..." : ""} setIsClose={() => setIsOpenPayment(false)} isOpen={isOpenPayment}>
        {checkoutMutation.isLoading && <Loader />}
        {checkoutMutation.isSuccess && (
          <div className="flex flex-col justify-center items-center mx-12">
            <BadgeCheckIcon className="w-8 h-8 text-green-600 text-center" />
            <h2 className="text-2xl font-semibold">Thanh toán thành công!</h2>
            <p className="text-sm text-gray-700">
              Đơn hàng đã được thanh toán thành công! Vui lòng kiểm tra thông tin đơn hàng trong email
            </p>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex w-4/12 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Trở về trang chủ
            </button>
          </div>
        )}
      </Modal> */}
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

const bankInfoSchema = yup
  .object({
    card_number: yup.string().required("Vui lòng nhập số thẻ"),
    card_date: yup.string().required("Vui lòng nhập ngày phát hành thẻ"),
    card_holder: yup.string().required("Vui lòng nhập tên chủ thẻ"),
  })
  .required();
const bgUrl = "http://localhost:8000/upload/bank_sprites.png";
const banksList = [
  { id: 1, name: "AB Bank", style: { width: "101px", height: "50px", background: `url(${bgUrl}) -297px -260px` } },
  { id: 2, name: "ACB Bank", style: { width: "99px", height: "50px", background: `url(${bgUrl}) -402px -50px` } },
  { id: 3, name: "Agribank", style: { width: "100px", height: "50px", background: `url(${bgUrl}) -0 -312px` } },
  { id: 4, name: "Bac A Bank", style: { width: "100px", height: "50px", background: `url(${bgUrl}) -100px -312px` } },
  { id: 5, name: "BIDV", style: { width: "100px", height: "50px", background: `url(${bgUrl}) -200px -312px` } },
  { id: 6, name: "Citi Bank", style: { width: "101px", height: "52px", background: `url(${bgUrl}) -0 -0` } },
  { id: 7, name: "Eximbank", style: { width: "99px", height: "52px", background: `url(${bgUrl}) -302px -156px` } },
  { id: 8, name: "HD Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -0 -104px` } },
  { id: 9, name: "TVB", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -100px -104px` } },
  { id: 10, name: "LienVietPost Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -202px -0` } },
  { id: 11, name: "MB Bank", style: { width: "101px", height: "52px", background: `url(${bgUrl}) -101px -0` } },
  { id: 12, name: "MSB", style: { width: "99px", height: "52px", background: `url(${bgUrl}) -302px -208px` } },
  { id: 13, name: "OCB", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -202px -52px` } },
  { id: 14, name: "Ocean Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -202px -104px` } },
  { id: 15, name: "PV Com bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -0 -156px` } },
  { id: 16, name: "Sacombank", style: { width: "101px", height: "52px", background: `url(${bgUrl}) -0 -52px` } },
  { id: 17, name: "Saigon Bank", style: { width: "99px", height: "52px", background: `url(${bgUrl}) -0 -260px` } },
  { id: 18, name: "SCB", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -100px -156px` } },
  { id: 19, name: "SEA Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -200px -156px` } },
  { id: 20, name: "SHB", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -0 -208px` } },
  { id: 21, name: "Shinhan Bank", style: { width: "101px", height: "52px", background: `url(${bgUrl}) -101px -52px` } },
  { id: 22, name: "Techcombank", style: { width: "99px", height: "52px", background: `url(${bgUrl}) -99px -260px` } },
  { id: 23, name: "TB Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -100px -208px` } },
  { id: 24, name: "Bản Việt", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -200px -208px` } },
  { id: 25, name: "VIB", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -302px -0` } },
  { id: 26, name: "Vietcombank", style: { width: "99px", height: "52px", background: `url(${bgUrl}) -198px -260px` } },
  { id: 27, name: "Vietin Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -302px -52px` } },
  { id: 28, name: "VP Bank", style: { width: "100px", height: "52px", background: `url(${bgUrl}) -302px -104px` } },
  { id: 29, name: "VISA", style: { width: "99px", height: "50px", background: `url(${bgUrl}) -402px -100px` } },
  { id: 30, name: "JCB", style: { width: "100px", height: "50px", background: `url(${bgUrl}) -300px -312px` } },
  { id: 31, name: "Master card", style: { width: "100px", height: "50px", background: `url(${bgUrl}) -402px -0` } },
];
const ATMPaymentView = ({ onPayment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(bankInfoSchema) });
  const onSubmit = (formdata) => {
    onPayment({ ...formdata, bank_name: selected.name });
  };
  const [selected, setSelected] = useState(banksList[0]);
  const [query, setQuery] = useState("");

  const filteredBank =
    query === ""
      ? banksList
      : banksList.filter((bank) => bank.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));
  return (
    <div className="w-full h-[400px] bg-gray-100">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(bank) => bank.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredBank.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                filteredBank.map((bankItem) => (
                  <Combobox.Option
                    key={bankItem.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-orange-600 text-white" : "text-gray-900"}`
                    }
                    value={bankItem}
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center">
                        <div className="mr-2" style={bankItem.style}></div>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{bankItem.name}</span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-orange-600"}`}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <div>
        <div style={selected.style}></div>

        <span>Ngân hàng: {selected.name}</span>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col my-2">
            <input
              {...register("card_number")}
              className="p-2 border rounded-md w-11/12"
              name="card_number"
              type="text"
              placeholder="Nhập số thẻ"
            />
            <span className="text-xs text-red-600 dark:text-red-400">{errors.card_number?.message}</span>
          </div>
          <div className="flex flex-col my-2 mr-4">
            <input
              {...register("card_date")}
              className="p-2 border rounded-md w-3/12 "
              name="card_date"
              type="text"
              placeholder="Ngày phát hành"
            />
            <span className="text-xs text-red-600 dark:text-red-400">{errors.card_date?.message}</span>
          </div>
          <div className="flex flex-col my-2">
            <input
              {...register("card_holder")}
              className="p-2 border rounded-md w-7/12 "
              name="card_holder"
              type="text"
              placeholder="Tên chủ thẻ"
            />
            <span className="text-xs text-red-600 dark:text-red-400">{errors.card_holder?.message}</span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex w-4/12 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Thực hiện giao dịch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
