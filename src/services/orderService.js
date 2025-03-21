import axiosClient from '../utils/axiosClient';
import { ENDPOINTS, normalizeResponse, handleApiError } from '../utils/apiConfig';

/**
 * Lấy danh sách đơn hàng với phân trang
 * @param {Object} params - Thông số phân trang và lọc (page, pageSize, etc.)
 * @returns {Promise<Object>} - Danh sách đơn hàng đã được chuẩn hóa
 */
export const getOrders = async (params = { page: 1, pageSize: 10 }) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.ORDERS.BASE, { params });
    return normalizeResponse(response.data, 'orders');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy danh sách đơn hàng của người dùng
 * @param {number|string} userId - ID của người dùng
 * @param {Object} params - Thông số phân trang (page, pageSize)
 * @returns {Promise<Object>} - Danh sách đơn hàng của người dùng
 */
export const getUserOrders = async (userId, params = { page: 1, pageSize: 10 }) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.ORDERS.USER_ORDERS(userId), { params });
    return normalizeResponse(response.data, 'orders');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param {number|string} id - ID của đơn hàng
 * @returns {Promise<Object>} - Chi tiết đơn hàng
 */
export const getOrderById = async (id) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.ORDERS.BY_ID(id));
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy tổng số đơn hàng theo ngày
 * @param {string} date - Ngày cần thống kê (format: YYYY-MM-DD)
 * @returns {Promise<number>} - Tổng số đơn hàng
 */
export const getTotalOrdersByDay = async (date) => {
  try {
    const response = await axiosClient.get(ENDPOINTS.ORDERS.TOTAL, { params: { date } });
    return response.data.TotalOrders || 0;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Lấy tổng số đơn hàng
 * @param {string} date - Ngày cần thống kê (optional, format: YYYY-MM-DD)
 * @returns {Promise<Object>} - Thống kê tổng số đơn hàng
 */
export const getTotalOrders = async (date) => {
  try {
    const params = date ? { date } : {};
    const response = await axiosClient.get(ENDPOINTS.ORDERS.TOTAL, { params });
    return {
      totalCount: response.data.TotalOrders || 0,
      date: date
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Tạo đơn hàng mới
 * @param {Object} orderData - Dữ liệu đơn hàng mới
 * @returns {Promise<Object>} - Đơn hàng đã được tạo
 */
export const createOrder = async (orderData) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.ORDERS.BASE, orderData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cập nhật trạng thái đơn hàng (Admin)
 * @param {number|string} id - ID của đơn hàng
 * @param {string} status - Trạng thái mới
 * @returns {Promise<Object>} - Đơn hàng đã được cập nhật
 */
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axiosClient.patch(ENDPOINTS.ORDERS.BY_ID(id), { status });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Hủy đơn hàng
 * @param {number|string} id - ID của đơn hàng
 * @param {string} reason - Lý do hủy đơn
 * @returns {Promise<Object>} - Kết quả hủy đơn
 */
export const cancelOrder = async (id, reason) => {
  try {
    const response = await axiosClient.patch(ENDPOINTS.ORDERS.BY_ID(id), { 
      status: 'Cancelled',
      cancelReason: reason
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Generate sample orders for testing
 * @param {number} count - Số lượng đơn hàng mẫu
 * @param {string} date - Ngày của đơn hàng
 * @returns {Array} - Danh sách đơn hàng mẫu
 */
export const generateSampleOrders = (count, date = new Date().toISOString().split('T')[0]) => {
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const sampleOrders = [];
  
  for (let i = 1; i <= count; i++) {
    sampleOrders.push({
      id: i,
      customerName: `Customer ${i}`,
      date: date,
      total: Math.floor(Math.random() * 500) + 50,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      items: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
        productName: `Product ${j + 1}`,
        quantity: Math.floor(Math.random() * 5) + 1,
        price: Math.floor(Math.random() * 100) + 10
      }))
    });
  }
  
  return sampleOrders;
}; 