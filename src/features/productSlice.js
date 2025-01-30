import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";
import { API_GET_PRODUCT } from "../constants";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_GET_PRODUCT);
      return response.data.slice(0, 8);
    } catch (error) {
      return rejectWithValue(
        error.response?.data.slice(0, 8) || "Failed to fetch products"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
