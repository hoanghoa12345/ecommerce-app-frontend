import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createUser, deleteUser, getUserProfile, updateProfile, updateUser, BASE_URL } from "../../api/api";
import { formatDate } from "./../../utils/date";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import { useUserContext } from "../../context/user";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import { isEmpty } from "./../../utils/isEmptyObj";
import DeleteModal from "../components/DeleteModal";
import { useDropzone } from "react-dropzone";
import { useSearchParams } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6),
    password_confirmation: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    roles: yup.string().required(),
    address: yup.string().min(5).required(),
    phone: yup.string().min(10).required(),
    description: yup.string().min(10).required(),
  })
  .required();

let limitUser = 4;
export default function UserPage() {
  const { user } = useUserContext();
  const [messageErr, setMessageErr] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Modal vars
  const [itemEdit, setItemEdit] = useState({});
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [deleteId, setDeleteId] = useState(-1);
  const [isDelete, setIsDelete] = useState(true);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  //Open create user model when url has createUser query
  let [params] = useSearchParams();
  useEffect(() => {
    console.log(params.has("createUser"));
    if (params.has("createUser")) {
      setItemEdit({});
      setAvatar(null);
      setIsOpenEdit(true);
      setIsAdd(true);
    }
  }, [params]);

  // React query vars
  const { data, error, isLoading, isError } = useQuery("users", () => getUserProfile(user.token));
  const mutationAddUser = useMutation(createUser);
  const mutationUpdateUser = useMutation(updateUser);
  const mutationDeleteUser = useMutation(deleteUser);
  const mutationUpdateProfile = useMutation(updateProfile);
  const queryClient = useQueryClient();

  // Pagination vars
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastProduct = currentPage * limitUser;
  const indexOfFirstProduct = indexOfLastProduct - limitUser;
  const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

  // validate var
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue("avatar", acceptedFiles[0]);
      setAvatar(acceptedFiles[0]);
    },
    [setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Function Pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const previousPaginate = () => setCurrentPage(currentPage - 1);
  const nextPaginate = () => setCurrentPage(currentPage + 1);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const dataProfile = {
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        avatar: formData.avatar,
      };
      if (isEmpty(itemEdit)) {
        const dataUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          roles: formData.roles,
        };

        const { user } = await mutationAddUser.mutateAsync(dataUser);
        // console.log(user);
        await mutationUpdateProfile.mutateAsync({ ...dataProfile, user_id: user.id });
      } else {
        const dataUser = {
          id: itemEdit.id,
          name: formData.name,
          roles: formData.roles,
        };
        await mutationUpdateUser.mutateAsync(dataUser);
        await mutationUpdateProfile.mutateAsync({ ...dataProfile, user_id: itemEdit.id });
      }
      queryClient.invalidateQueries("users");
      setIsOpenEdit(false);
      setMessageErr("");
      // setAvatar(null);
    } catch {
      setMessageErr("Email already exists");
    }
  };

  const handleAddUser = () => {
    setItemEdit({});
    setAvatar(null);
    setIsOpenEdit(true);
    setIsAdd(true);
  };

  const handleEdit = (item) => {
    setItemEdit(item);
    setAvatar(null);
    setIsOpenEdit(true);
    setIsAdd(false);
  };

  const handleDelete = (id) => {
    setIsOpenDelete(true);
    setDeleteId(id);
    user.id === id ? setIsDelete(false) : setIsDelete(true);
  };
  const onDelete = async () => {
    await mutationDeleteUser.mutateAsync(deleteId);
    setIsOpenDelete(false);
    queryClient.invalidateQueries("users");
  };

  useEffect(() => {
    reset(itemEdit);
  }, [itemEdit, reset]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <main className="h-full overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Users</h2>
        <div className="flex items-center justify-between">
          <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Manage product</h4>
          <button
            onClick={handleAddUser}
            className="flex px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Add <div className="ml-2">+</div>
          </button>
        </div>
        <Modal show={isOpenEdit} onClose={() => setIsOpenEdit(false)} /*title={"Create new User"}*/>
          <div className="flex items-center justify-center min-h-screen">
            <div className="px-8 py-6 mx-4 mt-4 text-left">
              {/* <h3 className="text-2xl font-bold text-center">Create new User</h3> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block" htmlFor="Name">
                      Name
                      <label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("name")}
                        />
                      </label>
                    </label>
                    <span className="text-xs text-red-400">{errors.name?.message}</span>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block" htmlFor="email">
                      Email
                      <label>
                        <input
                          type="text"
                          disabled={isAdd ? false : true}
                          autoComplete="off"
                          placeholder="Email"
                          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("email")}
                        />
                      </label>
                    </label>
                    <span className="text-xs text-red-400">{errors.email?.message || messageErr}</span>
                  </div>
                  {isAdd && (
                    <>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block">
                          Password
                          <label>
                            <input
                              type="password"
                              autoComplete="off"
                              placeholder="Password"
                              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                              {...register("password")}
                            />
                          </label>
                        </label>
                        <span className="text-xs text-red-400">{errors.password?.message}</span>
                      </div>
                    </>
                  )}
                  {isAdd && (
                    <>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block">
                          Confirm Password
                          <label>
                            <input
                              type="password"
                              placeholder="Password"
                              autoComplete="off"
                              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                              {...register("password_confirmation")}
                            />
                          </label>
                        </label>
                        <span className="text-xs text-red-400">{errors.password_confirmation?.message}</span>
                      </div>
                    </>
                  )}
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block">
                      Roles
                      <label>
                        <select
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          {...register("roles")}
                        >
                          <option value={"user"}>User</option>
                          <option value={"admin"}>Admin</option>
                        </select>
                      </label>
                    </label>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block" htmlFor="phone">
                      Phone
                      <label>
                        <input
                          type="text"
                          placeholder="Phone"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          defaultValue={itemEdit?.profile?.phone_number}
                          {...register("phone")}
                        />
                      </label>
                    </label>
                    <span className="text-xs text-red-400">{errors.phone?.message}</span>
                  </div>
                  <div className="col-span-6">
                    <label className="block" htmlFor="address">
                      Address
                      <label>
                        <input
                          type="text"
                          placeholder="Address"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          defaultValue={itemEdit?.profile?.address}
                          {...register("address")}
                        />
                      </label>
                    </label>
                    <span className="text-xs text-red-400">{errors.address?.message}</span>
                  </div>
                  <div className="col-span-6">
                    <label className="block" htmlFor="description">
                      Description
                      <label>
                        <input
                          type="text"
                          placeholder="Description"
                          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                          defaultValue={itemEdit?.profile?.description}
                          {...register("description")}
                        />
                      </label>
                      <span className="text-xs text-red-400">{errors.description?.message}</span>
                    </label>
                  </div>
                  <div className="col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Avatar</label>
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
                              {...register("avatar")}
                              {...getInputProps()}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        {avatar?.path ? (
                          <img className="h-24 w-auto mx-auto" src={URL.createObjectURL(avatar)} alt="preview" />
                        ) : (
                          itemEdit?.profile?.avatar && (
                            <img className="h-24 w-auto mx-auto" src={`${BASE_URL}/${itemEdit.profile.avatar}`} alt="preview" />
                          )
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{avatar?.name}</div>
                    <span className="text-xs text-red-600 dark:text-red-400">{errors.image?.message}</span>
                  </div>
                  <div className="col-span-6">
                    <button type="submit" className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                      {isAdd ? "Create" : "Update"} Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
        <DeleteModal
          title={`Delete User ${deleteId}`}
          message={isDelete ? "Are you want delete?" : "It is forbidden to delete the account you are using!"}
          open={isOpenDelete}
          setOpen={() => setIsOpenDelete(false)}
          isDelete={isDelete}
          onDelete={onDelete}
        />
        {/* New Table */}
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <UserTable data={currentProducts} onEdit={handleEdit} onDelete={handleDelete} />
          <Pagination
            indexOfFirstProduct={indexOfFirstProduct}
            indexOfLastProduct={indexOfLastProduct}
            currentPage={currentPage}
            productsPerPage={limitUser}
            totalProducts={data.length}
            paginate={paginate}
            previousPaginate={previousPaginate}
            nextPaginate={nextPaginate}
          />
        </div>
      </div>
    </main>
  );
}

const UserTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Address</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Created_at</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          {data.map((item, id) => (
            <tr key={id} className="text-gray-700 dark:text-gray-400">
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  {/* Avatar with inset shadow */}
                  <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={`${BASE_URL}/${item.profile.avatar}`}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.profile.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{item.email}</td>
              <td className="px-4 py-3 text-xs">
                <span
                  className={`${
                    item.roles === "user"
                      ? "text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600"
                      : "dark:bg-green-700 dark:text-green-100 text-green-700 bg-green-100"
                  } px-2 py-1 font-semibold leading-tight rounded-full `}
                >
                  {item.roles}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{item.profile.address}</td>
              <td className="px-4 py-3 text-sm">{item.profile.phone_number}</td>
              <td className="px-4 py-3 text-sm">{formatDate(item.created_at)}</td>
              <td className="px-4 py-3 text-sm">{item.profile.description}</td>
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
    </div>
  );
};
