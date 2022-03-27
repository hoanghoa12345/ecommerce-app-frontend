import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "";
export const getAllProducts = async () => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/products`, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/categories`, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createProduct = async ({
  name,
  category_id,
  description,
  price,
  quantity,
  image,
}) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("category_id", category_id);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("image", image);

  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/products`, formData, {
      headers: {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
