import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ami: [],
    events: [],
}

const amiSlice = createSlice({
    name: 'ami',
    initialState,
    reducers: {

        setAmi(state, {payload}){
            state.ami = payload;
        },

        setEvents(state, {payload}){
            state.events = payload;
        }
    }
});

export const { setAmi, setEvents  } = amiSlice.actions;
export default amiSlice.reducer;