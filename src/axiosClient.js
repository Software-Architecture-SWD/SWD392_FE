import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_POST_REFRESH_TOKEN, BASE_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;

  try {
    const decoded = jwtDecode(accessToken);
    console.log(
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );
    return decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// Request Interceptor: Attach `accessToken` to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration & refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("❌ API Error:", error.response?.status); // Debugging

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 401 detected! Trying refresh...");
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = getUserIdFromToken();

        const res = await axios.post(API_POST_REFRESH_TOKEN, {
          userId,
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        console.log("✅ New tokens received!", newAccessToken);

        // Save new tokens
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh failed, logging out...");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
