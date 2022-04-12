import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useUserContext } from "../../../context/user";
import { getFullHeader } from "../../../api/api";

const schema = yup
  .object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  })
  .required();

const Register = () => {
  const [messageErr, setMessageErr] = useState("");
  const { user } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    if (user.roles === "admin") {
      navigate("/admin", { replace: true });
    } else if (user.roles === "user") {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  const onSubmit = async (formdata) => {
    try {
      const headers = getFullHeader();
      const res = await Axios.post("/api/v1/register", formdata, { headers });
      // console.log(data);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (e) {
      setMessageErr("Email already exists.");
      throw e;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-center">Join us</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
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
            </div>
            <span className="text-xs text-red-400">{errors.name?.message}</span>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
                <label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...register("email")}
                  />
                </label>
              </label>
            </div>
            <span className="text-xs text-red-400">{errors.email?.message || messageErr}</span>
            <div className="mt-4">
              <label className="block">
                Password
                <label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...register("password")}
                  />
                </label>
              </label>
            </div>
            <span className="text-xs text-red-400">{errors.password?.message}</span>
            <div className="mt-4">
              <label className="block">
                Confirm Password
                <label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    {...register("password_confirmation")}
                  />
                </label>
              </label>
            </div>
            <span className="text-xs text-red-400">{errors.password_confirmation?.message}</span>
            <div className="flex">
              <button type="submit" className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                Create Account
              </button>
            </div>
            <div className="mt-6 text-grey-dark">
              Already have an account?
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
