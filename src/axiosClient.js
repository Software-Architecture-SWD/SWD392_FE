import axios from "axios";
import store from "../src/store/store";
import { refreshToken, logout } from "../src/features/authSlice";
import { BASE_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// Attach accessToken to every request
axiosClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await store.dispatch(refreshToken()).unwrap();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
        store.dispatch(logout()); // Logout user on refresh failure
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
