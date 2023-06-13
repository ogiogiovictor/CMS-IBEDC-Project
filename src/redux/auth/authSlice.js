import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const userMenu = JSON.parse(localStorage.getItem("userMenu"))
  ? JSON.parse(localStorage.getItem("userMenu"))
  : null;

const initialState = {
  loading: false,
  userInfo,
  userToken,
  userMenu,
  error: null,
  success: false,
  dashboardStats: [],
  roles: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      localStorage.removeItem("userInfo"); // deletes token from storage
      localStorage.removeItem("userMenu"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.userMenu = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    setDashboardStats: (state, { payload }) => {
      state.dashboardStats = payload;
    },
    setRole: (state, {payload}) => {
      state.roles = payload;
    }
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      state.userToken = localStorage.getItem("userToken");
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logout, setCredentials, setDashboardStats, setRole } = authSlice.actions;
export default authSlice.reducer;
