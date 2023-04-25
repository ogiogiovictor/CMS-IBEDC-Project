import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transmission: [],
    transmissionData: [],
}

const transmissionSlice = createSlice({
    name: "transmission",
    initialState,
    reducers: {

        setTransmission: (state, action) => {
            state.transmission = action.payload;
        },
            
        setDataTransmission: (state, action) => {
                state.transmissionData = action.payload;
            
        },


    }
});

export const {
    setTransmission,
    setDataTransmission,
} = transmissionSlice.actions;
export default transmissionSlice.reducer;