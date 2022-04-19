import Axios from "axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL || "";

export const getFullHeader = (token = "") => {
  return {
    accept: "application/json",
    Authorization: token === "" ? token : `Bearer ${token}`,
  };
};

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

export const getSubscriptionList = async () => {
  try {
    const { data } = await Axios.get(BASE_URL + "/api/v1/subscriptions");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createNewSubscription = async (formData) => {
  try {
    const { data } = await Axios.post(BASE_URL + "/api/v1/subscriptions", formData, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteSubcription = async (id) => {
  try {
    const { data } = await Axios.delete(BASE_URL + "/api/v1/subscriptions/" + id, {
      headers: {
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// User - Profile

export const getAllUsers = async (token = "") => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/users`, {
      headers: {
        Accept: "application/json",
        Authorization: token === "" ? token : `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserProfile = async (token = "") => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/usersprofile`, {
      headers: {
        Accept: "application/json",
        Authorization: token === "" ? token : `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async (formData) => {
  const { data } = await Axios.post(`${BASE_URL}/api/v1/users`, formData, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};

export const updateUser = async ({ id, ...formData }) => {
  const { data } = await Axios.put(`${BASE_URL}/api/v1/users/${id}`, formData, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await Axios.delete(`${BASE_URL}/api/v1/users/${id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};

export const getProfileByUserId = async (user_id) => {
  const { data } = await Axios.get(`${BASE_URL}/api/v1/profiles/${user_id}`, {
    headers: {
      Accept: "application/json",
    },
  });
  return data;
};

export const updateProfile = async ({ ...Data }) => {
  const { description, address, phone, avatar, user_id } = Data;
  const formData = new FormData();
  formData.append("description", description);
  formData.append("address", address);
  formData.append("phone_number", phone);
  formData.append("avatar", avatar);
  formData.append("_method", "PUT");
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/profiles/${user_id}`, formData, {
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

export const bulkInsertProductSub = async (listProductSub) => {
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/subscription-details/bulk`, listProductSub);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSearchResult = async (searchQuery) => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/products/search?q=${searchQuery}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSubscriptionById = async (id) => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/subscriptions/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const postUserSubscription = async (formData) => {
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/user-subscription`, formData);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
