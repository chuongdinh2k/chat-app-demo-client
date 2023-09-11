import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { Error } from "../../shared/interfaces/error";
import { Config } from "./config";
const getAuth = (): string | undefined => {
  const token = Cookies.get("auth");
  return `Bearer ${token}`;
};

const appConfig = Config.getInstance();

const setAuth = (response: AxiosResponse) => {
  if (
    response.data?.accessToken &&
    typeof response.data.accessToken === "string"
  ) {
    const token: string = response.data.accessToken;
    Cookies.set("auth", token);
  }
};

const baseHeaders = (): any => {
  return {
    Accept: "application/json",
    Authorization: getAuth(),
  };
};

const onRequest = (config: InternalAxiosRequestConfig) => {
  const headers = config.headers || {};
  config.headers = {
    "Content-Type": "application/json",
    ...headers,
    ...baseHeaders(),
  };
  return config;
};

const onResponse = (response: AxiosResponse) => {
  const { status, statusText, data } = response;

  if ([200, 201].includes(status)) {
    setAuth(response);
    return response;
  }

  const customError: Error = {
    status: status || data.statusCode,
    message: data.message || statusText,
  };

  throw customError;
};

const onResponseError = (error: AxiosError) => {
  return Promise.reject(error);
};

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: appConfig.apiReqTimeout,
  headers: baseHeaders(),
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(onRequest);

axiosInstance.interceptors.response.use(onResponse, onResponseError);

export { axiosInstance as axiosClient, axiosConfig };
