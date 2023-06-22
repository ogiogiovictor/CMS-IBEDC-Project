import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dss: [],
    dssData: [],
    dssInfo: null,
    dtbilling: [],
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

        setDssInfo: (state, { payload }) => {
            state.dssInfo = payload;
        
         },
         setDTBill: (state, { payload }) => {
            state.dtbilling = payload;
        
         }

    }
});

export const {
    setDss,
    setDataDss,
    setDssInfo,
    setDTBill,
} = dssSlice.actions;


export default dssSlice.reducer;