import axios from "axios";
import { store } from "@/store";
import { logout, setAccessToken, setUser } from "@/store/slices/auth.slice";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  withCredentials: true,
});

// Request interceptor add Authorization header if token exists
http.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor for handling token expiration
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && // Unauthorized error
      !originalRequest._retry // Prevent infinite retry loops
    ) {
      originalRequest._retry = true; // Mark request as retried

      try {
        const { data } = await http.post("/refresh", {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          withCredentials: true, // Ensure cookies are sent
        });

        // Update token in Redux
        store.dispatch(setAccessToken(data.data.accessToken));
        store.dispatch(setUser(data.data.user));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return http(originalRequest);
      } catch (err) {
        // Logout if refresh token fails
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
