import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  accessTokenCookie,
  refreshTokenCookie,
} from "@/constants/config.constant";

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

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get(refreshTokenCookie); // Get the refresh token from cookies

    if (!refreshToken) {
      throw new Error("Refresh token not available");
    }

    // Call the API to refresh the access token
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
      { refreshToken: refreshAccessToken },
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );

    const { accessToken } = response.data;

    // Save the new access token in cookies
    Cookies.set(accessTokenCookie, accessToken);

    return accessToken;
  } catch (error) {
    toast.error("Session expired. Please log in again.");
    // Clear cookies and redirect to login if the refresh fails
    Cookies.remove(accessTokenCookie);
    Cookies.remove(refreshTokenCookie);
    window.location.href = "/login";
    throw error;
  }
};

// Add response interceptor to handle errors based on code
http.interceptors.response.use(
  (response) => {
    return response; // Return the response if no error
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for specific error codes and statuses
    if (error.response) {
      const { status, data } = error.response;

      // If 401 and specific token-related error codes, attempt refresh
      if (
        status === 401 &&
        data?.code === "TOKEN_INVALID" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // Mark the request as retrying to avoid infinite loops

        try {
          // Attempt to refresh the access token
          const newAccessToken = await refreshAccessToken();

          // Set the new access token in the headers of the original request
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return http(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, reject the promise
          return Promise.reject(refreshError);
        }
      }

      // If the error code is TOKEN_NOT_FOUND, redirect to the login page
      if (data?.code === "TOKEN_NOT_FOUND") {
        toast.error("Token not found. Please log in again.");
        Cookies.remove(accessTokenCookie);
        Cookies.remove(refreshTokenCookie);
        window.location.href = "/login"; // Redirect to login page
      }
    }

    // If the error does not match any specific case, just reject the promise
    return Promise.reject(error);
  }
);

export default http;
