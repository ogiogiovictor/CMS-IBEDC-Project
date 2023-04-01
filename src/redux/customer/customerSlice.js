import { createSlice } from "@reduxjs/toolkit";

const initialCustomerState = [];


// This is the initial state of the customerinfo slice of the store
// Every slice need a name and an initial state
const customerSlice = createSlice({
    name: "customerinfo",
    initialCustomerState,
    reducers: {
       
        customercardslist(state) {
            return state;
        },

        prepaidCustomers(state) {
            return state;
        },
        postpaidCustomers(state) {
            return state;
        },
        customerbills(state) {
            return state;
        },
        customerpayment(state) {
            return state;
        },
       

    }

});

export const customerActions = customerSlice.actions;
export default customerSlice;