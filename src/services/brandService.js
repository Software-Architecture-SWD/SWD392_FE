import axiosClient from '../utils/axiosClient';
import { ENDPOINTS, normalizeResponse, handleApiError } from '../utils/apiConfig';

/**
 * Lấy danh sách thương hiệu
 * @returns {Promise<Array>} - Danh sách thương hiệu
 */
export const getBrands = async () => {
  try {
    const response = await axiosClient.get(ENDPOINTS.BRANDS.BASE);
    const normalizedData = normalizeResponse(response.data, 'brands');
    return normalizedData.brands || [];
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy chi tiết thương hiệu theo ID
 * @param {number|string} id - ID của thương hiệu
 * @returns {Promise<Object>} - Chi tiết thương hiệu
 */
export const getBrandById = async (id) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.BRANDS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Thêm thương hiệu mới (Admin)
 * @param {Object} brandData - Dữ liệu thương hiệu mới
 * @returns {Promise<Object>} - Thương hiệu đã được tạo
 */
export const createBrand = async (brandData) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.BRANDS.BASE, brandData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cập nhật thông tin thương hiệu (Admin)
 * @param {number|string} id - ID của thương hiệu
 * @param {Object} brandData - Dữ liệu cập nhật
 * @returns {Promise<Object>} - Thương hiệu đã được cập nhật
 */
export const updateBrand = async (id, brandData) => {
  try {
    const response = await axiosClient.put(ENDPOINTS.BRANDS.BY_ID(id), brandData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Xóa thương hiệu (Admin)
 * @param {number|string} id - ID của thương hiệu
 * @returns {Promise<Object>} - Kết quả xóa
 */
export const deleteBrand = async (id) => {
  try {
    const response = await axiosClient.delete(ENDPOINTS.BRANDS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 