import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import store from "../redux/app/store";
import { clearToken } from "../redux/slices/user/tokenSlice";
import configKeys from "../../../utils/api";

const setupAxiosInterceptors = (): AxiosInstance => {
  const api: AxiosInstance = axios.create({
    baseURL: configKeys.API_URL,
  });

  api.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        store.dispatch(clearToken());
        window.location.replace("/users/signIn");
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default setupAxiosInterceptors