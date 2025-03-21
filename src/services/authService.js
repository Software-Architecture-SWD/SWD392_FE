import axiosClient from '../utils/axiosClient';
import { ENDPOINTS, normalizeResponse, handleApiError } from '../utils/apiConfig';
import { jwtDecode } from 'jwt-decode';

/**
 * Đăng nhập người dùng
 * @param {Object} credentials - Thông tin đăng nhập (username, password)
 * @returns {Promise<Object>} - Thông tin người dùng và tokens
 */
export const login = async (credentials) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    
    if (response.data && response.data.accessToken) {
      // Lưu tokens vào localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken || '');
    }
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Đăng ký người dùng mới
 * @param {Object} userData - Thông tin người dùng mới
 * @returns {Promise<Object>} - Kết quả đăng ký
 */
export const register = async (userData) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Đăng ký khách hàng mới
 * @param {Object} customerData - Thông tin khách hàng mới
 * @returns {Promise<Object>} - Kết quả đăng ký
 */
export const registerCustomer = async (customerData) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.AUTH.REGISTER_CUSTOMER, customerData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Refresh token
 * @returns {Promise<Object>} - Tokens mới
 */
export const refreshToken = async () => {
  try {
    const userId = getUserIdFromToken();
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!userId || !refreshToken) {
      throw new Error('Missing user ID or refresh token');
    }
    
    const response = await axiosClient.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
      userId,
      refreshToken
    });
    
    // Lưu tokens mới vào localStorage
    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken || '');
    }
    
    return response.data;
  } catch (error) {
    // Xóa tokens nếu refresh token thất bại
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw handleApiError(error);
  }
};

/**
 * Đăng xuất
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Kiểm tra quyền admin
 * @returns {Promise<boolean>} - True nếu là admin
 */
export const checkAdmin = async () => {
  try {
    const response = await axiosClient.get(ENDPOINTS.AUTH.CHECK_ADMIN);
    return response.data.isAdmin || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Lấy ID người dùng từ token
 * @returns {string|null} - ID người dùng
 */
export const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return null;

  try {
    const decoded = jwtDecode(accessToken);
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

/**
 * Kiểm tra trạng thái đăng nhập
 * @returns {boolean} - True nếu đã đăng nhập
 */
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};

/**
 * Lấy danh sách người dùng (Admin)
 * @param {Object} params - Thông số phân trang (page, pageSize)
 * @returns {Promise<Object>} - Danh sách người dùng
 */
export const getUsers = async (params = { page: 1, pageSize: 10 }) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.AUTH.USERS, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Vô hiệu hóa tài khoản người dùng (Admin)
 * @param {string} username - Tên đăng nhập
 * @returns {Promise<Object>} - Kết quả vô hiệu hóa
 */
export const deactivateUser = async (username) => {
  try {
    const response = await axiosClient.patch(ENDPOINTS.AUTH.DELETE_USER(username));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Kích hoạt lại tài khoản người dùng (Admin)
 * @param {string} username - Tên đăng nhập
 * @returns {Promise<Object>} - Kết quả kích hoạt
 */
export const activateUser = async (username) => {
  try {
    const response = await axiosClient.patch(ENDPOINTS.AUTH.RESTORE_USER(username));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Gửi mã OTP qua email
 * @returns {Promise<Object>} - Kết quả gửi OTP
 */
export const sendOtp = async () => {
  try {
    const response = await axiosClient.get(ENDPOINTS.EMAIL.SEND_OTP);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Xác thực mã OTP
 * @param {Object} data - Dữ liệu xác thực OTP (code, email)
 * @returns {Promise<Object>} - Kết quả xác thực
 */
export const verifyOtp = async (data) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.EMAIL.VERIFY_OTP, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 