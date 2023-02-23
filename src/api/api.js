import Axios from "./axios";
export const BASE_URL = process.env.REACT_APP_BASE_URL || "";

export const getFullHeader = (token = "") => {
  return {
    accept: "application/json",
    Authorization: token === "" ? token : `Bearer ${token}`,
  };
};

export const getHomeCategory = async () => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/home/categories`);
    return data;
  } catch (error) {
    throw Error(error);
  }
};

export const getHomeBannersSlider = async () => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/home/sliders/banners`);
    return data;
  } catch (error) {
    throw Error(error);
  }
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

export const createProduct = async ({ name, category_id, description, price, quantity, image, token }) => {
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
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
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

export const updateProduct = async ({ token, id, ...data }) => {
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
        Authorization: `Bearer ${token}`,
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

export const getSubscriptionsByAdmin = async () => {
  try {
    const { data } = await Axios.get(BASE_URL + "/api/v1/subscriptions-by-admin");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createNewSubscription = async ({ token, ...formData }) => {
  try {
    const { data } = await Axios.post(BASE_URL + "/api/v1/subscriptions", formData, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteSubcription = async ({ id, token }) => {
  try {
    const { data } = await Axios.delete(BASE_URL + "/api/v1/subscriptions/" + id, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductSubscription = async (detailId) => {
  try {
    const { data } = await Axios.delete(BASE_URL + "/api/v1/subscription-details/" + detailId, {
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

export const createUser = async ({ token, ...formData }) => {
  const { data } = await Axios.post(`${BASE_URL}/api/v1/users`, formData, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateUser = async ({ id, token, ...formData }) => {
  const { data } = await Axios.put(`${BASE_URL}/api/v1/users/${id}`, formData, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteUser = async ({ deleteId, token }) => {
  const { data } = await Axios.delete(`${BASE_URL}/api/v1/users/${deleteId}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getProfileByUserId = async (user_id, token) => {
  if (token === "") return "";

  const { data } = await Axios.get(`${BASE_URL}/api/v1/profiles/${user_id}`, {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return data;
};

export const updateProfile = async ({ token, ...Data }) => {
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
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const bulkInsertProductSub = async ({ token = "", ...listProductSub }) => {
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/subscription-details/bulk`, listProductSub, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
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

export const postUserSubscription = async ({ formData, token }) => {
  try {
    const { data } = await Axios.post(`${BASE_URL}/api/v1/user-subscription`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getListSubscriptionByUser = async (userId) => {
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/v1/subscription-users/${userId}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAdminDashboardInfo = async (token) => {
  try {
    const { data } = await Axios.get(BASE_URL + "/api/v1/admin/dashboard", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getListUserSubscription = async (token) => {
  try {
    const { data } = await Axios.get(BASE_URL + "/api/v1/user-subscriptions", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSubsByUserId = async (id) => {
  try {
    const { data } = await Axios.get(BASE_URL + `/api/v1/subscriptions-by-user/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserSubsByUserId = async ({ id, token }) => {
  try {
    const { data } = await Axios.get(BASE_URL + `/api/v1/subscriptions-user/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const copyNewSubscription = async ({ formData, token }) => {
  const { user_id, subscription_name, subscription_duration, subscription_detail } = formData;
  try {
    const { data } = await Axios.post(
      BASE_URL + `/api/v1/subscriptions/copy-new-subscription`,
      {
        user_id,
        subscription_name,
        subscription_duration,
        subscription_detail,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createNewOrder = async ({ formData, token }) => {
  try {
    const { data } = await Axios.post(BASE_URL + "/api/v1/order", formData, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getListOrder = async (token) => {
  try {
    const { data } = await Axios.get(BASE_URL + "/api/v1/orders", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOrderById = async ({ id, token }) => {
  try {
    const { data } = await Axios.delete(BASE_URL + "/api/v1/orders/" + id, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateStatusOrderById = async ({ id, status, token }) => {
  try {
    const { data } = await Axios.put(
      BASE_URL + "/api/v1/orders/" + id,
      { status },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const forgotPassword = async (formData) => {
  try {
    const { data } = await Axios.post(BASE_URL + "/api/v1/forgot-password", formData, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPassword = async (formData) => {
  try {
    const { data } = await Axios.post(BASE_URL + "/api/v1/reset-password", formData, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFavoritesByUser = async ({ userId, token }) => {
  try {
    const { data } = await Axios.get(BASE_URL + "/api/v1/favorites/" + userId, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const addToFavorite = async ({ formData, token }) => {
  try {
    const { data } = await Axios.post(BASE_URL + "/api/v1/favorites", formData, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const removeFavoriteItem = async ({ id, token }) => {
  try {
    const { data } = await Axios.delete(BASE_URL + "/api/v1/favorites/" + id, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePaymentStatus = async ({ id, status }) => {
  try {
    const { data } = await Axios.put(
      BASE_URL + "/api/v1/payment-status",
      {
        sub_id: id,
        sub_pay_status: status,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
