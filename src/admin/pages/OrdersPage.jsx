import { Menu } from "@headlessui/react";
import { DotsVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL, deleteOrderById, getListOrder, updateStatusOrderById } from "../../api/api";
import { useUserContext } from "../../context/user";
import { formatDate } from "../../utils/date";
import { formatPrice } from "../../utils/formatType";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import PaginationPro from "../components/PaginationPro";

let PageSize = 8;
const OrdersPage = () => {
  const [isOpenView, setIsOpenView] = useState(false);
  const [itemView, setItemView] = useState({});
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const queryClient = useQueryClient();
  const { user } = useUserContext();
  const { data: orders, isLoading } = useQuery("orders", () => getListOrder(user.token));
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return orders?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, orders]);

  const handleOpenModelView = (item) => {
    setIsOpenView(true);
    setItemView(item);
  };
  const { mutate: deleteOrderMutate } = useMutation(deleteOrderById);
  const { mutate: updateStatusMutate } = useMutation(updateStatusOrderById);
  const handleOpenDeleteModal = (id) => {
    setIsOpenDelete(true);
    setDeleteId(id);
  };
  const handleDeleteOrder = () => {
    deleteOrderMutate(
      { id: deleteId, token: user.token },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("orders");
          setIsOpenDelete(false);
        },
      }
    );
  };
  const handleUpdateStatus = (id) => {
    updateStatusMutate(
      { id, status: "delivered", token: user.token },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("orders");
          setIsOpenView(false);
        },
      }
    );
  };
  if (isLoading) return <Loader />;
  return (
    <div className="container grid px-6 mx-auto">
      <Modal show={isOpenView} onClose={() => setIsOpenView(false)} title={`Order ID: ${itemView.order_number}`} maxWidth={"3xl"}>
        <div className="mx-2 my-4">
          <ul className="text-sm font-medium text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg">Total price: {formatPrice(itemView.total_price)}</li>
            <li className="w-full px-4 py-2 border-b border-gray-200">Total qty: {itemView.total_qty}</li>
            <li className="w-full px-4 py-2 border-b border-gray-200">Status: {itemView.status}</li>
            <li className="w-full px-4 py-2 border-b border-gray-200">Name: {itemView.user?.name}</li>
            <li className="w-full px-4 py-2 border-b border-gray-200">Email: {itemView.user?.email}</li>
            <li className="w-full px-4 py-2 border-b border-gray-200">Phone number: {itemView.phone_number}</li>
            <li className="w-full px-4 py-2 border-b border-gray-200">Address: {itemView.address}</li>
            <li className="w-full px-4 py-2 rounded-b-lg">Created at: {itemView.created_at}</li>
          </ul>
          <div className="mt-4">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemView.details?.map((item) => (
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">
                        <img className="w-16 h-16 rounded-md ring-2 ring-white" src={`${BASE_URL}/${item.product.image}`} alt="" />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.product.name}</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">{formatPrice(item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-row justify-between">
              <button
                onClick={() => setIsOpenView(false)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Close
              </button>
              <button
                onClick={() => handleUpdateStatus(itemView.id)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Mark as delivered
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <DeleteModal
        title="Delete"
        message="Delete order?"
        open={isOpenDelete}
        setOpen={() => setIsOpenDelete(false)}
        onDelete={handleDeleteOrder}
        isDelete
      />
      <div className="flex justify-between items-center">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Orders</h2>
      </div>
      <table className="w-full whitespace-nowrap shadow sm:rounded-lg bg-white dark:bg-gray-700">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 dark:text-gray-400 uppercase border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-3">Order Number</th>
            <th className="px-4 py-3">Total Price</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
          {currentTableData.map((item) => (
            <tr key={item.id} className="text-gray-700 dark:text-gray-400" onClick={() => handleOpenModelView(item)}>
              <td className="px-4 py-3 text-sm">{item.order_number}</td>
              <td className="px-4 py-3 text-sm">{formatPrice(item.total_price)}</td>
              <td className="px-4 py-3 text-sm">{item.total_qty}</td>
              <td className="px-4 py-3 text-xs">
                {item.status === "delivered" ? (
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Delivered</span>
                ) : (
                  <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">Pending</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm">{item.user.email}</td>
              <td className="px-4 py-3 text-sm">{formatDate(item.created_at)}</td>
              <td className="px-4 py-3">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button>
                    <DotsVerticalIcon className="w-5 h-5" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleOpenModelView(item)}
                            className={`${
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <EyeIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            View
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleOpenDeleteModal(item.id)}
                            className={`${
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center my-4">
        <PaginationPro
          currentPage={currentPage}
          totalCount={orders.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
