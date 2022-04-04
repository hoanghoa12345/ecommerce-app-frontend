import Axios from "axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL || "";
export const getAllProducts = async () => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/products`, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
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

export const getCategoryBySlug = async (slug) => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/categories/${slug}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createProduct = async ({ name, category_id, description, price, quantity, image }) => {
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

export const deleteProduct = async (id) => {
  try {
    const { data } = await Axios.delete(`${BASE_URL}/api/v1/products/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async ({ id, ...data }) => {
  const { name, category_id, description, price, quantity, image } = data;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("category_id", category_id);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("image", image);
  formData.append("_method", "PUT");
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/products/${id}`, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createCategory = async (body) => {
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/categories`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTopProduct = async () => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/products/top`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/product/${slug}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductsByCategory = async (slug) => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/category/${slug}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
