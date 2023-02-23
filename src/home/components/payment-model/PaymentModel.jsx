import React from "react";
import { ReactComponent as ZaloPayLogo } from "../../../assets/images/logo-zalopay.svg";

const PaymentModel = ({ register }) => {
  return (
    <div className="p-5">
      <p>Vui lòng chọn hình thức thanh toán:</p>
      <div className="mb-1">
        <label>
          <input
            type="radio"
            name="iCheck"
            className="iradio_flat-blue"
            value="zalopayapp"
            {...register("paymentModel", { required: true })}
          />{" "}
          <div className="inline-flex items-center">
            Ví <ZaloPayLogo className="ml-2" />
          </div>
        </label>
      </div>
      <div className="mb-1">
        <label>
          <input type="radio" name="iCheck" className="iradio_flat-blue" value="CC" {...register("paymentModel", { required: true })} />{" "}
          Visa, Mastercard, JCB <span className="text-gray-600">(qua cổng ZaloPay)</span>
        </label>
      </div>
      <div className="mb-1">
        <label>
          <input
            type="radio"
            name="iCheck"
            className="iradio_flat-blue"
            {...register("paymentModel", { required: true })}
            defaultChecked
            value=""
          />{" "}
          Thẻ ATM <span className="text-gray-600">(qua cổng ZaloPay)</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentModel;
