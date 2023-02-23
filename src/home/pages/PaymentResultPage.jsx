/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import { updatePaymentStatus } from "../../api/api";
const PaymentResultPage = () => {
  let [searchParams] = useSearchParams();
  let statusPaymentArray = [];
  searchParams.forEach((value, key) => {
    statusPaymentArray.push({ [key]: value });
  });
  //console.log(statusPaymentArray);
  const updateSubPayStatus = useMutation(updatePaymentStatus);
  useEffect(() => {
    const subId = localStorage.getItem("user_sub_id");
    if (searchParams.get("status") === "1" && subId) {
      let jsonStringPayment = JSON.stringify(statusPaymentArray);
      updateSubPayStatus.mutate({ id: subId, status: jsonStringPayment });
    }
  }, []);

  return (
    <div className="w-1/2 container max-w-6xl mx-auto flex min-h-[500px] items-center justify-center">
      <div className="p-1 shadow-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl">
        <div className="block p-6 bg-white sm:p-8 rounded-xl">
          <div className="mt-16 sm:pr-8">
            {searchParams.has("status") && searchParams.get("status") === "1" ? (
              <>
                <h1 className="text-2xl text-center w-full">🎉🎉🎉</h1>
                <h5 className="text-xl text-center font-bold text-gray-900">Thanh toán thành công!</h5>
                <p className="mt-2 text-sm text-gray-500">Cảm ơn bạn đã mua hàng tại eClean Store</p>
              </>
            ) : (
              <>
                <h5 className="text-xl font-bold text-gray-900">Giao dịch thất bại!</h5>
                <p className="mt-2 text-sm text-gray-500">Vui lòng kiểm tra và thử lại</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultPage;
