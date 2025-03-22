/**
 * Axios Client Configuration
 * 
 * Cấu hình Axios client cho toàn bộ ứng dụng, bao gồm:
 * - Cấu hình mặc định (baseURL, headers, timeout)
 * - Xử lý token authentication
 * - Refresh token tự động khi token hết hạn
 * - Xử lý lỗi network và các lỗi khác
 */

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ENDPOINTS, BASE_URL } from './apiConfig';

/**
 * Khởi tạo Axios client với cấu hình mặc định
 */
const axiosClient = axios.create({
  baseURL: BASE_URL || "https://localhost:7014/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Lấy ID người dùng từ JWT token
 * @returns {string|null} ID của người dùng
 */
const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return null;

  try {
    const decoded = jwtDecode(accessToken);
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

/**
 * Request Interceptor: Thêm token và ngăn cache
 */
axiosClient.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now()
    };
    
    // Add authorization header if token exists
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor: Xử lý token hết hạn và refresh
 */
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("❌ API Error:", error.response?.status, error.response?.data); // Detailed error logging

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("🔄 401 detected! Trying refresh...");
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = getUserIdFromToken();

        if (!refreshToken || !userId) {
          throw new Error("Missing refresh token or user ID");
        }

        const res = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
          userId,
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        console.log("✅ New tokens received!");

        // Save new tokens
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Retry failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh failed, logging out...", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        // Redirect to login page only if in browser environment
        if (typeof window !== 'undefined') {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // For network errors, add more context
    if (!error.response) {
      error.message = "Network error. Please check your connection.";
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient; 