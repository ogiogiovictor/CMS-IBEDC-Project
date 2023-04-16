import { createSlice } from "@reduxjs/toolkit";
//import { customerAction } from "./customerActions";

const initialState = { 
    customer: [],
    loading: false,
    error: null,
    success: false,
}


// Every slice need a name and an initial state
const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      
        SetpPrepaidCustomers(state, action) {
            return state.customer = action.payload
        },

        SetAllcustomers(state, action) {
            return state.customer = action.payload
        },

        SetPostpaidCustomers(state, action) {
            return state.customer = action.payload
        },

        setCustomerInfo(state, { payload }) {
            return state.customer = payload
        },

        /*
        //This will happen when want to post customer. We will add this for later
        extraReducers: { 
            [customerAction.pending]: (state) => {
                state.loading = true;
                state.error = null;
            },
            [customerAction.fulfilled]: (state, { payload }) => {
                state.loading = false;
                state.customer = payload;
            },
            [customerAction.rejected]: (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            },
        }
        */

    }

});

export const customerActions = customerSlice.actions;
export default customerSlice;