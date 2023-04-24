import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payment: [],
    paymentData: [],
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
            
        }

    }
});

export const {
    setPayment,
    setDataPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;