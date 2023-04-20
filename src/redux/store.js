//import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customer/customerSlice";
import authReducer from "./auth/authSlice";
import { authApi } from "./services/auth/authService";
import { customerService } from "./services/customer/customerService";
import { billService } from "./services/bill/billService";


const store = configureStore({
    reducer: {
        customer: customerSlice,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [customerService.reducerPath]: customerService.reducer,
        [billService.reducerPath]: billService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, customerService.middleware, billService.middleware),
});
  

export default store;





// const reducer = combineReducers({
//     dashboard: DashboardReducer,
//     customer: customerSlice,
// });

//const store = configureStore({reducer});