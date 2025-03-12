//------------------------------------------------------------------------------------------------------------------------------
export const BASE_URL = "https://localhost:7014";

//auth APIs
export const API_POST_REGISTER = "/auth/register";
export const API_POST_LOGIN = "/auth/login";
export const API_POST_LOGIN_GOOGLE = "/auth/google/login"
export const API_POST_GOOGLE_PASSWORD = "/auth/google/set-password"
export const API_POST_REFRESH_TOKEN = "/auth/refresh-token";
export const API_FORGOT_PASSWORD = "/auth/password/forgot";
export const API_RESET_PASSWORD = "/auth/password/reset";

export const API_SEND_OTP = "/email/otp/send";
export const API_VERIFY_OTP = "/email/otp/verify";

// Product APIs
export const API_GET_PRODUCT = "/products";
