import { createSlice } from "@reduxjs/toolkit";


// This is the initial state of the customerinfo slice of the store
// Every slice need a name and an initial state
const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customer: []
    },
    reducers: {
       
        customercardslist(state, action) {
            return state.customer = action.payload;
        },

        prepaidCustomers(state, action) {
            return state.customer = action.payload
        },

        allcustomers(state, action) {
            return state.customer = action.payload.data
        },

        postpaidCustomers(state, action) {
            return state.customer = action.payload
        },
        customerbills(state, action) {
            return state.customer = action.payload
        },

        customerpayment(state, action) {
            return state.customer =action.payload
        },
        
       

    }

});

export const customerActions = customerSlice.actions;
export default customerSlice;