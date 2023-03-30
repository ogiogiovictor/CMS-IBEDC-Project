import { configureStore, combineReducers } from "@reduxjs/toolkit";
import DashboardReducer from "./dashboard/dashboardSlice";

const reducer = combineReducers({
    dashboard: DashboardReducer
});

const store = configureStore({reducer});

export default store;