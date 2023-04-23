//import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customer/customerSlice";
import billSlice from "../components/bills/billSlice";
import authReducer from "./auth/authSlice";
import ticketSlice from "../components/tickets/ticketSlice";
import dssSlice from "../components/dss/transformerSlice";
import { authApi } from "./services/auth/authService";
import { customerService } from "./services/customer/customerService";
import { billService } from "./services/bill/billService";
import { ticketService } from "./services/ticket/ticketService";
import { dtService } from "./services/dss/dtService";
import { fderService } from "./services/feeder/feederService";



const store = configureStore({
    reducer: {
        customer: customerSlice,
        auth: authReducer,
        bills: billSlice,
        tickets: ticketSlice,
        dss: dssSlice,
        [authApi.reducerPath]: authApi.reducer,
        [customerService.reducerPath]: customerService.reducer,
        [billService.reducerPath]: billService.reducer,
        [ticketService.reducerPath]: ticketService.reducer,
        [dtService.reducerPath]: dtService.reducer,
        [fderService.reducerPath]: fderService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        authApi.middleware, 
        customerService.middleware, 
        billService.middleware,
        ticketService.middleware,
        dtService.middleware,
        fderService
        ),
});
  

export default store;

