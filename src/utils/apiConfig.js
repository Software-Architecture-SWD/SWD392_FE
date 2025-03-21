/**
 * Chuẩn hóa URL endpoint trong ứng dụng
 * Tất cả API endpoint sẽ được định nghĩa ở đây để đảm bảo tính nhất quán
 */

// Base endpoints
export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-tokens',
    CHECK_ADMIN: '/auth/check-admin',
    REGISTER_CUSTOMER: '/auth/register-customer',
    DELETE_USER: (username) => `/auth/delete/${username}`,
    RESTORE_USER: (username) => `/auth/restore/${username}`,
    USERS: '/auth/users',
    USER: (id) => `/auth/users/${id}`,
  },
  
  // Product endpoints
  PRODUCTS: {
    BASE: '/products',
    FILTER: '/products/filter',
    BY_ID: (id) => `/products/${id}`,
    TOTAL: '/products/total',
  },
  
  // Category endpoints
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id) => `/categories/${id}`,
  },
  
  // Brand endpoints
  BRANDS: {
    BASE: '/brands',
    BY_ID: (id) => `/brands/${id}`,
  },
  
  // Blog endpoints
  BLOGS: {
    BASE: '/blogs',
    BY_ID: (id) => `/blogs/${id}`,
    REMOVAL: (id) => `/blogs/${id}/removal`,
    RESTORATION: (id) => `/blogs/${id}/restoration`,
  },
  
  // Order endpoints
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id) => `/orders/${id}`,
    TOTAL: '/orders/total',
    USER_ORDERS: (userId) => `/orders/user/${userId}`,
  },

  // Email endpoints
  EMAIL: {
    SEND_OTP: '/email/send-otp',
    VERIFY_OTP: '/email/verify-otp',
  }
};

/**
 * Chuẩn hóa response format cho tất cả API
 * @param {Object} data - Dữ liệu từ API
 * @param {string} entityName - Tên của entity (products, blogs, etc.)
 * @returns {Object} - Dữ liệu đã được chuẩn hóa
 */
export const normalizeResponse = (data, entityName) => {
  // Nếu dữ liệu là mảng, wrap vào object với tên entity
  if (Array.isArray(data)) {
    return {
      [entityName]: data,
      totalCount: data.length,
      page: 1,
      pageSize: data.length,
      totalPages: 1
    };
  }
  
  // Nếu dữ liệu là object có chứa mảng với tên entity, trả về như vậy
  if (data && data[entityName] && Array.isArray(data[entityName])) {
    return {
      ...data,
      totalPages: Math.ceil((data.totalCount || 0) / (data.pageSize || 10))
    };
  }
  
  // Các trường hợp khác, trả về dữ liệu ban đầu
  return data;
};

/**
 * Xử lý lỗi từ API một cách nhất quán
 * @param {Error} error - Lỗi từ API
 * @returns {Object} - Thông tin lỗi đã được chuẩn hóa
 */
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  // Lỗi từ response
  if (error.response) {
    const { status, data } = error.response;
    
    // Xử lý lỗi 401 Unauthorized
    if (status === 401) {
      return {
        status,
        message: 'Unauthorized. Please login again.',
        isAuthError: true,
      };
    }
    
    // Xử lý lỗi 404 Not Found
    if (status === 404) {
      return {
        status,
        message: data.message || 'Resource not found.',
        isNotFound: true,
      };
    }
    
    // Xử lý các lỗi server khác
    if (status >= 500) {
      return {
        status,
        message: 'Server error. Please try again later.',
        isServerError: true,
      };
    }
    
    // Các lỗi khác
    return {
      status,
      message: data.message || 'An error occurred.',
      data: data,
    };
  }
  
  // Lỗi network hoặc lỗi khác
  return {
    status: 0,
    message: error.message || 'Network error. Please check your connection.',
    isNetworkError: !error.response,
  };
}; 