//import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "./dashboard/dashboardSlice";
import customerSlice from "./customer/customerSlice";


const store = configureStore({
    reducer: {
        dashboard: DashboardReducer,
        customer: customerSlice.reducer,
    }
});
  

export default store;





// const reducer = combineReducers({
//     dashboard: DashboardReducer,
//     customer: customerSlice,
// });

//const store = configureStore({reducer});