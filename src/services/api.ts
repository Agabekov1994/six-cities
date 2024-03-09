import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { StatusCodes } from 'http-status-codes';
import { getToken } from "./token";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks";
import { setError } from "../store/action";

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
}

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://8.react.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => {
      response.data = JSON.parse(JSON.stringify(response.data).replaceAll('pages.academy', 'htmlacademy.pro')); //URL pages.academy прикрыли
      return response;
    },
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response) && error.response.status === 401) {
        toast.warn('Вы не авторизованы!');
        return
      }
      toast.warn('Ошибка запроса! ' + error.message);

      throw error;
    }
  );

  return api;
}