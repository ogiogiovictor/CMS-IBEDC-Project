import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import NewCustomer from "./components/createcustomer/newcustomer";
import Payments from "./components/payments/payments";
import Bills from "./components/bills/bills";
import AllCustomers from "./components/customers/allcustomers";
import Transformer from "./components/dss/transformers";
import Feeder from "./components/feeder/feeder";
import InjectionSubStation from "./components/injectionsubstation/injectionsubstation";
import Transmission from "./components/transmission/transmission";
import PowerTransformer from "./components/powertransformer/powertransformer";
import Poles from "./components/poles/poles";
import Tickets from "./components/tickets/complaints";
import CcuPerformance from "./components/tickets/ccuperformance";
import Nerc from "./components/tickets/nercreport";
import Crodss from "./components/cro/crodss";
import Billdistribution from "./components/billdistribution/billdistribution";
import Metereading from "./components/metereading/metereading";
import Tracker from "./components/tracker/tracker";
import Ibedcstaff from "./components/staff/ibedcstaff";
import CustomerInfo from "./components/createcustomer/customerinfo";
import Login from "./pages/auth/login";
import { LoginLayout, AdminLayout } from "./components/layout/index";
import ProtectedRoute from "./components/auth/protectedroute";
import CustomerRecord from "./components/createcustomer/crmd";
import UserObject from "./components/layout/userObject";
import BillDetails from "./components/bills/billDetails";
import TransformerDetails from "./components/dss/transformerDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicData from "./components/layout/dynamicData";
import PendingCustomer from "./components/customers/pendingcustomer";
import AddFeeder from "./components/feeder/addfeeder";
import MDACustomers from "./components/ami/mdacustomers";
import AddThirtyFeeder from "./components/feeder/addthirtyfeeder";
import AddTransformer from "./components/dss/addtransfomer";
import TransformerMap from "./components/dss/transformerMap";
import Users from "./components/users/users";
import Location from "./components/users/location";
import AddUser from "./components/users/adduser";
import AmiEvents from "./components/ami/amievents";
import ErrorPage from "./components/error/errorpage";
import NotFound from "./components/error/notfound";
import AddCustomer from "./components/createcustomer/addcustomer";
import ViewCustomers from "./components/customers/viewcustomers";
import CustomerMoreDetails from "./components/customers/customerdetails";
import AccessControl from "./components/settings/acl";
import Roles from "./components/settings/roles";
import AddMeters from "./components/meters/add_meters";
import Meters from "./components/meters/meters";
import CustomerByRegion from "./components/customers/cusstomerregion";
import BillingEfficiency from "./components/dss/billingEfficiency";
import NstsCustomers from "./components/customers/nstscustomers";
import DTBusinessHub from "./components/dss/transformerBusinessHub";
import MyApprovals from "./components/customers/myapprovals";
import EditUser from "./components/users/useredit";
import Events from "./components/ami/events";
import CAAD from "./components/createcustomer/caad";
import PROCESSFLOW from "./components/settings/process_flow";
import UPLOADCAAD from "./components/createcustomer/uploadcaad";
import ALLCAAD from "./components/createcustomer/allcaad";
import AllEvents from "./components/ami/allevents";
import MonthlySummary from "./components/ami/monthlysummary";
import CAADETAILS from "./components/caad/caadetails";
import MYCAAD from "./components/caad/mycaad";
import ChangePassword from "./components/settings/changepassword";
import ForgotPassword from "./pages/forgotpass";


const App = () => {
  return (
    <div className="container-scroller">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
          </Route>

          <Route
                  path="transformer_map"
                  element={<TransformerMap />}
                  />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/createcustomer" element={<NewCustomer />} />
              <Route path="/customers/:customerType" element={<AllCustomers />} />
              <Route path="customers/:customerType" element={<AllCustomers />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/bills" element={<Bills />} />
              <Route path="/customers" element={<AllCustomers />} />
              <Route path="/transformers" element={<Transformer />} />
              <Route path="/feeders" element={<Feeder />} />
              <Route
                path="/injectionsubstation"
                element={<InjectionSubStation />}
              />
              <Route path="/transmission" element={<Transmission />} />
              <Route path="/powertransformer" element={<PowerTransformer />} />
              <Route path="/poles" element={<Poles />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/ccuperformance" element={<CcuPerformance />} />
              <Route path="/nerc" element={<Nerc />} />
              <Route path="/crodss" element={<Crodss />} />
              <Route path="/billdistribution" element={<Billdistribution />} />
              <Route path="/metereading" element={<Metereading />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/ibedcstaff" element={<Ibedcstaff />} />
              <Route path="/crmd" element={<CustomerRecord />} />
              <Route path="/errorpage" element={<ErrorPage />} />
              <Route path="*" element={<NotFound />} /> {/* Not-found route */}
              
              <Route
                path="/customerinfo/:FAccount/:DistributionID/:AccountType/:MeterNo"
                element={<CustomerInfo />}
              />  
               <Route
                path="/paymentDetails/:FAccount/:Token/:CSPClientID"
                element={<UserObject />}
              />
              <Route
                path="/billDetails/:BillID"
                element={<BillDetails />}
              />

              <Route
                path="/transformerDetails/:Assetid"
                element={<TransformerDetails />}
              />
               <Route
                path="/details/:Assetid"
                element={<DynamicData />}
              />

              <Route
                path="/crmdetails"
                element={<PendingCustomer />}
              />

              <Route
                path="add_feeder"
                element={<AddFeeder />}
                />

                <Route
                path="mdacustomers"
                element={<MDACustomers />}
                />

                <Route
                path="amievents"
                element={<AmiEvents />}
                />

                <Route path="events" element={<Events />} />

                <Route
                  path="add_thirty_feeder"
                  element={<AddThirtyFeeder />}
                  />

                <Route
                  path="add_transfomer"
                  element={<AddTransformer />}
                  />

                <Route
                  path="allusers"
                  element={<Users />}
                  />

                <Route
                  path="locations"
                  element={<Location />}
                  />

                <Route
                  path="adduser"
                  element={<AddUser />}
                  />

                  <Route path="addcustomer" element={<AddCustomer />} />
                  <Route path="viewcustomers" element={<ViewCustomers />} />
                  <Route path="customernewdetails/:id" element={<CustomerMoreDetails />} />
                  <Route path="acl" element={<AccessControl />} />
                  <Route path="role/:id" element={<Roles />} />
                  <Route path="add_meters" element={<AddMeters />} /> 
                  <Route path="all_meters" element={<Meters />} />
                  <Route path="customer_region/:region" element={<CustomerByRegion/>} />
                  <Route path="dt_billing_efficiency" element={<BillingEfficiency />} />
                  <Route path="non_sts_customers" element={<NstsCustomers />} />
                  <Route path="dt_by_business_hub" element={<DTBusinessHub />} />
                  <Route path="my_approvals" element={<MyApprovals />} /> 
                  <Route path="edit_users/:id" element={<EditUser />} />
                  <Route path="createcaad/:customerSK" element={<CAAD />} />
                  <Route path="caad_process_flow" element={<PROCESSFLOW />} />
                  <Route path="uploadcaad" element={<UPLOADCAAD />} />
                  <Route path="allcaad" element={<ALLCAAD />} />
                  <Route path="all_feeders_with_myto" element={<AllEvents/>} />
                  <Route path="get_summary" element={<MonthlySummary />} />

                   <Route path="/caadetails/:batchid/:id" element={<CAADETAILS />} /> 
                   <Route path="caads" element={<MYCAAD/>} />

                   <Route path="/change_password" element={<ChangePassword />} />




            </Route>


            
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
