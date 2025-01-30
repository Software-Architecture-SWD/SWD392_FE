import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../features/counterSlice";
import productSlice from "../features/productSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    products: productSlice,
  },
});
