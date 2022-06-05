import { LockClosedIcon } from "@heroicons/react/solid";
import React from "react";

const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-3 pt-4 rounded-lg text-left bg-white shadow-lg w-1/2 lg:w-1/3">
        <div className="flex">
          <div className="w-7 h-7 mr-3 rounded-full bg-gray-200 flex justify-center items-center">
            <LockClosedIcon className="w-4 h-4 rounded-full" />
          </div>
          <p className="text-lg text-black font-bold">Forgot Password</p>
        </div>

        <p className="text-sm text-justify text-black mt-3">
          Please enter the email address you used to create your account,and we will send you a link to reset your password.
        </p>

        <hr className="mt-5" />

        <div className="relative mt-9">
          <input type="text" className="h-12 w-full border rounded-lg outline-none transition-all px-2 focus:border-blue-700 " />
          <span className="absolute left-0 -top-7 text-gray-700">Email</span>
        </div>
        <button className="my-5 h-12 w-full rounded-lg text-white text-sm bg-blue-600 cursor-pointer transition-all hover:bg-blue-800">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
