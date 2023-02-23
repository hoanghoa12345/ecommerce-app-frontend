import axios from "axios";

const zaloPayCreateOrder = async ({ bank_code, amount }) => {
  const { data } = await axios.post(
    "/api/v1/zalopay/payment",
    {
      bank_code,
      amount,
    },
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  window.open(data.order_url, "_blank", "noopener,noreferrer");
};

export { zaloPayCreateOrder };
