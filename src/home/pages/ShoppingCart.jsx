import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import useCartStore from "../states/cartState";

function ShoppingCart() {
  const { cartRemoveItem, cartItems: products, cartIncrementQty, cartDecrementQty } = useCartStore();

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className=" max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold py-4">Giỏ hàng của bạn ({products.length})</h1>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <div>
              <ul>
                {products.map(({ product, qty }) => (
                  <li key={product.id} className="flex space-x-4 flex-start mb-4 px-4 py-4 bg-white rounded-md">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
                      <img src={`${BASE_URL}/${product.image}`} alt={product.name} className="h-full w-full object-contain" />
                    </div>
                    <h3 className="flex-1 text-sm truncate">
                      <Link to={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <p className="ml-4 font-semibold text-md">{formatPrice(product.price)}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => cartDecrementQty({ product, qty })}
                        className="w-10 h-8 bg-gray-200 text-gray-500 hover:bg-gray-100 rounded-md"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-10 h-8 text-center outline-none border-gray-300 text-sm rounded-md"
                        readOnly
                        value={qty}
                      />
                      <button
                        onClick={() => cartIncrementQty({ product, qty })}
                        className="w-10 h-8 bg-gray-200 text-gray-500 hover:bg-gray-100 rounded-md"
                      >
                        +
                      </button>
                    </div>
                    <button onClick={() => cartRemoveItem(product.id)} type="button" className="h-8">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-4">
            <div className="bg-white rounded-md p-4">
              <div className="py-4 flex justify-between text-base font-medium text-gray-900">
                <p>Tạm tính</p>
                <p className="font-semibold">
                  {formatPrice(
                    products.reduce((previousValue, currentsValue) => previousValue + currentsValue.product.price * currentsValue.qty, 0)
                  )}
                </p>
              </div>
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
