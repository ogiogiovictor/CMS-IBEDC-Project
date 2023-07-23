import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    caad: [],
    batch: [],
   
}

const caadSlice = createSlice({
    name: 'caad',
    initialState,
    reducers: {

        setCAAD(state, {payload}){
            state.caad = payload;
        },
        
        setBATCH(state, {payload}){
            state.batch = payload;
        },

       

    }
});

export const { setCAAD, setBATCH  } = caadSlice.actions;
export default caadSlice.reducer;