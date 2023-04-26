import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dss: [],
    dssData: [],
    dssInfo: null,
}

const dssSlice = createSlice({
    name: "dss",
    initialState,
    reducers: {

        setDss: (state, action) => {
            state.dss = action.payload;
        },
            
        setDataDss: (state, action) => {
                state.dssData = action.payload;
            
        },

        setDssInfo: (state, action) => {
            state.dssInfo = action.payload;
        
         }

    }
});

export const {
    setDss,
    setDataDss,
    setDssInfo,
} = dssSlice.actions;


export default dssSlice.reducer;