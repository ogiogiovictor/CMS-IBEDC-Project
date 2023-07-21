import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    meter: [],
    caad: [],
    batch: [],
   
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
        
        setBATCH(state, {payload}){
            state.batch = payload;
        },

       

    }
});

export const { setMeter, setCAAD, setBATCH  } = meterSlice.actions;
export default meterSlice.reducer;