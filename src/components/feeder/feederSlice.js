import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    feeder: [],
    feederData: [],
}



const feederSlice = createSlice({
    name: "feeder",
    initialState,
    reducers: {

        setFeeder: (state, action) => {
            state.feeder = action.payload;
        },
            
        setDataFeeder: (state, action) => {
                state.feederData = action.payload;
            
        }

    }
});

export const {
    setFeeder,
    setDataFeeder,
} = feederSlice.actions;
export default feederSlice.reducer;