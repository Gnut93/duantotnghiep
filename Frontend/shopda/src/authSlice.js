import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: { daDangNhap: false, user: null, token: null, expiresIn: 0 },
    reducers: {
        thoat: (state) => {
            state.daDangNhap = false;
            state.user = null;
            state.token = null;
            state.expiresIn = 0;
        },
        dalogin: (state, param) => {
            state.token = param.payload.token;
            state.expiresIn = param.payload.expiresIn;
            state.user = param.payload.userInfo;
            state.daDangNhap = true;
        },
        capnhatUserInfo: (state, param) => {
            state.user = param.payload.userInfo;
        },
    },
});
export const { dalogin, thoat, capnhatUserInfo } = authSlice.actions;
export default authSlice.reducer;
