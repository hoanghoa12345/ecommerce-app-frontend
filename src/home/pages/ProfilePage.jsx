import { ArrowRightIcon } from "@heroicons/react/outline";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BASE_URL, getProfileByUserId, updateProfile } from "../../api/api";
import { useUserContext } from "../../context/user";
import Loader from "../components/loader/Loader";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";

const ProfilePage = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { user } = useUserContext();
  const { data: profile, isLoading, isError } = useQuery("profile", () => getProfileByUserId(user.id, user.token));
  //console.log(profile);
  const { register, handleSubmit, setValue } = useForm();

  const mutationUpdateProfile = useMutation(updateProfile);
  const onSubmit = async (formData) => {
    const dataProfile = {
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
      avatar: formData.avatar,
    };
    await mutationUpdateProfile.mutateAsync(
      { ...dataProfile, user_id: user.id, token: user.token },
      {
        onSuccess: () => setIsUpdated(true),
      }
    );
  };
  //console.log(watch("name"));

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue("avatar", acceptedFiles[0]);
      setAvatar(acceptedFiles[0]);
    },
    [setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  if (isLoading) return <Loader />;
  if (isError) return <p>Có lỗi xảy ra</p>;
  return (
    <section className="bg-gray-100">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:py-12 lg:col-span-2">
            <div>
              <div className="max-w-screen-xl px-4 pt-24 pb-16 mx-auto">
                <div
                  className={`p-1 shadow-xl bg-gradient-to-r  rounded-2xl ${
                    isDragActive ? "from-yellow-500 via-red-500 to-pink-500" : "from-pink-500 via-red-500 to-yellow-500"
                  }`}
                >
                  <div className="block p-6 bg-white sm:p-8 rounded-xl">
                    <div className="mt-2 sm:pr-8 flex flex-col items-center">
                      <div className="relative group" {...getRootProps()}>
                        <img
                          className="w-20 h-20 p-1 rounded-full object-cover border-2 transition group-hover:-translate-x-2 group-hover:-translate-y-2"
                          src={avatar ? URL.createObjectURL(avatar) : `${BASE_URL}/${profile.avatar}`}
                          alt="Bordered avatar"
                        />
                        <img
                          className="w-6 h-6 absolute right-0 bottom-0 hidden group-hover:block"
                          src="https://img.icons8.com/material-outlined/24/undefined/camera--v2.png"
                          alt="camera"
                        />
                        <input {...getInputProps()} />
                      </div>
                      <h5 className="text-xl font-bold text-gray-900">{user.name}</h5>
                      <p className="mt-2 text-sm text-gray-500">{profile.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
            {isUpdated && (
              <div className="p-4 mb-4 text-green-700 border rounded border-green-900/10 bg-green-50" role="alert">
                <strong className="text-sm font-medium"> Thông tin đã được cập nhật! </strong>
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="sr-only" htmlFor="name">
                  Tên
                </label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Tên"
                  type="text"
                  id="name"
                  defaultValue={user.name}
                  {...register("name")}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Đại chỉ Email"
                    type="email"
                    id="email"
                    defaultValue={user.email}
                    {...register("email")}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Số điện thoại"
                    type="tel"
                    id="phone"
                    defaultValue={profile.phone_number}
                    {...register("phone")}
                  />
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Địa chỉ"
                  type="text"
                  id="address"
                  defaultValue={profile.address}
                  {...register("address")}
                />
              </div>
              <div>
                <label className="sr-only" htmlFor="description">
                  Mô tả
                </label>
                <textarea
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Mô tả"
                  rows={8}
                  id="description"
                  defaultValue={profile.description}
                  {...register("description")}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-black rounded-lg sm:w-auto"
                >
                  <span className="font-medium"> Cập nhật </span>
                  <ArrowRightIcon className="w-5 h-5 ml-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
