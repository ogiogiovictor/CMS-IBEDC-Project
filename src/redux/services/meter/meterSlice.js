import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    meter: [],
    caad: [],
}

const meterSlice = createSlice({
    name: 'meter',
    initialState,
    reducers: {

        setMeter(state, {payload}){
            state.meter = payload;
        },

        setCAAD(state, {payload}){
            state.caad = payload;
        },

    }
});

export const { setMeter, setCAAD  } = meterSlice.actions;
export default meterSlice.reducer;