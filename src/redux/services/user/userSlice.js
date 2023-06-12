import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    role: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUser: (state, action) => {
            state.users = action.payload;
        },

        setRole: (state, action) => {
            state.role = action.payload;
        }

    }
});

export const {
    setUser,
    setRole,
} = userSlice.actions;
export default userSlice.reducer;