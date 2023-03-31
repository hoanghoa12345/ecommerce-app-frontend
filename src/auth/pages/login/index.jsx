import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useUserContext } from "../../../context/user";
import { setUser } from "../../../action/user";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { convertUserFromRes } from "./../../../utils/convertFromRes";
import { useMutation } from "react-query";
import Modal from "../../../home/components/modal/Modal";
import { AtSymbolIcon } from "@heroicons/react/outline";
import { BASE_URL, forgotPassword } from "../../../api/api";
import { toast, ToastContainer } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const initMessageErr = {
  email: "",
  password: "",
};

const resetPasswordSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const Login = () => {
  const [openModal, setOpenModal] = useState(false);
  const [messageErr, setMessageErr] = useState(initMessageErr);
  const navigate = useNavigate();
  const { user, userDispatch } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigateByRole = (role) => {
    if (role === "admin") {
      navigate("/admin", { replace: true });
    } else if (role === "user") {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    // console.log(user);
    navigateByRole(user.roles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loginMutation = useMutation(
    (userCredentials) => {
      return Axios.post("/api/v1/login", userCredentials);
    },
    {
      onError: (error) => {
        throw error;
      },
      onSuccess: (data) => {
        if (data.data.token) {
          localStorage.setItem("user", JSON.stringify(data.data));
          const dataContext = convertUserFromRes(data.data);
          userDispatch(setUser(dataContext));
          navigateByRole(data.data.user.roles);
        } else {
          if (data.data.message.includes("The email")) {
            setMessageErr({ email: data.data.message, password: "" });
          } else {
            setMessageErr({ email: "", password: data.data.message });
          }
        }
      },
    }
  );

  const onSubmit = async (formData) => {
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  const openResetModal = () => {
    setOpenModal(true);
  };

  const forgotPasswordMutation = useMutation(forgotPassword);

  const {
    register: rg,
    handleSubmit: handleResetPassword,
    formState: { errors: err },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onEmailSubmit = (data) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: (resData) => {
        setOpenModal(false);
        toast.success(resData.message);
      },
      onError: (resErr) => {
        toast.success(resErr.message);
      },
    });
  };

  return (
    <div className="h-screen flex items-center">
      <ToastContainer />
      <div className="lg:flex align-baseline max-w-md w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          className="hidden h-auto bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('${BASE_URL}/assets/images/e-clean-banner-login.png')`,
          }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">eClean</h2>

          <p className="text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>

          <Link
            to="/"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-200 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
          </Link>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <Link to="/" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or login with email
            </Link>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                {...register("email")}
              />
              <span className="text-red-600 text-sm block h-5">{errors.email?.message || messageErr.email}</span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">
                  Password
                </label>
                <button onClick={openResetModal} className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                  Forget Password?
                </button>
              </div>

              <input
                id="loggingPassword"
                autoComplete="off"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                {...register("password")}
              />
              <span className="text-red-600 text-sm block h-5">{errors.password?.message || messageErr.password}</span>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link to="/register" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or sign up
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} setIsClose={() => setOpenModal(false)} title="Nhập email để khôi phục mật khẩu">
        <form className="p-4" onSubmit={handleResetPassword(onEmailSubmit)}>
          <div>
            <div className="relative">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                className="w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded"
                id="email"
                type="email"
                placeholder="Email"
                {...rg("email")}
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 right-4">
                <AtSymbolIcon className="w-5 h-5" />
              </span>
            </div>
            <span className="text-red-600 text-sm block h-5">{err.email?.message}</span>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-500">Thông tin khôi phục mật khẩu sẽ được gửi qua email</p>
            <button type="submit" className="relative inline-block text-sm font-medium text-white group focus:outline-none focus:ring">
              <span className="absolute inset-0 border border-red-600 group-active:border-red-500" />
              <span className="block px-12 py-3 transition-transform bg-red-600 border border-red-600 active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                Gửi Email
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
