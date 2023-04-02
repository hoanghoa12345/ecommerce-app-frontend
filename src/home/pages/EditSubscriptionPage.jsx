import { ChevronRightIcon, XIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL, bulkInsertProductSub, getAllProducts, getSubscriptionById } from "../../api/api";
import { useUserContext } from "../../context/user";
import { formatPrice } from "../../utils/formatType";

const EditSubscriptionPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const [productsAdded, setProductsAdded] = useState([]);
  const [inputQty, setInputQty] = useState(1);
  const navigate = useNavigate();
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

  const {
    isSuccess,
    isLoading: subDetailsIsLoading,
    data: subscription,
  } = useQuery(`subscription_id_${id}`, () => getSubscriptionById(id));

  // Load product added to subscriptions
  useEffect(() => {
    if (isSuccess) {
      let productItemArr = [];
      subscription.details.forEach((element) => {
        let subscriptionDetail = {
          id: element.id,
          subscription_id: element.subscription_id,
          product_id: element.product.id,
          name: element.product.name,
          price: element.product.price,
          quantity: element.quantity,
        };
        productItemArr.push(subscriptionDetail);
      });
      setProductsAdded(productItemArr);
    }
  }, [isSuccess, subscription]);

  // Handle add product list to subscriptions
  const productsSubMutation = useMutation(bulkInsertProductSub);
  const handleAddToSubscription = () => {
    productsSubMutation.mutate(
      { ...productsAdded, token: user.token },
      {
        onSuccess: async () => {
          toast.success("Cập nhật sản phẩm thành công!");
          queryClient.invalidateQueries(`subscription_id_${id}`);
          navigate("/create-subscription");
        },
        onError: async () => {
          toast.error("Không thể cập nhật gói đăng ký");
        },
      }
    );
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-6xl w-full py-8 container mx-auto">
        <ToastContainer />
        <div className="flex text-sm uppercase">
          <Link to="/">eClean</Link> <ChevronRightIcon className="w-5 h-5" />
          <Link to="/subscriptions">Gói đăng ký</Link> <ChevronRightIcon className="w-5 h-5" />
          {subscription?.name}
        </div>
        <div className="my-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="px-2 py-2 col-span-6 bg-white rounded-md">
            <h1 className="text-base font-semibold">Sản phẩm đã thêm:</h1>
            <div className="mt-4 flex flex-col space-y-2">
              {
                //Loading Products Added to Subscription
                subDetailsIsLoading &&
                  [1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="px-4 py-2 my-1 w-full animate-pulse rounded-md text-gray-500 bg-gray-200 font-semibold flex"
                    >
                      <span className="h-5 w-full"></span>
                    </div>
                  ))
              }
              {productsAdded.length > 0 ? (
                productsAdded.map((productAdded, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 w-full rounded-lg text-gray-500 bg-gray-200 font-semibold text-sm flex cursor-pointer active:bg-gray-300 transition duration-300"
                  >
                    <span className="">({productAdded.quantity}) </span>

                    <span className="flex-1 truncate">{productAdded.name}</span>
                    <button
                      onClick={() => removeProductAdded(i)}
                      className="bg-transparent hover:bg-red-500 hover:rounded-full focus:outline-none hover:text-white pr-2.5"
                    >
                      <XIcon className="w-3 ml-3" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-[100px] w-full flex justify-center item-center">
                  <p className="text-slate-800 font-semibold text-xl">Chưa có sản phẩm nào</p>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-6 px-2 py-2 bg-white rounded-md">
            <h2 className="text-base font-semibold">Chọn sản phẩm:</h2>
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
            {/* Add product choose to subscription */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddToSubscription}
                className="py-2 px-4 bg-orange-500 hover:bg-orange-400 focus:ring-orange-400 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                {productsSubMutation.isLoading && <LoaderAnimate />}
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoaderAnimate = () => {
  return (
    <svg
      role="status"
      className="inline w-4 h-4 mr-3 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default EditSubscriptionPage;
