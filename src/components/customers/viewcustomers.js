import React, {Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useGetNewCustomersQuery, useGetCRMDCustomerQuery } from "../../redux/services/customer/customerService";
import { useGetNewlyCapturedCustomerQuery } from '../../redux/services/crmd/crmdservice';
import { notify } from '../../utils/notify';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const ViewCustomers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: capturedCustomers, isFetching: newlyisFetchingCustomers, refetch: getRefresh, isUninitialized: 
    newlyUninitializedCustomers, isError: newlyIsError } = useGetNewlyCapturedCustomerQuery({  pageNo: currentPage });

  const { data: newCustomersData, isFetching: isNewCustomersFetching, 
    refetch: refetchNewCustomers, isUninitialized: isNewCustomersUninitialized, 
    isError: isNewCustomersError, error: mError } = useGetNewCustomersQuery();
  
  const { data: crmData } = useGetCRMDCustomerQuery({  pageNo: currentPage });

  console.log("We are checking for mssql Dcoument\n")
  console.log(capturedCustomers);

  if(crmData){
  //if(crmData.message){
    notify('success', crmData);
  }

  if(isNewCustomersError){
    console.log(mError.data);
    //notify('info', mError.data);
  }
  //console.log(newCustomersData);

  

  const columns = [
    { title: "Firstname", field: "firstname" },
    { title: "Surname", field: "surname" },
    { title: "Customer Type", field: "customer_type" },
    { title: "Region", field: "region" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Status", field: "status" },
    { title: "Captured By", field: "captured_by_name" },
  
  ];

  const columns2 = [
    { title: "Ticket", field: "ticketid" },
    { title: "AccountNo", field: "accountNo" },
    { title: "Firstname", field: "new_firstname" },
    { title: "Surname", field: "new_lastname" },
    { title: "Business Hub", field: "BUID" },
    { title: "Phone", field: "new_phone" },
    { title: "Status", field: "status" },
  ];


  const handleActionClick = ({_id}) => {
    //navigate(`/customernewdetails/${_id}`);
    const filteredData = newCustomersData?.data.filter((customer) => customer._id === _id);
    navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });
    window.scrollTo(0, 0);
  };

  const handleCustomerClick = ({_id}) => {
   // navigate(`/customernewdetails/${_id}`);
    const filteredData = crmData?.data.message.filter((customer) => customer._id === _id);
    navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });
    window.scrollTo(0, 0);
  }

  const handleViewClick = (customer) => {
    navigate(`/details/${customer.id}`, { 
      state: { 
        rowData: customer, 
        rowTitle: 'Customer Information',
        rowSubTitle: customer.Old_FullName,
        routeName: '/viewcustomers'
       } });
       window.scrollTo(0, 0);
  }

  const handleEditClick = (customer) => {
    navigate(`/edit_customers_crmd/${customer.id}`, {
      state: { 
        rowData: customer, 
        rowTitle: 'Edit Customer Information',
        rowSubTitle: customer.Old_FullName,
        routeName: '/edit_customers_crmd'+ customer.id
       } });
       window.scrollTo(0, 0);
    }
  

    return (

        <Fragment>

        {isNewCustomersUninitialized || isNewCustomersFetching ? <PageLoader /> : ''}

        {isNewCustomersError ? notify('danger', 'An error occured while fetching data') : ''}

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Pending CRMD - (Customer Record Management System)</h4>
            <hr/>
             {/* <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
             </div> */}
             <div className="table-responsive">

             {/* <DataTable 
                 data={newCustomersData?.data}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={1}
                 pageSize={1}
                 onPageChange={(page) => setCurrentPage(1)}
                 onActionClick={handleActionClick}
                />

             <br/> <hr/> 
              <h4 className="card-title">Updated CRMD (customers)</h4>
            <hr/>
              <DataTable 
                 data={crmData?.data?.message}
                 columns={columns2}
                 pagination
                 currentPage={currentPage}
                 totalCount={1}
                 pageSize={1}
                 onPageChange={(page) => setCurrentPage(1)}
                 onActionClick={handleCustomerClick}
                /> */}
              
              <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>AccountNo</th>
                      <th>MeterNo</th>
                      <th>Customer Name</th>
                      <th>Customer New Name</th>
                      <th>Account Type</th>
                      <th>Status</th>
                      <th>Captured By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {capturedCustomers && capturedCustomers?.data.map(customer => (
                      <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.AccountNo}</td>
                        <td>{customer.MeterNo}</td>
                        <td>{customer.Old_FullName}</td>
                        <td>{customer.new_surname} {customer.new_firstname}</td>
                        <td>{customer.AcountType}</td>
                        <td>
                        <label className={customer?.approval_type == '0' ? "badge badge-info" : "badge badge-success" }>
                            {customer?.approval_type}
                            </label>
                        </td>
                        <td>{customer.userid}</td>
                        <td>
                        <button className="btn btn-xs btn-outline-primary" onClick={() => handleViewClick(customer)}>
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;

                          {
                            customer?.approval_type == "Rejected"  ? 
                            (<button className="btn btn-xs btn-outline-danger" onClick={() => handleEditClick(customer)}>
                             <i class="icon-user"></i> Edit
                          </button>) : ''
                          }

                         
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> 

             </div>
           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default ViewCustomers;