import {
  ChevronRightIcon,
  GiftIcon,
  HeartIcon,
  HomeIcon,
  LocationMarkerIcon,
  NewspaperIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL, getProfileByUserId, updateProfile } from "../../api/api";
import { useUserContext } from "../../context/user";
import Loader from "../components/loader/Loader";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { user } = useUserContext();
  const QueryClient = useQueryClient();
  const { data: profile, isLoading, isError } = useQuery("profile", () => getProfileByUserId(user.id, user.token));
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
        onSuccess: () => {
          setIsUpdated(true);
          QueryClient.invalidateQueries("profile");
        },
      }
    );
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue("avatar", acceptedFiles[0]);
      setAvatar(acceptedFiles[0]);
    },
    [setValue]
  );

  const menu = [
    {
      title: "Quản lý giao dịch",
      items: [
        {
          icon: <NewspaperIcon />,
          title: "Đơn hàng",
          link: "/orders",
        },
        {
          icon: <LocationMarkerIcon />,
          title: "Địa chỉ nhận hàng",
          link: "/profile",
        },
        {
          icon: <HeartIcon />,
          title: "Sản phẩm yêu thích",
          link: "/wishlist",
        },
      ],
    },
    {
      title: "Quản lý tài khoản",
      items: [
        {
          icon: <PencilAltIcon />,
          title: "Thông tin tài khoản",
          link: "/profile",
        },
        {
          icon: <HomeIcon />,
          title: "Shop yêu thích",
          link: "/wishlist",
        },
        {
          icon: <GiftIcon />,
          title: "Ưu đãi của tôi",
          link: "/wishlist",
        },
      ],
    },
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  if (isLoading) return <Loader />;
  if (isError) return <p>Có lỗi xảy ra</p>;
  return (
    <section className="bg-gray-50">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="uppercase text-sm inline-flex items-center">
          eClean <ChevronRightIcon className="w-5 h-5" /> Thông tin tài khoản
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-12">
          <div className="lg:py-12 lg:col-span-4">
            <div className="flex space-x-2">
              <img className="w-10 h-10 object-cover rounded-full border border-gray-300" src={`${BASE_URL}/${profile.avatar}`} alt="" />

              <div className="block">
                <p>{user.name}</p>
                <p className="text-xs text-gray-400 font-thin">Chỉnh sửa tài khoản</p>
              </div>
            </div>
            <div className="flex">
              <div className="my-8">
                {menu.map((menuGroup, index) => (
                  <div key={index} className="my-4">
                    <div className="font-bold px-2 py-1 text-base border-l-2 border-orange-600 bg-gray-100">{menuGroup.title}</div>
                    <ul className="mx-2 py-1">
                      {menuGroup.items.map((item, index) => (
                        <li key={index}>
                          <Link to={item.link} className="px-1 py-2 flex space-x-2 text-sm text-gray-500 hover:text-orange-400">
                            <div>{React.cloneElement(item.icon, { className: "w-5 h-5" })}</div>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-8">
            {isUpdated && (
              <div className="p-4 mb-4 text-green-700 border rounded border-green-900/10 bg-green-50" role="alert">
                <strong className="text-sm font-medium"> Thông tin đã được cập nhật! </strong>
              </div>
            )}

            <div className="flex space-x-4">
              <div {...getRootProps()}>
                <button type="button" className="relative overflow-hidden rounded-full border-2">
                  <img
                    className="w-24 h-24 p-1 object-cover "
                    src={avatar ? URL.createObjectURL(avatar) : `${BASE_URL}/${profile.avatar}`}
                    alt=""
                  />
                  <span className="absolute block p-1 left-0 bottom-0 w-full text-xs bg-gray-400 text-white">Thay đổi</span>
                </button>
                <input {...getInputProps()} />
              </div>
              <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex py-1">
                  <label className="w-36 text-sm" htmlFor="name">
                    Tên <span className="text-red-500">*</span>
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

                <div className="flex py-1">
                  <label className="w-36 text-sm" htmlFor="email">
                    Email <span className="text-red-500">*</span>
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
                <div className="flex py-1">
                  <label className="w-36 text-sm" htmlFor="phone">
                    Số điện thoại <span className="text-red-500">*</span>
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
                <div className="flex py-1">
                  <label className="w-36 text-sm" htmlFor="address">
                    Địa chỉ <span className="text-red-500">*</span>
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
                <div className="flex py-1">
                  <label className="w-36 text-sm" htmlFor="description">
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
                <div className="flex py-1">
                  <label className="w-36 text-sm"></label>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-white bg-orange-500 rounded-lg sm:w-auto"
                  >
                    <span className="text-md">Cập nhật</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
