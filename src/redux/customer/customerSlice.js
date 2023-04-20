import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  postpaidCards: [],
  prepaidCards: [],
  customerInfo: null,
  loading: false,
  error: null,
  success: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setPrepaidCards: (state, action) => {
      state.prepaidCards = action.payload;
    },

    setAllCustomers: (state, { payload }) => {
      state.customers = payload;
    },

    setPostpaidCards: (state, action) => {
      state.postpaidCards = action.payload;
    },

    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
  },
});

export const {
  setAllCustomers,
  setPostpaidCards,
  setPrepaidCards,
  setCustomerInfo,
} = customerSlice.actions;
export default customerSlice.reducer;