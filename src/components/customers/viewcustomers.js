import React, {Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useGetNewCustomersQuery, useGetCRMDCustomerQuery } from "../../redux/services/customer/customerService";
import { notify } from '../../utils/notify';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const ViewCustomers = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  //const { data, isFetching, refetch, isUninitialized, isError } = useGetNewCustomersQuery();

  const { data: newCustomersData, isFetching: isNewCustomersFetching, 
    refetch: refetchNewCustomers, isUninitialized: isNewCustomersUninitialized, 
    isError: isNewCustomersError } = useGetNewCustomersQuery();
  
  const { data: crmData } = useGetCRMDCustomerQuery({  pageNo: currentPage });
  
  console.log(crmData);
  

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


    return (

        <Fragment>

        {isNewCustomersUninitialized || isNewCustomersFetching ? <PageLoader /> : ''}

        {isNewCustomersError ? notify('danger', 'An error occured while fetching data') : ''}

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Newly Captured (customers)</h4>
            <hr/>
             {/* <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
             </div> */}
             <div className="table-responsive">

             <DataTable 
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
                />
              
             {/* <table className="table">
                  <thead>
                    <tr>
                      <th>Firstname</th>
                      <th>Surname</th>
                      <th>Customer Type</th>
                      <th>Region</th>
                      <th>Business Hub</th>
                      <th>Status</th>
                      <th>Captured By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data?.data.map(customer => (
                      <tr key={customer._id}>
                        <td>{customer.firstname}</td>
                        <td>{customer.surname}</td>
                        <td>{customer.customer_type}</td>
                        <td>{customer.region}</td>
                        <td>{customer.business_hub}</td>
                        <td>
                        <label className={customer?.status == 'pending' ? "badge badge-info" : "badge badge-success" }>
                            {customer?.status}
                            </label>
                        </td>
                        <td>{customer.captured_by_name}</td>
                        <td>
                        <button className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}

             </div>
           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default ViewCustomers;