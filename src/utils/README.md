# Utility Functions

Thư mục này chứa các tiện ích và cấu hình cần thiết cho toàn bộ ứng dụng.

## axiosClient.js

Cấu hình và tạo Axios client cho toàn bộ ứng dụng. File này cung cấp:

- **Cấu hình mặc định** với `baseURL`, headers và timeout
- **Xử lý token** và authentication
- **Refresh token tự động** khi token hết hạn
- **Xử lý lỗi** network và các lỗi khác
- **Interceptors** để thêm token vào mỗi request

### Cách sử dụng

```javascript
import axiosClient from '../utils/axiosClient';

// Gọi API
const fetchData = async () => {
  try {
    const response = await axiosClient.get('/some-endpoint');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

## apiConfig.js

File này tập trung tất cả các endpoint API và các hàm utility để xử lý dữ liệu từ API:

### ENDPOINTS

Đối tượng chứa tất cả endpoint của API, được phân loại theo tài nguyên:

```javascript
import { ENDPOINTS } from '../utils/apiConfig';

// Sử dụng
const usersEndpoint = ENDPOINTS.AUTH.USERS;
const productById = ENDPOINTS.PRODUCTS.BY_ID(123);
```

### normalizeResponse

Hàm này giúp chuẩn hóa dữ liệu phản hồi từ API để đảm bảo định dạng nhất quán:

```javascript
import { normalizeResponse } from '../utils/apiConfig';

// Chuẩn hóa một mảng sản phẩm
const normalizedData = normalizeResponse(responseData, 'products');
```

### handleApiError

Hàm giúp xử lý lỗi từ API một cách nhất quán:

```javascript
import { handleApiError } from '../utils/apiConfig';

try {
  // Gọi API
} catch (error) {
  const formattedError = handleApiError(error);
  
  if (formattedError.isAuthError) {
    // Xử lý lỗi xác thực
  } else if (formattedError.isNotFound) {
    // Xử lý lỗi không tìm thấy
  }
}
```

## Nguyên tắc sử dụng

- **Tập trung API**: Tất cả gọi API nên sử dụng axiosClient và các tiện ích từ apiConfig
- **Xử lý lỗi nhất quán**: Sử dụng handleApiError để xử lý tất cả lỗi từ API
- **Cập nhật endpoint**: Nếu cần thêm/sửa endpoint, hãy cập nhật ENDPOINTS trong apiConfig.js
- **Tránh trùng lặp**: Không tạo nhiều phiên bản client HTTP khác nhau

## Lưu ý

- Đảm bảo rằng `BASE_URL` trong apiConfig.js đã được cấu hình đúng
- Khi token hết hạn, axiosClient sẽ tự động làm mới và thử lại yêu cầu
- Nếu refresh token cũng hết hạn, người dùng sẽ được đưa đến trang đăng nhập 