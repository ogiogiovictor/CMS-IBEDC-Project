import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import NewCustomer from './components/createcustomer/newcustomer';
import PostpaidCustomer from './components/createcustomer/postpaidcustomer';
import PrepaidCustomer from './components/createcustomer/prepaidcustomer';
import Payments from './components/payments/payments';
import Bills from './components/bills/bills';
import AllCustomers from './components/customers/allcustomers';
import Transformer from './components/dss/transformers';
import Feeder from './components/feeder/feeder';
import InjectionSubStation from './components/injectionsubstation/injectionsubstation';
import Transmission from './components/transmission/transmission';
import PowerTransformer from './components/powertransformer/powertransformer';
import Poles from './components/poles/poles';
import Tickets from './components/tickets/complaints';
import Nerc from './components/tickets/nercreport';
import Crodss from './components/cro/crodss';
import Billdistribution from './components/billdistribution/billdistribution';
import Metereading from './components/metereading/metereading';
import Tracker from './components/tracker/tracker';
import Ibedcstaff from './components/staff/ibedcstaff';

const App = () =>  {
  return (
   <div className="container-scroller">
    <BrowserRouter>
      <Header />
      <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
        <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/createcustomer" element={<NewCustomer/>} />
          <Route path="/postpaid_customers" element={<PostpaidCustomer />} />
          <Route path="prepaid_customers" element={<PrepaidCustomer/>} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/allcustomers" element={<AllCustomers/>} />
          <Route path="/transformers" element={<Transformer/>} />
          <Route path="/feeders" element={<Feeder />} />
          <Route path="/injectionsubstation" element={<InjectionSubStation />} />
          <Route path="/transmission" element={<Transmission />} />
          <Route path="/powertransformer" element={<PowerTransformer />} />
          <Route path="/poles" element={<Poles />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/nerc" element={<Nerc/>} />
          <Route path="/crodss" element={<Crodss/>} />
          <Route path="/billdistribution" element={<Billdistribution/>} />
          <Route path="/metereading" element={<Metereading/>} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/ibedcstaff" element={<Ibedcstaff/>} />

        </Routes>
        <Footer/>
        </div>
        </div>
      </div>
      </BrowserRouter>
   </div>
  
  );
}

export default App;
