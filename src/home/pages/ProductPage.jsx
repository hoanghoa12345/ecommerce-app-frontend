import { HeartIcon } from "@heroicons/react/solid";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { BASE_URL, getProductBySlug } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import Product from "../components/product/Product";
import { useQuery } from "react-query";
import useStore from "../states/cartState";
import { toast, ToastContainer } from "react-toastify";

export default function ProductPage() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isError,
    isLoading,
    error,
  } = useQuery(`product_${productSlug}`, () => getProductBySlug(productSlug), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const { cartAddItem } = useStore();
  const handleAddToCart = () => {
    cartAddItem({ product, qty: 1 });
    toast.success("Thêm sản phẩm vào giỏ hàng!");
  };
  if (isLoading) return <Loader />;
  if (isError) return <p>{error}</p>;
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={`${BASE_URL}/${product.image}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category.name}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
            <h2 className="text-xl text-orange-600 font-semibold mt-20 mb-2">Mô tả sản phẩm</h2>
            <p className="leading-relaxed">{product.description}</p>
            <div className="mt-6 mb-2">
              <p className="title-font font-medium text-xl line-through text-gray-500">{formatPrice(product.price + 15000)}</p>
              <span className="title-font font-semibold text-2xl text-red-600">{formatPrice(product.price)}</span>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <button
                  onClick={() => navigate("/subscriptions")}
                  className="flex ml-auto text-white bg-orange-500 uppercase border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                >
                  Đăng ký mua gói sản phẩm
                </button>
              </div>
            </div>

            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="flex ml-5 text-white bg-orange-500 uppercase border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Thêm vào giỏ
              </button>
              <button className="flex ml-5 text-white bg-orange-500 uppercase border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Mua ngay
              </button>
              <button className="rounded-full ml-auto w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                <HeartIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-5 py-5 mx-auto">
        <div className="lg:w-4/5 mx-auto px-4 mb-20">
          <h1 className="text-xl font-semibold text-center uppercase">Sản phẩm liên quan</h1>
          <div className="mb-7">
            <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
              {product.relatedProduct.map((item) => (
                <Product key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
