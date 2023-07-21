import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ami: [],
    events: [],
    canmyamito: [],
    summarymonthami: [],
    
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
            state.canmyamito = payload;
        },

        setMonthlySummary(state, {payload}){
            state.summarymonthami = payload;
        }
    }
});

export const { setAmi, setEvents, setMYTO, setMonthlySummary  } = amiSlice.actions;
export default amiSlice.reducer;