import { XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { BASE_URL, getAllProducts } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import Loader from "../components/loader/Loader";

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const [productsAdded, setProductsAdded] = useState([]);
  const [inputQty, setInputQty] = useState(1);
  const addProductToSub = (product) => {
    const subId = id;
    let qty = inputQty;
    let i = 0;
    const productItem = productsAdded.find((item, index) => {
      i = index;
      return item.product_id === product.id;
    });

    let currentList = [...productsAdded];
    if (productItem) {
      currentList[i] = {
        subscription_id: subId,
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
      };
      setProductsAdded(currentList);
    } else {
      setProductsAdded([
        ...productsAdded,
        {
          subscription_id: subId,
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: qty,
        },
      ]);
    }
    setInputQty(1);
  };

  const removeProductAdded = (index) => {
    productsAdded.splice(index, 1);
    setProductsAdded([...productsAdded]);
  };

  const {
    data: products,
    error: productError,
    isLoading: productsIsLoading,
    isError: productIsError,
    isFetched: productIsFetched,
  } = useQuery("products", getAllProducts);
  return (
    <div className="max-w-6xl w-full mt-8 container mx-auto">
      <div>
        <h1 className="text-2xl font-semibold">Sản phẩm đã thêm:</h1>
        <div className="flex flex-wrap flex-row items-center justify-end pt-2 space-x-2 rounded-b max-w-4xl mx-auto">
          {productsAdded.map((productAdded, i) => (
            <div
              key={i}
              className="px-4 py-2 my-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex aligh-center w-max cursor-pointer active:bg-gray-300 transition duration-300"
            >
              ({productAdded.quantity}) {productAdded.name.substring(0, 40)}...
              <button
                onClick={() => removeProductAdded(i)}
                className="bg-transparent hover:bg-red-500 hover:rounded-full focus:outline-none hover:text-white pr-2.5"
              >
                <XIcon className="w-3 ml-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Chọn sản phẩm:</h2>
      {/* Make skeleton loading */}
      <div className="max-w-2xl h-auto mt-4 mx-auto space-y-4">
        {productsIsLoading &&
          [1, 2, 3, 4].map((index) => (
            <div key={index} className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
              <div className="w-24 bg-gray-300 h-24 rounded-md" />
              <div className="flex-1">
                <div className="flex flex-col space-y-3">
                  <div className="w-full bg-gray-300 h-6 rounded-sm" />
                  <div className="w-32 bg-gray-300 h-4 rounded-sm" />
                </div>
              </div>
              <div className="w-24 bg-gray-300 h-10 rounded-md align-baseline" />
            </div>
          ))}
      </div>
      {/* Product list to choose */}
      <div className="flex flex-wrap justify-center">
        <div className="mt-2 max-w-2xl h-[450px] overflow-y-auto">
          {productIsFetched && (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="flex py-6 px-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={BASE_URL + "/" + product.image} alt={product.name} />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                        <h3>{product.name}</h3>
                        <p>{formatPrice(product.price)}</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <p className="text-gray-500 mr-2">Qty {product.quantity}</p>
                      <input
                        type="number"
                        className="input input-bordered border-gray-300 w-14 rounded-lg"
                        placeholder="1"
                        onChange={(e) => setInputQty(e.target.value)}
                        min="1"
                        max={product.quantity}
                      />
                    </div>
                  </div>
                  {/* Add new product to subscription */}
                  <div className="ml-4">
                    <button
                      type="button"
                      onClick={() => addProductToSub(product)}
                      className="text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Thêm
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <span>{productIsError && { productError }}</span>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionPage;
