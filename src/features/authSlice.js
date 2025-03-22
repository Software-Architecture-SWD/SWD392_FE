import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";
import { ENDPOINTS, handleApiError } from "../utils/apiConfig";
import { googleLogout } from "@react-oauth/google";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.LOGIN, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/login-google",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.LOGIN_GOOGLE, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const setGooglePassword = createAsyncThunk(
  "auth/google-setPassword",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(
        ENDPOINTS.AUTH.GOOGLE_PASSWORD,
        userData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const sendOtp = createAsyncThunk("auth/sendOtp", async (_, thunkAPI) => {
  try {
    const response = await axiosClient.post(ENDPOINTS.EMAIL.SEND_OTP);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.EMAIL.VERIFY_OTP, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    forgotPasswordSuccess: false,
  },
  reducers: {
    resetMessage: (state) => {
      state.error = null;
      state.forgotPasswordSuccess = false;
    },
    clearToken: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.dispatchEvent(new Event("storage"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed!";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { accessToken, refreshToken, user } = action.payload;
        if (accessToken && refreshToken && user?.emailConfirmed) {
          state.user = user;
          state.isAuthenticated = true;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          state.isAuthenticated = false;
          state.error = "Email not confirmed or invalid response";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed!";
      })
      // ✅ loginWithGoogle cases
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        console.log("authSlice", action.payload);
        const { accessToken, refreshToken, user } = action.payload;
        if (accessToken && refreshToken) {
          state.user = user;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          state.error = "Login with Google failed!";
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login with Google failed!";
      })
      // ✅ setGooglePassword cases
      .addCase(setGooglePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setGooglePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(setGooglePassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Setting Google password failed!";
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send OTP";
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Invalid OTP!";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Forgot password failed!";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Reset password failed!";
      });
  },
});

export const { resetMessage, clearToken } = authSlice.actions;
export default authSlice.reducer;
