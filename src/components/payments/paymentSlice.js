import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payment: [],
    paymentData: [],
    paymentInfo: [],
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {

        setPayment: (state, action) => {
            state.payment = action.payload;
        },
            
        setDataPayment: (state, action) => {
                state.paymentData = action.payload;
            
        },

        setPaymentInfo: (state, action) => {
            state.paymentInfo = action.payload;
        
          }

    }
});

export const {
    setPayment,
    setDataPayment,
    setPaymentInfo,
} = paymentSlice.actions;
export default paymentSlice.reducer;