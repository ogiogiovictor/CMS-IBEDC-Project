import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ami: [],
    events: [],
    myto: [],
    
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
        },

        setMYTO(state, {payload}){
            state.myto = payload;
        }
    }
});

export const { setAmi, setEvents, setMYTO  } = amiSlice.actions;
export default amiSlice.reducer;