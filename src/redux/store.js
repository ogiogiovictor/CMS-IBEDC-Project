import { configureStore, combineReducers } from "@reduxjs/toolkit";
import DashboardReducer from "./dashboard/dashboardSlice";
import customerSlice from "./customer/customerSlice";


const reducer = combineReducers({
    dashboard: DashboardReducer,
    customer: customerSlice,
});
  


const store = configureStore({reducer});

export default store;