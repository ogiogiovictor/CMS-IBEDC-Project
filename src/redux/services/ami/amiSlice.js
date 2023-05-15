import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ami: []
}

const amiSlice = createSlice({
    name: 'ami',
    initialState,
    reducers: {

        setAmi(state, {payload}){
            state.ami = payload;
        }
    }
});

export const { setAmi  } = amiSlice.actions;
export default amiSlice.reducer;