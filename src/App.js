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

const App = () => {
  return (
    <div className="container-scroller">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/" element={<Login />} />
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
              
              <Route
                path="/customerinfo/:FAccount/:DistributionID"
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





                 







            </Route>


            
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
