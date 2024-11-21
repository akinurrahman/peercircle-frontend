import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const http: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to attach the token from cookies
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get the token from cookies
    if (token && config.headers) {
      // config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Secret-Key"] = token;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle errors
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default http;
