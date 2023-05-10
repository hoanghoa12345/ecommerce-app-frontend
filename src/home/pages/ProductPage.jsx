import { HeartIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { addToFavorite, BASE_URL, getProductBySlug } from "../../api/api";
import { formatPrice } from "../../utils/formatType";
import Product from "../components/product/Product";
import { useMutation, useQuery } from "react-query";
import useStore from "../states/cartState";
import { toast, ToastContainer } from "react-toastify";
import { useUserContext } from "../../context/user";
import ErrorCard from "../components/error-card/ErrorCard";

export default function ProductPage() {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useUserContext();
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
  const addToWishListMutation = useMutation(addToFavorite);

  const handleAddToWishList = (productId) => {
    if (user.token.length > 0)
      addToWishListMutation.mutate(
        {
          formData: {
            user_id: user.id,
            product_id: productId,
          },
          token: user.token,
        },
        {
          onSuccess: (wish) => {
            toast.success(wish.message);
            setIsLiked(true);
          },
          onError: (err) => toast.error(err.message),
        }
      );
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorCard title="Lỗi" message="Không tìm thấy sản phẩm" errors={error} />;
  return (
    <section className="text-gray-600 body-font overflow-hidden bg-gray-100">
      <ToastContainer />
      <div className="container px-4 py-4 mx-auto">
        <div className="bg-white p-4 rounded-md lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="product name" className="lg:w-1/3 w-full h-auto object-contain p-4" src={`${BASE_URL}/${product.image}`} />
          <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm font-medium leading-4 px-2">{product.category.name}</h2>
            <h1 className="text-gray-900 text-2xl font-light translate-x-2 py-2">{product.name}</h1>
            <h2 className="text-xl text-orange-500 font-semibold mt-20 mb-2">Mô tả sản phẩm</h2>
            <p className="text-sm text-gray-800">{product.description}</p>
            <div className="mt-6 mb-2">
              <span className="title-font font-semibold text-2xl text-red-600">{formatPrice(product.price)}</span>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex ml-6 items-center">
                <button
                  onClick={() => navigate("/subscriptions")}
                  className="flex ml-auto text-white capitalize bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                >
                  Đặt mua gói sản phẩm
                </button>
              </div>
            </div>

            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="flex ml-5 text-white capitalize bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
              >
                Thêm vào giỏ
              </button>
              <button className="flex ml-5 text-white capitalize bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                Mua ngay
              </button>
              <button
                onClick={() => handleAddToWishList(product.id)}
                className={`rounded-full ml-auto w-10 h-10 p-0 border-0 inline-flex items-center justify-center ${
                  isLiked ? "text-red-500 bg-red-200 " : "text-gray-500 bg-gray-200 "
                }`}
              >
                <HeartIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container px-5 py-5 mx-auto">
        <div className="bg-white rounded-md px-4 py-2 lg:w-4/5 mx-auto mb-20">
          <h1 className="text-xl font-semibold text-center uppercase p-4">Sản phẩm liên quan</h1>
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
