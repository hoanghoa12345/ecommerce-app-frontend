import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

let headers = {};
const storage = localStorage.getItem('user');
if (storage) {
  const user = JSON.parse(storage);
  headers.Authorization = `Bearer ${user.token}`;
}
const axiosInstance = axios.create({
  baseURL,
  headers,
});

export default axiosInstance;
