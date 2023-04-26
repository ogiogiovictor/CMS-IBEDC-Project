import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bills: [],
    billData: [],
    billInfo: [],
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
        },
        setBillInfo: (state, action) => {
          state.billInfo = action.payload;
      
        }

    },

  });

  export const {
    setBills,
    setDataBills,
    setBillInfo,
  } = billSlice.actions;
  export default billSlice.reducer;