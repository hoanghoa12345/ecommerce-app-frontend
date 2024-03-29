import { EyeIcon, TrashIcon, PencilIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  BASE_URL,
  bulkInsertProductSub,
  createNewSubscription,
  deleteSubcription,
  getAllProducts,
  getSubscriptionList,
} from "../../api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../components/DeleteModal";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { XIcon } from "@heroicons/react/outline";
import { formatPrice } from "../../utils/formatType";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import { useUserContext } from "../../context/user";

const schema = yup.object({
  name: yup.string().required(),
  duration: yup.number().required(),
});
let limitProduct = 8;
const SubscriptionPage = () => {
  const { user } = useUserContext();
  const { data, error, isLoading, isError } = useQuery("subscriptions", getSubscriptionList);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
  const [itemPreview, setItemPreview] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [itemEdit, setItemEdit] = useState({});

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(createNewSubscription);
  const { mutateAsync: deleteMutateAsync } = useMutation(deleteSubcription);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    await mutateAsync({
      name: data.name,
      duration: data.duration,
      total_price: 0,
    });
    queryClient.invalidateQueries("subscriptions");
    setIsOpen(false);
    toast.success("Create new subscription successful!");
  };

  const onDeleteItem = (item) => {
    setIsOpenDelete(true);
    setDeleteItem(item);
  };

  const handleDelete = async () => {
    await deleteMutateAsync(
      { id: deleteItem.id, token: user.token },
      {
        onSuccess: () => {
          toast.success("Deleted Item");
          setIsOpenDelete(false);
          queryClient.invalidateQueries("subscriptions");
        },
        onError: () => {
          toast.error("Failed delete item");
        },
      }
    );
  };

  const onPreviewList = (item) => {
    setOpenEditModal(true);
    setItemEdit(item);
  };

  const handleEditItem = (item) => {
    setOpenPreview(true);
    setItemPreview(item);
    let productItemArr = [];
    item.details.forEach((element) => {
      let subscriptionDetail = {
        subscription_id: element.subscription_id,
        product_id: element.product.id,
        name: element.product.name,
        price: element.product.price,
        quantity: element.quantity,
      };
      productItemArr.push(subscriptionDetail);
    });

    setProductsAdded(productItemArr);
  };

  const {
    data: products,
    error: productError,
    isLoading: productsIsLoading,
    isError: productIsError,
  } = useQuery("products", getAllProducts);

  const [productsAdded, setProductsAdded] = useState([]);
  const [inputQty, setInputQty] = useState(1);

  const addProductToSub = (subId, product, qty, index) => {
    let i = 0;

    const prdItem = productsAdded.find((prd, index) => {
      i = index;
      return prd.product_id === product.id;
    });

    let currentList = [...productsAdded];
    if (prdItem) {
      currentList[i] = { subscription_id: subId, product_id: product.id, name: product.name, price: product.price, quantity: qty };
      setProductsAdded(currentList);
    } else {
      setProductsAdded([
        ...productsAdded,
        { subscription_id: subId, product_id: product.id, name: product.name, price: product.price, quantity: qty },
      ]);
    }
    setInputQty(1);
  };

  const removeProductAdded = (i) => {
    productsAdded.splice(i, 1);
    setProductsAdded([...productsAdded]);
  };

  const productsSubMutation = useMutation((listProductSub) => bulkInsertProductSub(listProductSub));
  const submitProductSubscription = () => {
    productsSubMutation.mutate(
      { ...productsAdded, token: user.token },
      {
        onSuccess: async () => {
          toast.success("Update product for subscription");
          setOpenPreview(false);
          setItemPreview(null);
          setProductsAdded([]);
          queryClient.invalidateQueries("subscriptions");
        },
        onError: async () => {
          toast.error("Can not create subscription");
        },
      }
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * limitProduct;
  const indexOfFirstProduct = indexOfLastProduct - limitProduct;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const previousPaginate = () => setCurrentPage(currentPage - 1);

  const nextPaginate = () => setCurrentPage(currentPage + 1);

  return (
    <div className="container grid px-6 mx-auto">
      <ToastContainer />
      <DeleteModal
        isDelete
        title="Delete"
        message={`Are you want delete ${deleteItem.name}?`}
        open={isOpenDelete}
        setOpen={() => setIsOpenDelete(false)}
        onDelete={() => handleDelete()}
      />
      <div className="flex justify-between items-center">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Subscription List</h2>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Create
        </button>
      </div>
      {productIsError && <li className="text-red-600 text-center">{productError}</li>}
      <table className="w-full whitespace-nowrap shadow sm:rounded-lg bg-white dark:bg-gray-800">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 dark:text-gray-400 uppercase border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Duration (Month)</th>
            <th className="px-4 py-3">Total Price</th>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <Loader />
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td>{error}</td>
            </tr>
          ) : (
            //Data for pagination
            currentProducts.map((item) => (
              <Fragment key={item.id}>
                <tr className="text-gray-700 dark:text-gray-400">
                  <td className="px-4 py-3 flex">{item.name}</td>
                  <td className="px-4 py-3">{item.duration}</td>
                  <td className="px-4 py-3">{formatPrice(item.total_price)}</td>
                  <td className="px-4 py-3">{item.user.name}</td>
                  <td className="px-4 py-3 flex items-center space-x-4">
                    <button className="flex items-center justify-between px-2 py-2 text-purple-600 text-sm hover:bg-gray-200 hover:border-gray-200 hover:rounded-full">
                      <PencilIcon onClick={() => handleEditItem(item)} className="w-5 h-5" />
                      {productsIsLoading && <Loader />}
                    </button>
                    <button
                      onClick={() => onPreviewList(item)}
                      className="flex items-center justify-between px-2 py-2 text-purple-600 text-sm hover:bg-gray-200 hover:border-gray-200 hover:rounded-full"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item)}
                      className="flex items-center justify-between px-2 py-2 text-purple-600 text-sm hover:bg-gray-200 hover:border-gray-200 hover:rounded-full"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </Fragment>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        indexOfFirstProduct={indexOfFirstProduct}
        indexOfLastProduct={indexOfLastProduct}
        currentPage={currentPage}
        productsPerPage={limitProduct}
        totalProducts={data?.length}
        paginate={paginate}
        previousPaginate={previousPaginate}
        nextPaginate={nextPaginate}
      />
      {/* Create new subscription modal */}
      <Modal show={isOpen} title="Create new subscription" maxWidth="2xl" onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2">
            <div>
              <label htmlFor="subscriptionName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="subscriptionName"
                className={`mt-1 ${
                  errors.name?.message ? "focus:ring-red-500 focus:border-red-500" : "focus:ring-purple-500 focus:border-purple-500"
                } block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                placeholder="Name"
                aria-autocomplete="none"
                {...register("name")}
              />
              <span className="text-xs text-red-600 dark:text-red-400">{errors.name?.message}</span>
            </div>
            <div>
              <label htmlFor="subscriptionDuration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <select
                id="subscriptionDuration"
                name="subscriptionDuration"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                {...register("duration")}
              >
                {[1, 2, 3, 4, 5, 6].map((mouth, i) => (
                  <option key={i} value={mouth}>
                    {mouth} month
                  </option>
                ))}
              </select>
              <span className="text-xs text-red-600 dark:text-red-400">{errors.duration?.message}</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-500 border border-transparent rounded-md hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
      {/* Update products in subscription */}
      <Modal show={openPreview} title={itemPreview?.name} maxWidth="3xl" onClose={() => setOpenPreview(false)}>
        <div>
          <div className="flex flex-wrap justify-center space-x-2 max-h-36 overflow-y-auto">
            {productsAdded.map((productAdd, i) => (
              <div key={i}>
                <ChipProduct
                  key={i}
                  name={`(${productAdd?.quantity}) ${productAdd?.name.substring(0, 20)}...`}
                  onRemove={() => removeProductAdded(i)}
                />
              </div>
            ))}
            {productsAdded.length === 0 && <span className="dark:text-gray-300">Please choose products</span>}
          </div>
          <div className="flow-root mt-6 max-h-96 overflow-y-scroll border-t border-gray-200 dark:border-gray-700">
            <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
              {products &&
                products.map((product, index) => (
                  <li key={product.id} className="flex py-6 px-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img src={`${BASE_URL}/${product.image}`} alt={product.name} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
                          <h3>
                            <a href={product.slug}> {product.name} </a>
                          </h3>
                          <p className="ml-4">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty {product.quantity}</p>
                        <input
                          type="number"
                          className="input input-bordered border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 w-14 rounded-lg"
                          placeholder="1"
                          onChange={(e) => setInputQty(e.target.value)}
                          min="1"
                          max={product.quantity}
                        ></input>
                        <div className="flex">
                          <button
                            onClick={() => addProductToSub(itemPreview?.id, product, inputQty, index)}
                            type="button"
                            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex items-center justify-end border-t border-gray-200 dark:border-gray-700 pt-2 space-x-2 rounded-b">
            <button
              type="button"
              onClick={() => setOpenPreview(false)}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Cancel
            </button>
            <Button onClick={submitProductSubscription} type="button" isLoading={productsSubMutation.isLoading}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <Modal show={openEditModal} title={itemEdit.name} maxWidth="3xl" onClose={() => setOpenEditModal(false)}>
        <div className="bg-white dark:bg-gray-800">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {itemEdit.details?.map((item) => (
                <div key={item.id} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={`${BASE_URL}/${item.product.image}`}
                      alt={item.product.name}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-400 max-h-9 overflow-hidden">{item.product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-400">{`${formatPrice(item.price)} x ${
                    item.quantity
                  }`}</p>
                </div>
              ))}
            </div>
            {itemEdit.details?.length === 0 && <p className="dark:text-gray-300 text-center">Không có sản phẩm</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionPage;

const ChipProduct = ({ name, onRemove }) => {
  return (
    <span className="px-4 py-2 my-1 rounded-full text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
      {name}
      <button onClick={onRemove} className="bg-transparent hover focus:outline-none">
        <XIcon className="w-3 ml-3" />
      </button>
    </span>
  );
};
