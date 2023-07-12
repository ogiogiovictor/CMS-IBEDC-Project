import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import axios from "axios";
//import { useGetLogOutMutation } from "../services/auth/authService";

const API_VERSION = `${process.env.REACT_APP_API_VERSION}`;
const backendURL = `${process.env.REACT_APP_API_URL}`;

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
      state.userMenu = localStorage.getItem("userMenu");
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logout, setCredentials, setDashboardStats, setRole } = authSlice.actions;



export const logoutAndDeleteTokens = (userId) => async (dispatch) => {

  

  try {
   
    //alert(backendURL);
     //const result =  await postLogout({ "userid" : userId }).unwrap();
     //console.log(result);

     const userToken = localStorage.getItem("userToken")

    //await axios.post('/api/logout', { userId });
    await axios.post(`${backendURL}/v2/mlogout`, { userId }, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${userToken}`,
        'app-secret': `${process.env.REACT_APP_API_APP_SECRET}`,
        'app-token': `${process.env.REACT_APP_API_APP_TOKEN}`,
      }
    });

    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userMenu");

    dispatch(logout()); // Dispatching the logout action
    

    // Handle any further actions after successful logout, if needed
    // For example, dispatching a success action or navigating to a different page

  } catch (error) {
    // Handle any errors that occur during the logout process
    // For example, displaying an error message to the user
    console.error("Logout error:", error);
  }
};


export default authSlice.reducer;
