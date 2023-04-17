import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notify } from "../../utils/notify";

const backendURL = `${process.env.REACT_APP_API_URL}`;

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          "app-secret": "daniel",
          "app-token": "daniel",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth_login_test`,
        { email, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.data.Authorization);
      notify("success", "Login successful");
      if(data.data.user){
        return data.data.user;
      }
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        notify("error", error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        notify("error", error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
