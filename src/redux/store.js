//import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customer/customerSlice";
import authReducer from "./auth/authSlice";
import { authApi } from "./services/auth/authService";
import { customerService } from "./services/customer/customerService";


const store = configureStore({
    reducer: {
        customer: customerSlice.reducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [customerService.reducerPath]: customerService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, customerService.middleware),
});
  

export default store;





// const reducer = combineReducers({
//     dashboard: DashboardReducer,
//     customer: customerSlice,
// });

//const store = configureStore({reducer});