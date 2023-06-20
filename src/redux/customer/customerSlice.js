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
  filterStatus: null,
  searchCustomers: [],
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

    setFilterStatus: (state, { payload }) => {
      state.filterStatus = payload;
    },

    setFilteredCustomers: (state) => {
      if (state.filterStatus) {
        return {
          ...state,
          customers: state.customers.filter(
            (customer) => customer.StatusCode === state.filterStatus
          )
        };
      }
      return state;
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
    setRegionCustomers: (state, action) => {
      state.searchCustomers = action.payload;
    }

  },
});

export const {
  setAllCustomers,
  setPostpaidCards,
  setPrepaidCards,
  setCustomerInfo,
  setTicketInfo,
  setCrmd,
  setFilterStatus,
  setFilteredCustomers,
  setRegionCustomers,
} = customerSlice.actions;
export default customerSlice.reducer;