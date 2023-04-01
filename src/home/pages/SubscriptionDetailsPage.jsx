import { ChevronRightIcon, HeartIcon } from "@heroicons/react/outline";
import { ViewGridAddIcon, ViewListIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { toast } from "react-toastify";
import { addToFavorite, BASE_URL, copyNewSubscription, getSubscriptionById } from "../../api/api";
import { useUserContext } from "../../context/user";
import { formatPrice } from "../../utils/formatType";
import Loader from "../components/loader/Loader";
import useStore from "../states/displayState";

const SubscriptionDetailsPage = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const { displayType, setDisplayType } = useStore();
  const { isLoading, data: subscription } = useQuery(`subscription_id_${id}`, () => getSubscriptionById(id));
  const copySubsMutation = useMutation(copyNewSubscription);
  const handleEditSubscription = () => {
    const formData = {
      user_id: user.id,
      subscription_name: subscription.name,
      subscription_duration: subscription.duration,
      subscription_detail: subscription.details,
    };
    const token = user.token;
    copySubsMutation.mutate(
      {
        formData,
        token,
      },
      {
        onSuccess: (data) => {
          if (data.status === 201) {
            navigate(`/create-subscription/${data.subscription_id}`);
          }
        },
      }
    );
  };

  const addToWishListMutation = useMutation(addToFavorite);

  const handleAddToWishList = (subscriptionId) => {
    if (user.token.length > 0)
      addToWishListMutation.mutate(
        {
          formData: {
            user_id: user.id,
            subscription_id: subscriptionId,
          },
          token: user.token,
        },
        {
          onSuccess: (wish) => {
            toast.success(wish.message);
          },
          onError: (err) => toast.error(err.message),
        }
      );
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col mx-auto max-w-6xl w-full p-10 bg-white text-gray-800">
      <Tab.Group>
        <div className="flex w-full justify-between justify-items-center">
          <h3 className="text-sm uppercase flex ">
            <Link to="/">eClean</Link> <ChevronRightIcon className="w-5 h-5" /> <Link to="/subscriptions">Gói đăng ký</Link>{" "}
            <ChevronRightIcon className="w-5 h-5" /> {subscription.name}
          </h3>

          {/* Menu choose display type */}
          <div className="flex items-center space-x-2">
            <span>Xem: </span>

            <Tab.List>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button onClick={() => setDisplayType("list")} type="button" className={selected ? "text-gray-900" : "text-gray-300"}>
                    <ViewListIcon className="w-6 h-6" />
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button onClick={() => setDisplayType("grid")} type="button" className={selected ? "text-gray-900" : "text-gray-300"}>
                    <ViewGridAddIcon className="w-6 h-6" />
                  </button>
                )}
              </Tab>
            </Tab.List>

            {/* Button add to wishlist */}
            <button
              onClick={() => handleAddToWishList(subscription.id)}
              type="button"
              className="ml-4 hover:bg-orange-600 rounded-full hover:text-white p-1"
            >
              <HeartIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/*Display grid and list item layout */}
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
              {subscription.details.map((item) => (
                <div key={item.id}>
                  <div className="block h-48">
                    <Link to={`/products/${item.product.slug}`}>
                      <img src={`${BASE_URL}/${item.product.image}`} alt="product" className="w-full h-full object-cover" />
                    </Link>
                  </div>
                  <div>
                    <div className="flex flex-wrap overflow-hidden text-ellipsis text-ellipsis--2">
                      <Link to={`/products/${item.product.slug}`} className="text-sm">
                        {item.product.name}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-400">
                      <span>{item.quantity}</span>
                      <span> sản phẩm</span>
                    </div>
                    <span className="font-semibold text-red-500">{formatPrice(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
          {/* Display product by list */}
          <Tab.Panel>
            <ul>
              {subscription.details.map((item) => (
                <li key={item.id} className="md:flex py-6 px-4">
                  <div className="h-48 w-48 flex-shrink-0 overflow-hidden">
                    <img className="w-full h-full object-cover" src={`${BASE_URL}/${item.product.image}`} alt="product" />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex flex-col justify-between">
                      <Link to={`/products/${item.product.slug}`} className="text-sm text-gray-900">
                        <h3>{item.product.name}</h3>
                      </Link>
                      <p className="mt-12 font-semibold text-red-500">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                      <p className="text-gray-500 text-sm mr-2">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="w-full flex justify-end space-x-4 my-4">
        <button
          onClick={handleEditSubscription}
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-orange-200 font-semibold text-orange-500 hover:text-white hover:bg-orange-500 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Chỉnh sửa gói
        </button>
        <button
          type="button"
          onClick={() => navigate(`/subscription-payment/${id}`)}
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default SubscriptionDetailsPage;
