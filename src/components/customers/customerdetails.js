import React, {Fragment, useState } from 'react';
import { CustomerInfoTable } from '../createcustomer/customerinfotable';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { notify } from '../../utils/notify';
import PageLoader from "../spinner/loader";


const CustomerMoreDetails = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state.data;

  
  const goBack = () => {
    navigate('/viewcustomers')
    // window.history.back();
  };

  console.log(rowData);

    return (

        <Fragment>

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Customer Details for {rowData[0].surname?? ' '}  {rowData[0].firstname?? ''} &nbsp;&nbsp;&nbsp;
             <button className="btn btn-icons btn-rounded btn-secondary" onClick={goBack}>
             <i class="icon-action-undo"></i>
                  </button>
             </h4>
            <hr/>
             <div className="table-responsive">

                { rowData === undefined ? notify('danger', 'An error occured while fetching data') :
                <CustomerInfoTable customerInfo={rowData[0]} />
                }
                

                <hr/>
                {
                   rowData[0]?.contact_details && rowData[0]?.contact_details?.length != '' ?
                   <h4 className="card-title">Contact Details</h4> :
                   <h4 className="card-title">Meter Change Information</h4>
                }
               
               
                <hr/>
                {
                  rowData[0]?.contact_details && rowData[0]?.contact_details?.length != '' ? 
                  <CustomerInfoTable customerInfo={rowData[0]?.contact_details} /> :
                  <CustomerInfoTable customerInfo={rowData[0]?.meter_change_info} /> 
                }
                <hr/>

               
                {
                   rowData[0]?.contact_details && rowData[0]?.contact_details?.length != '' ?
                   <h4 className="card-title">Wiring</h4> :
                   <h4 className="card-title">Meter Information</h4>
                }
                <hr/>
                {
                  rowData[0]?.contact_details && rowData[0]?.contact_details?.length != '' ? 
                  <CustomerInfoTable customerInfo={rowData[0]?.wiring} /> :
                  <CustomerInfoTable customerInfo={rowData[0]?.meter_info} /> 
                }

              
                <br/>
                {
                   rowData[0]?.contact_details && rowData[0]?.contact_details?.length != ''  ? ' ' :
                   <h4 className="card-title">Meter Disconnection Section</h4> 
                }
                <hr/>
                {
                  rowData[0]?.contact_details && rowData[0]?.contact_details?.length != '' ?  '' : 
                  <CustomerInfoTable customerInfo={rowData[0]?.meter_disconnection_section} /> 
                }


            <br/>
                {
                   rowData[0]?.contact_details && rowData[0]?.contact_details?.length != ''  ? '' :
                   <h4 className="card-title">Meter Reconnection Section</h4> 
                }
                <hr/>
                {
                  rowData[0]?.contact_details && rowData[0]?.contact_details?.length != '' ?  '' : 
                  <CustomerInfoTable customerInfo={rowData[0]?.meter_reconnection} /> 
                }







                
           

             </div>
           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default CustomerMoreDetails;