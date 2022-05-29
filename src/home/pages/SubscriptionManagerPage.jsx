import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/user";
import { BASE_URL, deleteSubcription, getSubsByUserId, getSubscriptionById, getUserSubsByUserId } from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "./../components/loader/Loader";
import DeleteModal from "../../admin/components/DeleteModal";
import Modal from "../components/modal/Modal";
import { formatPrice } from "../../utils/formatType";

const Subscriptionmanagerpage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const Subscription = useQuery("SubsByUserId", () => getSubsByUserId(user.id));
  const UserSubscription = useQuery("UserSubsByUserId", () => getUserSubsByUserId({ id: user.id, token: user.token }));
  const { mutateAsync: deleteMutateAsync } = useMutation(deleteSubcription, {
    onSuccess: () => {
      queryClient.invalidateQueries("SubsByUserId");
    },
  });
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [isOpenView, setIsOpenView] = useState(false);
  const [selectedSub, setSelectedSub] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const onDeleteItem = (item) => {
    setDeleteItem(item);
    setIsOpenDelete(true);
  };

  const handleDeleteItem = async () => {
    await deleteMutateAsync({ token: user.token, id: deleteItem.id });
    setIsOpenDelete(false);
  };

  const onViewSubsDetail = (sub_id) => {
    const LoadSubsDetail = async () => {
      setIsLoading(true);
      const data = await getSubscriptionById(sub_id);
      setSelectedSub(data);
      setIsLoading(false);
    };
    LoadSubsDetail();
    setIsOpenView(true);
  };

  if (Subscription.isError || UserSubscription.isError) {
    return (
      <p>
        {Subscription.error.message} || {UserSubscription.error.message}
      </p>
    );
  }

  if (Subscription.isLoading) {
    return <Loader />;
  }

  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      as={"div"}
      className="max-w-2xl mx-auto py-2 px-4 mb-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8 min-h-[500px]"
    >
      <Tab.List className={"flex flex-wrap -mb-px text-sm font-medium text-center"}>
        <Tab
          className={`${
            selectedIndex === 0
              ? "text-orange-600 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-500 border-orange-600 dark:border-orange-500"
              : ""
          } inline-block p-4 rounded-t-lg border-b-2`}
        >
          Danh sách gói
        </Tab>
        <Tab
          className={`${
            selectedIndex === 1
              ? "text-orange-600 hover:text-orange-600 dark:text-orange-500 dark:hover:text-orange-500 border-orange-600 dark:border-orange-500"
              : ""
          } inline-block p-4 rounded-t-lg border-b-2`}
        >
          Đã kích hoạt
        </Tab>
      </Tab.List>
      <Tab.Panels className={"pt-4"}>
        <div className="flex justify-end mb-4">
          <Link to={"/create-subscription"}>
            <button
              type="button"
              className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg "
            >
              Thêm gói mới
            </button>
          </Link>
        </div>
        <Tab.Panel>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <DeleteModal
              isDelete={true}
              open={isOpenDelete}
              title={"Xóa gói sản phẩm"}
              setOpen={() => setIsOpenDelete(false)}
              message={`Bạn có chắc muốn xóa ${deleteItem.name}?`}
              onDelete={handleDeleteItem}
            />
            <Modal title={""} setIsClose={() => setIsOpenView(false)} isOpen={isOpenView}>
              {isLoading === false && (
                <>
                  <div className="text-center mb-4">
                    <h2 className="font-bold text-lg">{selectedSub.name}</h2>
                    <p className="text-sm">Chu kỳ: {selectedSub.duration} tháng</p>
                  </div>

                  <div className="flex flex-wrap justify-center bg-slate-50">
                    <div className="mt-2 max-w-2xl h-[580px] overflow-y-auto">
                      <ul>
                        {selectedSub.details.map((item) => (
                          <li key={item.id} className="md:flex py-6 px-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img className="w-full h-full object-cover" src={`${BASE_URL}/${item.product.image}`} alt="product" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                                <Link to={`/products/${item.product.slug}`} className="font-medium">
                                  <h3>{item.product.name}</h3>
                                </Link>
                                <p className="mt-4">{formatPrice(item.price)}</p>
                              </div>
                              <div className="flex flex-row items-center mt-2">
                                <p className="text-gray-500 mr-2">Số lượng: {item.quantity}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </Modal>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tên gói
                  </th>
                  <th scope="col" className="px-4 py-3">
                    chu kỳ (tháng)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-4 py-3">
                    chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {Subscription.data.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </th>
                    <td className="px-4 py-3">{item.duration}</td>
                    <td className="px-4 py-3">{formatPrice(item.total_price)}</td>
                    <td className="px-4 py-3">
                      {item.status === "active" ? (
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            type="button"
                            onClick={() => onViewSubsDetail(item.id)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-4 text-sm">
                          <Link to={`/create-subscription/${item.id}`}>
                            <button
                              type="button"
                              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                              aria-label="Edit"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                          </Link>
                          <button
                            onClick={() => onDeleteItem(item)}
                            type="button"
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                          <Link to={`/subscription-payment/${item.id}`}>
                            <button
                              type="button"
                              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                              aria-label="Delete"
                            >
                              <PlusCircleIcon className="w-5 h-5" />
                            </button>
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tên gói
                  </th>
                  <th scope="col" className="px-4 py-3">
                    chu kỳ (tháng)
                  </th>
                  <th scope="col" className="px-4 py-3">
                    tổng tiền
                  </th>
                  <th scope="col" className="px-4 py-3">
                    ngày bắt đầu
                  </th>
                  <th scope="col" className="px-4 py-3">
                    ngày kết thúc
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {UserSubscription.isLoading ? (
                  <Loader />
                ) : (
                  UserSubscription.data.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {item?.subscription.name}
                      </th>
                      <td className="px-4 py-3">{item?.subscription.duration}</td>
                      <td className="px-4 py-3">{formatPrice(item?.subscription.total_price)}</td>
                      <td className="px-4 py-3">{item?.start_date}</td>
                      <td className="px-4 py-3">{item?.end_date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            type="button"
                            onClick={() => onViewSubsDetail(item.subscription_id)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 dark:text-orange-500 rounded-lg focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Modal title={""} setIsClose={() => setIsOpenView(false)} isOpen={isOpenView}>
              {isLoading && (
                <>
                  <div className="flex items-center flex-col mb-4">
                    <div className="h-6 w-6/12 rounded-md bg-gray-300" />
                    <div className="h-6 w-4/12 rounded-md bg-gray-300 mt-2" />
                  </div>
                  <div className="md:flex py-6 px-4 animate-pulse">
                    <div className="h-24 w-24 flex-shrink-0 rounded-md border border-gray-200 bg-gray-300" />
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                        <div className="h-6 w-full rounded-md bg-gray-300" />
                        <div className="h-6 w-4/12 rounded-md bg-gray-300 mt-4" />
                      </div>
                      <div className="flex flex-row items-center mt-2">
                        <div className="h-6 w-4/12 rounded-md bg-gray-300" />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {isLoading === false && (
                <>
                  <div className="text-center mb-4">
                    <h2 className="font-bold text-lg">{selectedSub.name}</h2>
                    <p className="text-sm">Chu kỳ: {selectedSub.duration} tháng</p>
                  </div>

                  <div className="flex flex-wrap justify-center bg-slate-50">
                    <div className="mt-2 max-w-2xl h-[580px] overflow-y-auto">
                      <ul>
                        {selectedSub.details.map((item) => (
                          <li key={item.id} className="md:flex py-6 px-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img className="w-full h-full object-cover" src={`${BASE_URL}/${item.product.image}`} alt="product" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                                <Link to={`/products/${item.product.slug}`} className="font-medium">
                                  <h3>{item.product.name}</h3>
                                </Link>
                                <p className="mt-4">{formatPrice(item.price)}</p>
                              </div>
                              <div className="flex flex-row items-center mt-2">
                                <p className="text-gray-500 mr-2">Số lượng: {item.quantity}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </Modal>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Subscriptionmanagerpage;
