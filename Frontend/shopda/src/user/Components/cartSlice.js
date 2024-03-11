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
      if (index !== -1 && soluong >= 0) {
        state.listSP[index].soluong = soluong;
      }
    },
    xoaSP: (state, payload) => {
      let id_pd = payload.payload;
      const index = (state.listSP = state.listSP.filter(
        (s) => s.id_pd !== id_pd
      ));
      if (index !== -1) state.listSP.splice(index, 1);
    },
    xoaGH: (state) => {
      state.listSP = [];
    },
  },
});

export const { themSP, suaSL, xoaGH, xoaSP } = cartSlice.actions;
export default cartSlice.reducer;
