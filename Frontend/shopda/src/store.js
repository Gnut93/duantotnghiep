import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './user/Components/cartSlice';
import authSlice from './authSlice';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
  },
});
