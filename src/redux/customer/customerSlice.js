import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  postpaidCards: [],
  prepaidCards: [],
  ticketInfo: [], // Set an initial value for ticketInfo
  crmd: [], // Set an initial value for crmd
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

    setTicketInfo: (state, action) => {
      state.ticketInfo = action.payload;
    },

    setCrmd: (state, action) => {
      state.crmd = action.payload;
    },
  },
});

export const {
  setAllCustomers,
  setPostpaidCards,
  setPrepaidCards,
  setCustomerInfo,
  setTicketInfo,
  setCrmd
} = customerSlice.actions;
export default customerSlice.reducer;