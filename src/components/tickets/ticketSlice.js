import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickets: [],
    ticketData: [],
}

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {

        setTicket: (state, action) => {
            state.tickets = action.payload;
        },
            
        setDataTicket: (state, action) => {
                state.ticketData = action.payload;
            
        }

    }
});


export const {
    setTicket,
    setDataTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;