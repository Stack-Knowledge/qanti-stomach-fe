import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = () => {
  const instance = axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(config.url);
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return Promise.reject(response);
    },
    async (error) => {
      const originalRequest = error.config;

      console.error("Axios Error", error, originalRequest);
      return Promise.reject(error);
    }
  );

  return instance;
};
