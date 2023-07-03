import React, {Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {  useGetMyApprovalsQuery } from "../../redux/services/customer/customerService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { datePicker } from '../../redux/helpers';



const MyApprovals = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { userInfo } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { data, isFetching, refetch } = useGetMyApprovalsQuery();


    console.log(data?.message);
 

    const handleButtonClick = async (_id) => {
      // const filteredData = crmd?.filter((customer) => customer._id === _id);
      // navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });
      window.scrollTo(0, 0);
    }


    
    return (
        <Fragment>
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">My Approvals (NEW CUSTOMERS)
             </h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
               <table className="table">
                 <thead>
                   <tr>
                    
                   <th>Date</th>
                    <th>Customer Name</th>
                     <th>Customer Type</th>
                     <th>Phone</th>
                     <th>Business Hub</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>

                 {data?.message?.new_customers?.map((customer) => (
                    <tr key={customer?._id}>
                        <td>{datePicker(customer?.created_at)}</td>
                        <td>{customer?.surname} {customer?.othername}</td>
                        <td>{customer?.customer_type}</td>
                        <td>{customer?.phone}</td>
                        <td>{customer?.business_hub} </td>
                        
                        <td>
                            <label className={customer?.status == 'pending' ? "badge badge-info" : "badge badge-success" }>
                            {customer?.status}
                            </label>
                            </td>
                        <td>
                       
                        <button onClick={() => handleButtonClick(customer?._id)} className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;
                         
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

          <br/><hr/>

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">My Approvals (UPDATED CUSTOMERS)
             </h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
               <table className="table">
                 <thead>
                   <tr>
                    
                   <th>Date</th>
                    <th>Customer Name</th>
                     <th>Account No</th>
                     <th>Ticket ID</th>
                     <th>Business Hub</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>

                 {data?.message?.updated_customer?.map((customer) => (
                    <tr key={customer?._id}>
                        <td>{datePicker(customer?.created_at)}</td>
                        <td>{customer?.new_firstname} {customer?.new_lastname}</td>
                        <td>{customer?.accountNo}</td>
                        <td>{customer?.ticketid}</td>
                        <td>{customer?.business_hub} </td>
                        
                        <td>
                            <label className={customer?.status == 'pending' ? "badge badge-info" : "badge badge-success" }>
                            {customer?.status}
                            </label>
                            </td>
                        <td>
                       
                        <button onClick={() => handleButtonClick(customer?._id)} className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;
                         
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

export default MyApprovals;