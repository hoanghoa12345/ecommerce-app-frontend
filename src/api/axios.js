import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

let headers = {};

if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  headers.Authorization = `Bearer ${user.token}`;
}
const axiosInstance = axios.create({
  baseURL,
  headers,
});

export default axiosInstance;
