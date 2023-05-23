import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BACKEND_HOST,
});

export default axiosInstance;

export const axiosInstanceAdmin = axios.create({
  withCredentials: false,
  baseURL: process.env.
  REACT_APP_BACKEND_HOST_ADMIN,
});

export const axiosInstanceMain = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_BACKEND_HOST_MAIN,
});
