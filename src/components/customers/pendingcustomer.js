import React, {Fragment, useState, useEffect } from 'react';
import {  useGetCRMDCustomerQuery, usePostUpdateCRMDMutation, 
  useGetNewCustomersQuery, usePostUpdateNewlyCreatedMutation } from "../../redux/services/customer/customerService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setCrmd } from "../../redux/customer/customerSlice";
import { datePicker } from '../../redux/helpers';
import { notify } from '../../utils/notify';
import DataTable from '../datatable';



const PendingCustomer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { userInfo } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { data, isFetching, refetch } = useGetCRMDCustomerQuery({  pageNo: currentPage });
    const [ postUpdateCRMD,  ] = usePostUpdateCRMDMutation();
    const [ PostUpdateNewCreated, { isLoading } ] = usePostUpdateNewlyCreatedMutation();

    const { data: newCustomersData } = useGetNewCustomersQuery();

    console.log(newCustomersData?.data);

    const { crmd } =  useSelector((state) => state.customer) || [];
 

    const handleButtonClick = async (_id) => {
      const filteredData = crmd?.filter((customer) => customer._id === _id);
      navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });
      window.scrollTo(0, 0);
    }


    const handleApproveButton = async (id) => {
        try {
            const result = await postUpdateCRMD({ id: id, status: 'approved', userid: userInfo.id });
            refetch();
            notify("success",  "CRMD Completed Approved");
          } catch (error) {
            console.error(error);
          }
    }

    const handleVerifyButton = async (id) => {
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


    const columns = [
      { title: "Firstname", field: "firstname" },
      { title: "Surname", field: "surname" },
      { title: "Customer Type", field: "customer_type" },
      { title: "Region", field: "region" },
      { title: "Business Hub", field: "business_hub" },
      { title: "Status", field: "status" },
      { title: "Captured By", field: "captured_by_name" },
    
    ];

    const handleActionClick = ({_id}) => {
      const filteredData = newCustomersData?.data.filter((customer) => customer._id === _id);
      navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });
      
    };


    const handleButtonVerify = async (data) => {
     
      try {
          const result = await PostUpdateNewCreated({ id: data._id, status: 'verified', userid: userInfo.id });
          
          if(result.data){
            notify("success",  "Result Verified and Completed Successfully");
            window.location.reload(); // Reload the page
          }
          if(result.error.status == 500){
            notify("info",  result.error.data.message);
          }
         
          
         
        } catch (error) {
          notify("info",  error.data.message);
          console.log(error);
        }
      }
    


      const handleButtonApprove = async (data) => {
        
      try {
        const result = await PostUpdateNewCreated({ id: data._id, status: 'approved', userid: userInfo.id });
        refetch();
        //console.log(result)
        if(result.data){
          notify("success",  "Result Approved  Successfully");
        }
        if(result.error.status == 500){
          notify("info",  result.error.data.message);
        }
        
       
      } catch (error) {
        notify("info",  error.data.message);
        console.log(error);
      }
        
    }
      
    
    

   
    
    return (
        <Fragment>
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Pending CRMD (customers) &nbsp;
              <a class="btn btn-xs btn-primary" href="">My Approvals</a>
             </h4>
           
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
                       
                        <button onClick={() => handleButtonClick(customer?._id)} className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;

                          <button onClick={() => handleVerifyButton(customer?._id)} className="btn btn-xs btn-outline-success">
                            <i class="icon-check"></i>
                            Verify
                          </button>

                          <button onClick={() => handleApproveButton(customer?._id)} className="btn btn-xs btn-outline-danger">
                            <i class="icon-check"></i>
                            Approve
                          </button>
                         
                        </td>
                    </tr>
                 ))}
                 </tbody>
               </table>


              <hr/>
              <h4 className="card-title">Newly Created (customers) &nbsp;&nbsp;</h4>
              <input type="text" class="form-control" placeholder="" disabled />
              <DataTable 
                 data={newCustomersData?.data}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={1}
                 pageSize={1}
                 onPageChange={(page) => setCurrentPage(1)}
                 onActionClick={handleActionClick}
                 Verify
                 onVerifyClick={handleButtonVerify}
                 Approve
                 onApproveClick={handleButtonApprove}
                />

             </div>
           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default PendingCustomer;