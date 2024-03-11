import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './user/Components/cartSlice';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
