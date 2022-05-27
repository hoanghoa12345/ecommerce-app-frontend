import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import useStore from "../../states/state";
import useCartStore from "../../states/cartState";
import { BASE_URL } from "../../../api/api";
import { formatPrice } from "../../../utils/formatType";

const CartSlide = () => {
  const { cartRemoveItem, cartItems: products, cartIncrementQty, cartDecrementQty } = useCartStore();
  const { setCartSlideOpen: setOpen, cartSlideOpen: open } = useStore();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900"> Giỏ hàng </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {products.map(({ product, qty }) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={`${BASE_URL}/${product.image}`}
                                  alt={product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <Link to={`/products/${product.slug}`}>{product.name}</Link>
                                    </h3>
                                    <p className="ml-4">{formatPrice(product.price)}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex rounded-lg overflow-hidden h-8">
                                    <button
                                      onClick={() => cartDecrementQty({ product, qty })}
                                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 w-10"
                                    >
                                      -
                                    </button>
                                    <input type="text" className="w-10 text-center outline-none border-gray-300" readOnly value={qty} />
                                    <button
                                      onClick={() => cartIncrementQty({ product, qty })}
                                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 w-10"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="flex">
                                    <button
                                      onClick={() => cartRemoveItem(product.id)}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Tạm tính</p>
                      <p>
                        {formatPrice(
                          products.reduce(
                            (previousValue, currentsValue) => previousValue + currentsValue.product.price * currentsValue.qty,
                            0
                          )
                        )}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Phí vận chuyển sẽ được tính khi thanh toán.</p>
                    <div className="mt-6">
                      <Link
                        to="/checkout"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                      >
                        Thanh toán
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        hoặc{" "}
                        <button type="button" className="font-medium text-orange-600 hover:text-orange-500" onClick={() => setOpen(false)}>
                          Tiếp tục mua hàng<span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartSlide;
