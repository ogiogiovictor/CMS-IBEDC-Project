import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bills: [],
    billData: [],
    loading: false,
    error: null,
    success: false,
  };

  const billSlice = createSlice({
    name: "bills",
    initialState,
    reducers: {
        setBills: (state, action) => {
        state.bills = action.payload;
        },
        setDataBills: (state, action) => {
            state.billData = action.payload;
        }

    },

  });

  export const {
    setBills,
    setDataBills,
  } = billSlice.actions;
  export default billSlice.reducer;