import React, {Fragment, useState, useEffect } from 'react';
import {  useGetCRMDCustomerQuery, usePostUpdateCRMDMutation } from "../../redux/services/customer/customerService";
import { useDispatch, useSelector } from "react-redux";
import { setCrmd } from "../../redux/customer/customerSlice";
import { datePicker } from '../../redux/helpers';
import { notify } from '../../utils/notify';



const PendingCustomer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { data, isFetching, refetch } = useGetCRMDCustomerQuery({  pageNo: currentPage });
    const [ postUpdateCRMD, {isLoading},  ] = usePostUpdateCRMDMutation();

    const { crmd } =  useSelector((state) => state.customer) || [];
 

    const handleButtonApprove = async (id) => {
        try {
            const result = await postUpdateCRMD({ id: id, status: 'approved', userid: userInfo.id });
            refetch();
            notify("success",  "CRMD Completed Approved");
          } catch (error) {
            console.error(error);
          }
    }

    const handleButtonVerify = async (id) => {
        try {
            const result = await postUpdateCRMD({ id: id, status: 'verified', userid: userInfo.id });
            refetch();
            notify("success",  "CRMD Completed Verified and Completed");
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        if (currentPage && data) {
          refetch();
          dispatch(setCrmd(data?.data?.message));
        }
    }, [data, dispatch, currentPage, refetch]);
    
    return (
        <Fragment>
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Pending CRMD (customers)</h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
               <table className="table">
                 <thead>
                   <tr>
                     <th>Customer Name</th>
                     <th>Account Number.</th>
                     <th>ticketid</th>
                     <th>Business Hub</th>
                     <th>created_at</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>

                 {crmd?.map((customer) => (
                    <tr key={customer?._id}>
                        <td>{customer?.new_firstname}</td>
                        <td>{customer?.accountNo}</td>
                        <td>{customer?.ticketid}</td>
                        <td>{customer?.BUID} </td>
                        <td>{datePicker(customer?.created_at)}</td>
                        <td>
                            <label className={customer?.status == 'pending' ? "badge badge-info" : "badge badge-success" }>
                            {customer?.status}
                            </label>
                            </td>
                        <td>
                       
                        <button className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;
                          <button onClick={() => handleButtonApprove(customer?._id)} className="btn btn-xs btn-outline-danger">
                            <i class="icon-check"></i>
                            Approve
                          </button>&nbsp;
                          <button onClick={() => handleButtonVerify(customer?._id)} className="btn btn-xs btn-outline-success">
                            <i class="icon-check"></i>
                            Verify
                          </button>
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

export default PendingCustomer;