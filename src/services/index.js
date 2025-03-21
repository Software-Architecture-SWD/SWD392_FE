/**
 * API Services
 * 
 * Tập trung xuất tất cả API service để sử dụng trong ứng dụng
 * Có thể sử dụng các service riêng lẻ hoặc thông qua đối tượng API
 */

// Export tất cả các services
export * from './productService';
export * from './categoryService';
export * from './brandService';
export * from './blogService';
export * from './orderService';
export * from './authService';

// Import các service
import * as ProductAPI from './productService';
import * as CategoryAPI from './categoryService';
import * as BrandAPI from './brandService';
import * as BlogAPI from './blogService';
import * as OrderAPI from './orderService';
import * as AuthAPI from './authService';

/**
 * Đối tượng API tập trung
 * Cho phép sử dụng cú pháp API.products.getProducts()
 */
export const API = {
  products: ProductAPI,
  categories: CategoryAPI,
  brands: BrandAPI,
  blogs: BlogAPI,
  orders: OrderAPI,
  auth: AuthAPI
}; 