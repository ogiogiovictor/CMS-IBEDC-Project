//import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import DashboardReducer from "./dashboard/dashboardSlice";
import customerSlice from "./customer/customerSlice";
import authReducer from "./auth/authSlice";
import { authApi } from "./services/auth/authService";


const store = configureStore({
    reducer: {
        dashboard: DashboardReducer,
        customer: customerSlice.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
  

export default store;





// const reducer = combineReducers({
//     dashboard: DashboardReducer,
//     customer: customerSlice,
// });

//const store = configureStore({reducer});