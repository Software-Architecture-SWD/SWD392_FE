# API Services

Thư mục này chứa các service gọi API được tổ chức theo từng loại tài nguyên khác nhau.

## Cải tiến và tổ chức lại

Gần đây, chúng tôi đã cải tiến và tổ chức lại cấu trúc API service để đảm bảo tính nhất quán và dễ bảo trì:

1. **Di chuyển axiosClient**: axiosClient đã được chuyển từ thư mục gốc vào thư mục `utils/` để tập trung các utility code
2. **Tổ chức endpoints**: Tất cả các endpoint API được định nghĩa tập trung trong `utils/apiConfig.js`
3. **Chuẩn hóa xử lý lỗi**: Tất cả service sử dụng `handleApiError` từ `apiConfig.js` để xử lý lỗi nhất quán
4. **Cập nhật imports**: Tất cả services và components đã được cập nhật để sử dụng đường dẫn mới
5. **Tạo API object**: Thêm đối tượng `API` tập trung trong `index.js` để dễ dàng sử dụng các service

## Cấu trúc

```
services/
├── authService.js             # Authentication related API calls
├── blogService.js             # Blog related API calls
├── brandService.js            # Brand related API calls  
├── categoryService.js         # Category related API calls
├── orderService.js            # Order related API calls
├── productService.js          # Product related API calls
├── index.js                   # Exports all services
└── README.md                  # This documentation file

utils/
├── axiosClient.js             # Axios client configuration
└── apiConfig.js               # API endpoints and utilities
```

## Cách sử dụng

### Sử dụng API object

Cách dễ nhất để sử dụng các API service là thông qua đối tượng `API` được export từ `services/index.js`:

```javascript
import { API } from '../services';

// Sử dụng API để lấy danh sách sản phẩm
const fetchProducts = async () => {
  try {
    const response = await API.products.getProducts({ page: 1, pageSize: 10 });
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Sử dụng API để đăng nhập
const login = async (username, password) => {
  try {
    const response = await API.auth.login({ username, password });
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
```

### Sử dụng service trực tiếp

Bạn cũng có thể import và sử dụng từng service một cách trực tiếp:

```javascript
import { getProducts, filterProducts } from '../services/productService';
import { login, register } from '../services/authService';

// Lấy danh sách sản phẩm
const products = await getProducts({ page: 1, pageSize: 10 });

// Lọc sản phẩm theo danh mục
const filteredProducts = await filterProducts({ categoryName: 'Skincare' });

// Đăng nhập
const loginResult = await login({ username: 'user', password: 'pass' });
```

## Xử lý lỗi

Tất cả các API service đều có xử lý lỗi nhất quán thông qua hàm `handleApiError` từ `utils/apiConfig.js`. 
Hàm này chuẩn hóa các lỗi API dựa trên mã trạng thái HTTP:

- **401**: Lỗi xác thực, yêu cầu đăng nhập lại
- **404**: Tài nguyên không tìm thấy
- **5xx**: Lỗi server

Ví dụ xử lý lỗi:

```javascript
try {
  const response = await API.products.getProducts();
  // Xử lý dữ liệu
} catch (error) {
  if (error.isAuthError) {
    // Chuyển hướng đến trang đăng nhập
  } else if (error.isNotFound) {
    // Hiển thị thông báo không tìm thấy
  } else {
    // Hiển thị thông báo lỗi chung
    console.error(error.message);
  }
}
```

## Chuẩn hóa dữ liệu

Các API service sử dụng hàm `normalizeResponse` để chuẩn hóa dữ liệu trả về từ API. Điều này đảm bảo dữ liệu luôn có cấu trúc nhất quán, bất kể định dạng gốc của API là gì.

Ví dụ:
- Nếu API trả về một mảng đơn giản: `[{}, {}, {}]`
- `normalizeResponse` sẽ chuyển đổi thành: `{ items: [{}, {}, {}], totalCount: 3, page: 1, ... }`

## Cache API

Chúng tôi đề xuất sử dụng React Query hoặc SWR để cache dữ liệu API, giảm thiểu số lượng request và cải thiện hiệu suất ứng dụng.

### Ví dụ với React Query:

```javascript
import { useQuery } from 'react-query';
import { API } from '../services';

function ProductList() {
  const { data, isLoading, error } = useQuery(
    ['products', { page: 1, pageSize: 10 }],
    () => API.products.getProducts({ page: 1, pageSize: 10 })
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{/* Render products */}</div>;
}
``` 