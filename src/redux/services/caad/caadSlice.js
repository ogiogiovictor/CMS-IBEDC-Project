import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    caad: [],
    batch: [],
    mycaad: [],
    mycaadbatch: [],
   
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

        setMyCAAD(state, {payload}){
            state.mycaad = payload;
        },
        
        setMyBatchCAAD(state, {payload}){
            state.mycaadbatch = payload;
        },

       

    }
});

export const { setCAAD, setBATCH, setMyCAAD, setMyBatchCAAD  } = caadSlice.actions;
export default caadSlice.reducer;