import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    meter: [],
}

const meterSlice = createSlice({
    name: 'meter',
    initialState,
    reducers: {

        setMeter(state, {payload}){
            state.meter = payload;
        },

    }
});

export const { setMeter  } = meterSlice.actions;
export default meterSlice.reducer;