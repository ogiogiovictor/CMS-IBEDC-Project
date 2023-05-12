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
          "app-secret": `${process.env.REACT_APP_API_APP_SECRET}`,
          "app-Token": `${process.env.REACT_APP_API_APP_TOKEN}`,
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth_login`,
        { email, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("userToken", data.data.Authorization);
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      notify("success", "Login successful");
      return data.data.user;
    } catch (error) {
      console.log(error)
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
