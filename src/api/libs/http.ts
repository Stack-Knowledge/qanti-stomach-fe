import { axiosInstance } from "@/api/libs";
import { AxiosRequestConfig } from "axios";

export const del = async <T>(url: string, config?: AxiosRequestConfig) => {
  const instance = axiosInstance();
  return instance.delete<T, T>(url, config);
};

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const instance = axiosInstance();
  return instance.get<T, T>(url, config);
};

export const patch = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => {
  const instance = axiosInstance();
  return instance.patch<T, T>(url, data, config);
};

export const post = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => {
  const instance = axiosInstance();
  return instance.post<T, T>(url, data, config);
};

export const put = async <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => {
  const instance = axiosInstance();
  return instance.put<T, T>(url, data, config);
};
