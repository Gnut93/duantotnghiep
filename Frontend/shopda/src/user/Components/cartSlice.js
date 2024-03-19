import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { listSP: [] },
  reducers: {
    themSP: (state, action) => {
      const { id_pd, id_color } = action.payload;
      const existingProductIndex = state.listSP.findIndex(
        (sp) => sp.id_pd === id_pd && sp.id_color === id_color
      );

      if (existingProductIndex >= 0) {
        state.listSP[existingProductIndex].soluong += 1;
      } else {
        state.listSP.push(action.payload);
      }
    },
    themSPDetail: (state, action) => {
      const { id_pd, id_color, soluong } = action.payload;
      const existingProductIndex = state.listSP.findIndex(
        (sp) => sp.id_pd === id_pd && sp.id_color === id_color
      );

      if (existingProductIndex >= 0) {
        state.listSP[existingProductIndex].soluong += soluong;
      } else {
        state.listSP.push(action.payload);
      }
    },
    suaSL: (state, { payload }) => {
      const { id_pd, id_color, soluong } = payload;
      const index = state.listSP.findIndex(
        (s) => s.id_pd === id_pd && s.id_color === id_color
      );
      const quantity = parseInt(soluong, 10);

      if (index !== -1) {
        if (!isNaN(quantity) && quantity > 0) {
          state.listSP[index].soluong = quantity;
        } else if (quantity === 0) {
          state.listSP.splice(index, 1);
        }
      }
    },
    xoaSP: (state, { payload }) => {
      // Giả sử payload là { id_color: xxx }
      state.listSP = state.listSP.filter(
        (s) => s.id_color !== payload.id_color
      );
    },
    xoaGH: (state) => {
      state.listSP = [];
    },
  },
});

export const { themSP, themSPDetail, suaSL, xoaGH, xoaSP } = cartSlice.actions;
export default cartSlice.reducer;
