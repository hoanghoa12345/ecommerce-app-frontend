import React, { useEffect } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { resetPassword } from "../../../api/api";
import { toast, ToastContainer } from "react-toastify";

const schema = yup
  .object({
    password: yup.string().min(6).required(),
    password_confirmation: yup.string().required(),
  })
  .required();

const ResetPassword = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation(resetPassword);

  const sendSuccessNotify = (data) => {
    toast.success(data.message, {
      onClose: () => {
        navigate("/login");
      },
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    resetPasswordMutation.mutate(formData, {
      onSuccess: (data) => sendSuccessNotify(data),
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  useEffect(() => {
    setValue("token", searchParams.get("token"));
    setValue("email", searchParams.get("email"));
  });

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Khôi phục mật khẩu</h1>
        <p className="mt-4 text-gray-500">Vui lòng nhập mật khẩu mới cho tài khoản của bạn</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 mb-0 space-y-4" autoComplete="off">
        <div>
          <label htmlFor="password" className="sr-only">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Nhập mật khẩu"
              {...register("password")}
            />
            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </span>
          </div>
          <span className="text-red-600 text-sm block h-5">{errors.password?.message}</span>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Nhập lại mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Nhập lại mật khẩu"
              {...register("password_confirmation")}
            />
            <span className="absolute inset-y-0 inline-flex items-center right-4">
              <LockClosedIcon className="w-5 h-5 text-gray-400" />
            </span>
          </div>
          <span className="text-red-600 text-sm block h-5">{errors.password_confirmation?.message}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Chưa có tài khoản?{" "}
            <Link className="underline" to="/register">
              Đăng ký
            </Link>
          </p>
          <button type="submit" className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg">
            Khôi phục mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
