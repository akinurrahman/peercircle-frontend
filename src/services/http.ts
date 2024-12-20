import {
  accessTokenCookie,
  refreshTokenCookie,
} from "@/constants/config.constant";
import { getErrorMessage } from "@/utils/getErrorMessage";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Create an Axios instance
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Add request interceptor to include the access token in the headers
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get(accessTokenCookie); // Get the access token from cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the access token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle any request errors
  }
);

// Add response interceptor to handle 401 errors
http.interceptors.response.use(
  (response) => {
    return response; // Return the response if no error
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and we haven't already tried refreshing the token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retrying to avoid infinite loops

      try {
        // Attempt to refresh the access token
        // const newAccessToken = await refreshAccessToken();

        // Set the new access token in the headers of the original request
        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        return http(originalRequest);
      } catch (refreshError) {
        // If token refresh fails, we already handled the logout in refreshAccessToken
        return Promise.reject(refreshError);
      }
    }

    // If the error is not 401, just reject the promise
    return Promise.reject(error);
  }
);

export default http;
