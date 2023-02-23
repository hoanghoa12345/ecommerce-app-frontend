import { Tab } from "@headlessui/react";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, getFavoritesByUser, removeFavoriteItem } from "../../api/api";
import { useUserContext } from "../../context/user";
import { formatPrice } from "../../utils/formatType";
import Loader from "../components/loader/Loader";

const WishListPage = () => {
  const { user } = useUserContext();

  const [wishProduct, setWishProduct] = useState([]);
  const [wishSubscription, setWishSubscription] = useState([]);

  const getWishListQuery = useQuery("wishlist", () => getFavoritesByUser({ userId: user.id, token: user.token }), {
    onSuccess: (data) => {
      let productsArr = [];
      let subscriptionArr = [];
      data.forEach((value) => {
        if (value.product_id !== null) {
          productsArr.push(value);
        }
        if (value.subscription_id !== null) {
          subscriptionArr.push(value);
        }
      });
      setWishProduct(productsArr);
      setWishSubscription(subscriptionArr);
    },
  });

  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation(removeFavoriteItem);

  const handleDeleteItem = (id) => {
    deleteItemMutation.mutate(
      { id, token: user.token },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          queryClient.invalidateQueries("wishlist");
        },
      }
    );
  };

  if (getWishListQuery.isLoading) return <Loader />;

  return (
    <div className="w-full mt-10 container max-w-6xl mx-auto min-h-[500px]">
      <h2 className="text-2xl font-semibold">Sản phẩm yêu thích</h2>
      <Tab.Group
        as="div"
        className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <Tab.List>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "inline-block p-4 text-orange-600 rounded-t-lg border-b-2 border-orange-600 active dark:text-orange-500 dark:border-orange-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
              >
                Sản phẩm
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "inline-block p-4 text-orange-600 rounded-t-lg border-b-2 border-orange-600 active dark:text-orange-500 dark:border-orange-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }
              >
                Gói đăng ký
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {wishProduct.length > 0 ? (
              <div className="lg:w-3/4">
                {wishProduct.map((product) => (
                  <div key={product.id}>
                    <div className="md:flex py-6 px-4 items-center">
                      <img
                        className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 object-cover"
                        src={`${BASE_URL}/${product.product.image}`}
                        alt="product"
                      />
                      <Link className="ml-4 flex-1" to={`/products/${product.product.slug}`}>
                        <h3 className="text-black font-medium text-lg">{product.product.name}</h3>
                        <p className="mt-2">
                          <span className="sr-only"> Regular Price </span>
                          <span className="tracking-wider">{formatPrice(product.product.price)}</span>
                        </p>
                      </Link>
                      <div onClick={() => handleDeleteItem(product.id)} className="p-2 rounded-full hover:bg-red-600 hover:text-white">
                        <TrashIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative p-8 text-center border border-gray-200 rounded-lg">
                <h2 className="text-2xl font-medium">Chưa có sản phẩm yêu thích...</h2>
                <p className="mt-4 text-sm text-gray-500">Xem ngay danh sách sản phẩm!</p>
                <Link
                  to="/"
                  className="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-500"
                >
                  Xem sản phẩm
                  <ArrowRightIcon className="flex-shrink-0 w-4 h-4 ml-3" />
                </Link>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>
            {wishSubscription.length > 0 ? (
              <div className="mx-auto lg:max-w-xl md:max-w-2xl">
                {wishSubscription.map((item) => (
                  <CardSubscriptionItem key={item.id} item={item} onDelete={handleDeleteItem} />
                ))}
              </div>
            ) : (
              <p>Chưa có gói đăng ký</p>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const CardSubscriptionItem = (props) => {
  const item = props.item;
  return (
    <div className="block relative p-8 bg-orange-600 border border-orange-700 shadow-xl rounded-xl my-4">
      <button
        onClick={() => props.onDelete(item.id)}
        className="absolute right-4 top-4 rounded-full px-3 py-1.5 bg-orange-100 text-orange-600 font-medium text-xs hover:bg-red-600 hover:text-orange-100"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
      <h3 className="mt-3 text-xl font-bold text-white">{item.subscription.name}</h3>
      <p className="mt-4 text-sm text-gray-100">{formatPrice(item.subscription.total_price)}</p>
    </div>
  );
};

export default WishListPage;
