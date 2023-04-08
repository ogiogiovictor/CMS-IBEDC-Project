import { createSlice } from "@reduxjs/toolkit";

const assetSlice = createSlice({
    name: 'asset',
    initialState: {
        asset: []
    },
    reducers: {
        assetlist(state, action) {
            return state.asset = action.payload
        }


    }


});

export const assetActions = assetSlice.actions;
export default assetSlice;