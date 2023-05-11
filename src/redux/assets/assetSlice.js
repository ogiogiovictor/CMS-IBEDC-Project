import { createSlice } from "@reduxjs/toolkit";

const assetSlice = createSlice({
    name: 'asset',
    initialState: {
        asset: [],
        filterStatus: null,
    },
    reducers: {
        assetlist(state, action) {
            return state.asset = action.payload
        },

        setFilterEleven: (state, { payload }) => {
            state.filterStatus = payload;
          },


    }


});

export const assetActions = assetSlice.actions;
export default assetSlice;