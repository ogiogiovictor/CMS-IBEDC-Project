import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dss: [],
    dssData: [],
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
            
        }

    }
});

export const {
    setDss,
    setDataDss,
} = dssSlice.actions;
export default dssSlice.reducer;