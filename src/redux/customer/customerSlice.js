import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  postpaidCustomers: [],
  prepaidCustomers: [],
  customerInfo: null,
  loading: false,
  error: null,
  success: false,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setPrepaidCustomers: (state, { payload }) => {
      state.prepaidCustomers = payload;
    },

    setAllCustomers: (state, { payload }) => {
      state.customers = payload;
    },

    setPostpaidCustomers: (state, action) => {
      state.postpaidCustomers = action.payload;
    },

    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload;
    },
  },
});

export const {
  setAllCustomers,
  setPostpaidCustomers,
  setPrepaidCustomers,
  setCustomerInfo,
} = customerSlice.actions;
export default customerSlice.reducer;