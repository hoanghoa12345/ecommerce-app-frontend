import React, { Fragment, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAllCategory, createProduct, BASE_URL, updateProduct } from "../../api/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductModal = ({ open, setOpen, editItem }) => {
  const schema = yup
    .object({
      name: yup.string().min(5).required(),
      category_id: yup.number().positive().integer().required(),
      description: yup.string().min(5).required(),
      price: yup.number().integer().required(),
      quantity: yup.number().integer().positive().required(),
      //image: yup.mixed().required("You need to provide a file"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  //React Hook Form init
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(createProduct);
  const { mutateAsync: updateMutateAsync } = useMutation(updateProduct);
  const onSubmit = async (data) => {
    if (editItem === null) {
      await mutateAsync(data);
    }
    if (editItem) {
      await updateMutateAsync({ ...data, id: editItem.id });
    }
    setOpen(false);
    queryClient.invalidateQueries("products");
    toast.success("Update product successful!");
  };

  const [image, setImage] = useState(null);

  const { data } = useQuery("categories", getAllCategory);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue("image", acceptedFiles[0]);
      setImage(acceptedFiles[0]);
    },
    [image]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Fragment>
      <ToastContainer />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                    <form className="col-span-12" onSubmit={handleSubmit(onSubmit)}>
                      <div>
                        <div className="px-4 py-4 bg-white space-y-4 sm:p-6">
                          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              defaultValue={editItem?.name}
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="Product"
                              {...register("name")}
                            />
                          </div>
                          <span className="text-xs text-red-600 dark:text-red-400">{errors.name?.message}</span>
                          <div>
                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                              Category
                            </label>
                            <select
                              id="category_id"
                              name="category_id"
                              defaultValue={editItem?.category_id}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                              {...register("category_id")}
                            >
                              <option>Choose Category</option>
                              {data &&
                                data.map(({ id, name }) => (
                                  <option value={id} key={id}>
                                    {name}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <span className="text-xs text-red-600 dark:text-red-400">{errors.category_id?.message}</span>

                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows={3}
                                defaultValue={editItem?.description}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Description"
                                {...register("description")}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-red-600 dark:text-red-400">{errors.description?.message}</span>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Price
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="price"
                              id="price"
                              defaultValue={editItem?.price}
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0"
                              {...register("price")}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">₫</span>
                            </div>
                          </div>
                          <span className="text-xs text-red-600 dark:text-red-400">{errors.price?.message}</span>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                            Quantity
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="quantity"
                              id="quantity"
                              defaultValue={editItem?.quantity}
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              placeholder="0"
                              {...register("quantity")}
                            />
                          </div>
                          <span className="text-xs text-red-600 dark:text-red-400">{errors.quantity?.message}</span>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Picture</label>
                            <div
                              {...getRootProps()}
                              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                                isDragActive ? "border-indigo-600" : "border-gray-300"
                              } border-dashed rounded-md`}
                            >
                              <div className="space-y-1 text-center ">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="image"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="image"
                                      name="image"
                                      type="file"
                                      className="sr-only"
                                      accept="image/*"
                                      {...register("image")}
                                      {...getInputProps()}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                {image?.path && <img className="h-24 w-auto mx-auto" src={URL.createObjectURL(image)} alt="preview" />}
                                {editItem?.image && (
                                  <img className="h-24 w-auto mx-auto" src={`${BASE_URL}/${editItem.image}`} alt="preview" />
                                )}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">{image?.name}</div>
                            <span className="text-xs text-red-600 dark:text-red-400">{errors.image?.message}</span>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
};
export default AddProductModal;
