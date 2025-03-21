import axiosClient from '../utils/axiosClient';
import { ENDPOINTS, normalizeResponse, handleApiError } from '../utils/apiConfig';

/**
 * Lấy danh sách sản phẩm với phân trang
 * @param {Object} params - Thông số của request (page, pageSize)
 * @returns {Promise<Object>} - Danh sách sản phẩm đã được chuẩn hóa
 */
export const getProducts = async (params = { page: 1, pageSize: 12 }) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.PRODUCTS.BASE, { params });
    return normalizeResponse(response.data, 'products');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy chi tiết sản phẩm theo ID
 * @param {number|string} id - ID của sản phẩm
 * @returns {Promise<Object>} - Chi tiết sản phẩm
 */
export const getProductById = async (id) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.PRODUCTS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lọc sản phẩm theo các tiêu chí
 * @param {Object} filters - Các filter (brandName, categoryName, etc.)
 * @param {Object} params - Thông số phân trang
 * @returns {Promise<Object>} - Danh sách sản phẩm đã được lọc
 */
export const filterProducts = async (filters = {}, params = { page: 1, pageSize: 12 }) => {
  try {
    const queryParams = { ...params, ...filters };
    const response = await axiosClient.get(ENDPOINTS.PRODUCTS.FILTER, { params: queryParams });
    return normalizeResponse(response.data, 'products');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy tổng số sản phẩm
 * @returns {Promise<number>} - Tổng số sản phẩm
 */
export const getTotalProducts = async () => {
  try {
    const response = await axiosClient.get(ENDPOINTS.PRODUCTS.TOTAL);
    return response.data.TotalProducts || 0;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Thêm sản phẩm mới
 * @param {Object} productData - Dữ liệu sản phẩm mới
 * @returns {Promise<Object>} - Sản phẩm đã được tạo
 */
export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    
    // Chuyển dữ liệu sản phẩm sang FormData
    Object.keys(productData).forEach(key => {
      formData.append(key, productData[key]);
    });
    
    const response = await axiosClient.post(ENDPOINTS.PRODUCTS.BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cập nhật thông tin sản phẩm
 * @param {number|string} id - ID của sản phẩm
 * @param {Object} productData - Dữ liệu cập nhật
 * @returns {Promise<Object>} - Sản phẩm đã được cập nhật
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosClient.put(ENDPOINTS.PRODUCTS.BY_ID(id), productData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Xóa sản phẩm
 * @param {number|string} id - ID của sản phẩm
 * @returns {Promise<Object>} - Kết quả xóa
 */
export const deleteProduct = async (id) => {
  try {
    const response = await axiosClient.delete(ENDPOINTS.PRODUCTS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Format dữ liệu sản phẩm
 * @param {Object|Array} products - Sản phẩm hoặc danh sách sản phẩm
 * @returns {Object|Array} - Dữ liệu sản phẩm đã được format
 */
export const formatProductData = (products) => {
  // Xử lý danh sách sản phẩm
  if (Array.isArray(products)) {
    return products.map(product => formatSingleProduct(product));
  }
  
  // Xử lý một sản phẩm
  return formatSingleProduct(products);
};

/**
 * Format dữ liệu một sản phẩm
 * @param {Object} product - Dữ liệu sản phẩm
 * @returns {Object} - Sản phẩm đã được format
 */
const formatSingleProduct = (product) => {
  return {
    ...product,
    price: typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0,
    oldPrice: product.oldPrice 
      ? (typeof product.oldPrice === 'number' ? product.oldPrice : parseFloat(product.oldPrice)) 
      : null,
    imageUrl: product.images && product.images.length > 0 
      ? product.images[0] 
      : 'https://placehold.co/400x400/png?text=No+Image'
  };
}; 