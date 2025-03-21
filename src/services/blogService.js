import axiosClient from '../utils/axiosClient';
import { ENDPOINTS, normalizeResponse, handleApiError } from '../utils/apiConfig';

/**
 * Lấy danh sách blog với phân trang
 * @param {Object} params - Thông số phân trang (page, pageSize)
 * @returns {Promise<Object>} - Danh sách blog đã được chuẩn hóa
 */
export const getBlogs = async (params = { page: 1, pageSize: 10 }) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.BLOGS.BASE, { params });
    return normalizeResponse(response.data, 'blogs');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy chi tiết blog theo ID
 * @param {number|string} id - ID của blog
 * @returns {Promise<Object>} - Chi tiết blog
 */
export const getBlogById = async (id) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.BLOGS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Thêm blog mới (Admin)
 * @param {Object} blogData - Dữ liệu blog mới
 * @returns {Promise<Object>} - Blog đã được tạo
 */
export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    
    // Chuyển dữ liệu blog sang FormData
    Object.keys(blogData).forEach(key => {
      formData.append(key, blogData[key]);
    });
    
    const response = await axiosClient.post(ENDPOINTS.BLOGS.BASE, formData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cập nhật thông tin blog (Admin)
 * @param {number|string} id - ID của blog
 * @param {Object} blogData - Dữ liệu cập nhật
 * @returns {Promise<Object>} - Blog đã được cập nhật
 */
export const updateBlog = async (id, blogData) => {
  try {
    const response = await axiosClient.put(ENDPOINTS.BLOGS.BY_ID(id), blogData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Xóa blog (Admin)
 * @param {number|string} id - ID của blog
 * @returns {Promise<Object>} - Kết quả xóa
 */
export const deleteBlog = async (id) => {
  try {
    const response = await axiosClient.delete(ENDPOINTS.BLOGS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Xóa tạm thời blog (Admin)
 * @param {number|string} id - ID của blog
 * @returns {Promise<Object>} - Kết quả xóa tạm thời
 */
export const softDeleteBlog = async (id) => {
  try {
    const response = await axiosClient.patch(ENDPOINTS.BLOGS.REMOVAL(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Khôi phục blog đã xóa tạm thời (Admin)
 * @param {number|string} id - ID của blog
 * @returns {Promise<Object>} - Kết quả khôi phục
 */
export const restoreBlog = async (id) => {
  try {
    const response = await axiosClient.patch(ENDPOINTS.BLOGS.RESTORATION(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 