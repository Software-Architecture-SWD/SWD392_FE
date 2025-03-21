import axiosClient from '../utils/axiosClient';
import { ENDPOINTS, normalizeResponse, handleApiError } from '../utils/apiConfig';

/**
 * Lấy danh sách danh mục
 * @returns {Promise<Array>} - Danh sách danh mục
 */
export const getCategories = async () => {
  try {
    const response = await axiosClient.get(ENDPOINTS.CATEGORIES.BASE);
    const normalizedData = normalizeResponse(response.data, 'categories');
    return normalizedData.categories || [];
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy chi tiết danh mục theo ID
 * @param {number|string} id - ID của danh mục
 * @returns {Promise<Object>} - Chi tiết danh mục
 */
export const getCategoryById = async (id) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.CATEGORIES.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Thêm danh mục mới (Admin)
 * @param {Object} categoryData - Dữ liệu danh mục mới
 * @returns {Promise<Object>} - Danh mục đã được tạo
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.CATEGORIES.BASE, categoryData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cập nhật thông tin danh mục (Admin)
 * @param {number|string} id - ID của danh mục
 * @param {Object} categoryData - Dữ liệu cập nhật
 * @returns {Promise<Object>} - Danh mục đã được cập nhật
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axiosClient.put(ENDPOINTS.CATEGORIES.BY_ID(id), categoryData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Xóa danh mục (Admin)
 * @param {number|string} id - ID của danh mục
 * @returns {Promise<Object>} - Kết quả xóa
 */
export const deleteCategory = async (id) => {
  try {
    const response = await axiosClient.delete(ENDPOINTS.CATEGORIES.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 