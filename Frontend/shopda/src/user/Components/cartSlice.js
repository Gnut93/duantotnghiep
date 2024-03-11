import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { listSP: [] },
  reducers: {
    themSP: (state, { payload }) => {
      const index = state.listSP.findIndex((s) => s.id_pd === payload.id_pd);
      if (index === -1) {
        state.listSP.push({ ...payload, soluong: 1 });
      } else {
        state.listSP[index].soluong += 1;
      }
    },
    suaSL: (state, { payload: [id_pd, soluong] }) => {
      const index = state.listSP.findIndex((s) => s.id_pd === id_pd);
      const quantity = parseInt(soluong, 10); // Đảm bảo rằng soluong là một số nguyên
      if (index !== -1) {
        if (!isNaN(quantity) && quantity > 0) {
          state.listSP[index].soluong = quantity;
        } else if (quantity === 0) {
          // Xóa sản phẩm khỏi giỏ hàng nếu số lượng là 0
          state.listSP.splice(index, 1);
        }
      }
    },
    xoaSP: (state, { payload }) => {
      state.listSP = state.listSP.filter((s) => s.id_pd !== payload);
    },
    xoaGH: (state) => {
      state.listSP = [];
    },
  },
});

export const { themSP, suaSL, xoaGH, xoaSP } = cartSlice.actions;
export default cartSlice.reducer;
