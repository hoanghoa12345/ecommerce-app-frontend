import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllProducts, deleteProduct, BASE_URL } from "../../api/api";
import AddProductModal from "../components/AddProductModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import { formatPrice } from "../../utils/formatType";
import { formatDate } from "../../utils/date";
import Loader from "../components/Loader";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [editItem, setEditItem] = useState(null);
  const { data, error, isLoading, isError } = useQuery("products", getAllProducts);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const handleAddProduct = () => {
    setOpen(true);
  };

  const editProductHandler = (item) => {
    setOpen(true);
    setEditItem(item);
  };
  const { mutateAsync } = useMutation(deleteProduct);
  const deleteProductHandler = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  };

  const onDelete = async () => {
    await mutateAsync(deleteId);
    queryClient.invalidateQueries("products");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const previousPaginate = () => setCurrentPage(currentPage - 1);

  const nextPaginate = () => setCurrentPage(currentPage + 1);
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="container grid px-6 mx-auto">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Products</h2>
      <div className="flex items-center justify-between">
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Manage product</h4>
        <button
          onClick={handleAddProduct}
          className="flex px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add <div className="ml-2">+</div>
        </button>
      </div>
      <AddProductModal open={open} setOpen={setOpen} editItem={editItem} />
      {openDelete && (
        <DeleteModal
          title={`Delete Product ${deleteId}`}
          message={"Are you want delete?"}
          open={openDelete}
          setOpen={() => setOpenDelete(false)}
          onDelete={onDelete}
        />
      )}
      {/* With actions */}
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <ProductTable data={currentProducts} onEdit={editProductHandler} onDelete={deleteProductHandler} />
        </div>
        {/*Show pagination */}
        <Pagination
          indexOfFirstProduct={indexOfFirstProduct}
          indexOfLastProduct={indexOfLastProduct}
          currentPage={currentPage}
          productsPerPage={productPerPage}
          totalProducts={data.length}
          paginate={paginate}
          previousPaginate={previousPaginate}
          nextPaginate={nextPaginate}
        />
      </div>
    </div>
  );
}

const ProductTable = ({ data, onEdit, onDelete }) => {
  return (
    <table className="w-full whitespace-no-wrap">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
        {data.map((item) => (
          <tr key={item.id} className="text-gray-700 dark:text-gray-400">
            <td className="px-4 py-3">{item.name}</td>
            <td className="px-4 py-3 text-sm">{formatPrice(item.price)}</td>
            <td className="px-4 py-3 text-xs">
              <img className="w-32 h-auto" src={`${BASE_URL}/${item.image}`} alt={item.name} />
            </td>
            <td className="px-4 py-3 text-sm">{formatDate(item.created_at)}</td>
            <td className="px-4 py-3">
              <div className="flex items-center space-x-4 text-sm">
                <button
                  onClick={() => onEdit(item)}
                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                  aria-label="Edit"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                  aria-label="Delete"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
