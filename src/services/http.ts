import { getErrorMessage } from "@/utils/getErrorMessage";
import { isTokenExpired } from "@/utils/token";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME || "token";

// Create an Axios instance
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // Set a timeout for requests
});

// Add request interceptor to include the token in the headers
http.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_NAME);
    if (token && !isTokenExpired(token)) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle any request errors
);

// Add response interceptor to handle errors
http.interceptors.response.use(
  (response) => response, // Return the response if no error
  (error) => {
    // Handle the error with proper typing
    let errorMessage = "An unexpected error occurred."; // Default error message
    if (error instanceof AxiosError) {
      errorMessage = getErrorMessage(error); // Get a user-friendly error message
    }

    // Reject the promise with the error message and the original error
    return Promise.reject({ message: errorMessage, originalError: error });
  }
);

export default http;
