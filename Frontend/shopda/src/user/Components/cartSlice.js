import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { listSP: [] },
  reducers: {
    themSP: (state, action) => {
      const { id_pd, id_pd_detail } = action.payload;
      const existingProductIndex = state.listSP.findIndex(
        (sp) => sp.id_pd === id_pd && sp.id_pd_detail === id_pd_detail
      );

      if (existingProductIndex >= 0) {
        state.listSP[existingProductIndex].soluong += 1;
      } else {
        state.listSP.push(action.payload);
      }
    },
    themSPDetail: (state, action) => {
      const { id_pd, id_pd_detail, soluong } = action.payload;
      const existingProductIndex = state.listSP.findIndex(
        (sp) => sp.id_pd === id_pd && sp.id_pd_detail === id_pd_detail
      );

      if (existingProductIndex >= 0) {
        state.listSP[existingProductIndex].soluong += soluong;
      } else {
        state.listSP.push(action.payload);
      }
    },
    suaSL: (state, { payload }) => {
      const { id_pd, id_pd_detail, soluong } = payload;
      const index = state.listSP.findIndex(
        (s) => s.id_pd === id_pd && s.id_pd_detail === id_pd_detail
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
        (s) => s.id_pd_detail !== payload.id_pd_detail
      );
    },
    xoaGH: (state) => {
      state.listSP = [];
    },
  },
});

export const { themSP, themSPDetail, suaSL, xoaGH, xoaSP } = cartSlice.actions;
export default cartSlice.reducer;
