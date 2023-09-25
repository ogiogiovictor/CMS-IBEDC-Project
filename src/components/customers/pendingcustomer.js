import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  useGetCRMDCustomerQuery, usePostUpdateCRMDMutation,
  useGetNewCustomersQuery, usePostUpdateNewlyCreatedMutation
} from "../../redux/services/customer/customerService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setCrmd } from "../../redux/customer/customerSlice";
import { datePicker } from '../../redux/helpers';
import { notify } from '../../utils/notify';
import DataTable from '../datatable';
import { useGetPendingApprovalQuery, useApprovePendingCRMDMutation, useRejectedPendingCRMDMutation } from '../../redux/services/crmd/crmdservice';



const PendingCustomer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { data, isFetching, refetch } = useGetCRMDCustomerQuery({ pageNo: currentPage });
  const [postUpdateCRMD,] = usePostUpdateCRMDMutation();
  const [PostUpdateNewCreated, { isLoading }] = usePostUpdateNewlyCreatedMutation();

  const { data: newCustomersData } = useGetNewCustomersQuery();

  const { data: CustomerPending, isFetching: nowIsFetching } = useGetPendingApprovalQuery({ pageNo: currentPage });
  const [postResultData] = useApprovePendingCRMDMutation();
  const [rejectResult] = useRejectedPendingCRMDMutation();

  console.log(CustomerPending);

  const { crmd } = useSelector((state) => state.customer) || [];


  const handleButtonClick = async (customer) => {
    navigate(`/details/${customer.id}`, {
      state: {
        rowData: customer,
        rowTitle: 'Customer Information',
        rowSubTitle: customer.Old_FullName,
        routeName: '/crmdetails'
      }
    });
    window.scrollTo(0, 0);
  }


  const handleApproveButton = async (id) => {
    try {
      const result = await postUpdateCRMD({ id: id, status: 'approved', userid: userInfo.id });
      refetch();
      notify("success", "CRMD Completed Approved");
    } catch (error) {
      console.error(error);
    }
  }

  const handleVerifyButton = async (id) => {
    try {
      const result = await postUpdateCRMD({ id: id, status: 'verified', userid: userInfo.id });
      refetch();
      notify("success", "CRMD Completed Verified and Completed");
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



  const newolumns = [
    { title: "ID", field: "id" },
    { title: "Date", field: "created_at" },
    { title: "AccountNo", field: "AccountNo" },
    { title: "Type", field: "AcountType" },
    { title: "Name", field: "Old_FullName" },
    { title: "Region", field: "region" },
    { title: "Bhub", field: "hub" },
    { title: "Status", field: "approval_type" },
  ];

  const handleHandlectionClick = (customer) => {

    navigate(`/details/${customer.id}`, {
      state: {
        rowData: customer,
        rowTitle: 'Customer Information',
        rowSubTitle: customer.Old_FullName,
        routeName: '/crmdetails'
      }
    });
    window.scrollTo(0, 0);


    // const filteredData = newCustomersData?.data.filter((customer) => customer._id === _id);
    // navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });

  };

  const handleHandleButtonVerify = async (data) => {

    try {
      console.log(data);

      if (userInfo && (userInfo.role === 'teamlead' || userInfo.role === 'businesshub_manager' || userInfo.role === 'admin'
        || userInfo.role === 'audit' || userInfo.role === 'billing')) {
        const requestData = {
          id: data.id,
          approval_type: data.approval_type,
          userid: userInfo.id,
          comment: `Approved By - ${userInfo.name}`,
          hub: data.hub,
          status: data.AccountNo,
        };

        const result = await postResultData(requestData);

        if (result.data) {
          notify("success", "Customer Information Successfully Reviews and Sent to BHM");
          window.location.reload(); // Reload the page
        }
        if (result.error.status == 500) {
          notify("info", result.error.data.message);
        }

      } else {
        notify("info", "Invalid user role"); // Handle the case when userInfo.role is neither 'teamlead' nor 'businesshub_manager'
      }



    } catch (error) {
      // notify("info",  error.data);
      console.log(error);
    }
  }



  const handleHandleButtonReject = async (data) => {

    try {
      console.log(data);

      if (userInfo && (userInfo.role === 'teamlead' || userInfo.role === 'businesshub_manager' || userInfo.role === 'admin'
        || userInfo.role === 'audit' || userInfo.role === 'billing')) {
        const requestData = {
          id: data.id,
          approval_type: 5,
          userid: userInfo.id,
          comment: `Rejected By - ${userInfo.name}`,
          hub: data.hub,
          status: data.AccountNo,
        };

        const result = await rejectResult(requestData);

        if (result.data) {
          notify("danger", "Customer Information Successfully Rejected");
         // window.location.reload(); // Reload the page
        }
        if (result.error.status == 500) {
          notify("info", result.error.data.message);
        }

      } else {
        notify("info", "Invalid user role"); // Handle the case when userInfo.role is neither 'teamlead' nor 'businesshub_manager'
      }



    } catch (error) {
      // notify("info",  error.data);
      console.log(error);
    }
  }




  const handleActionClick = ({ _id }) => {
    const filteredData = newCustomersData?.data.filter((customer) => customer._id === _id);
    navigate(`/customernewdetails/${_id}`, { state: { data: filteredData } });

  };


  const handleButtonVerify = async (data) => {

    try {
      const result = await PostUpdateNewCreated({ id: data._id, status: 'verified', userid: userInfo.id });

      if (result.data) {
        notify("success", "Result Verified and Completed Successfully");
        window.location.reload(); // Reload the page
      }
      if (result.error.status == 500) {
        notify("info", result.error.data.message);
      }



    } catch (error) {
      notify("info", error.data.message);
      console.log(error);
    }
  }



  const handleButtonApprove = async (data) => {

    try {
      const result = await PostUpdateNewCreated({ id: data._id, status: 'approved', userid: userInfo.id });
      refetch();
      //console.log(result)
      if (result.data) {
        notify("success", "Result Approved  Successfully");
      }
      if (result.error.status == 500) {
        notify("info", result.error.data.message);
      }


    } catch (error) {
      notify("info", error.data.message);
      console.log(error);
    }

  }


  const checkifcanApprove = (customerBUID, HubName) => {
    if (userInfo?.role == 'admin') {
      return true;
    } else if (userInfo?.role == 'businesshub_manager') {
      var level = userInfo.level.split(",");
      var businessHUB = level[1];
      if (businessHUB && businessHUB == customerBUID || businessHUB == HubName) {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }


  const checifkVerify = (customerBUID, HubName) => {
    if (userInfo?.role == 'admin') {
      return true;
    } if (userInfo?.role == 'auditor') {
      var level = userInfo.level.split(",");
      var businessHUB = level[1];
      if (businessHUB && businessHUB == customerBUID || businessHUB == HubName) {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }

  const checkifTeamLead = (customerHub, userRole) => {
    if (userInfo.role == "admin") {
      return false;
    }
    if (userInfo.role == "teamlead") {
      var level = userInfo.level.split(",");
      var userBhub = level[1];
      if (userBhub && userBhub == customerHub) {
        return true;
      }
    }
  }

  const checkifBhubManager = (customerHub, userRole) => {
    if (userInfo.role == "admin") {
      return false;
    }
    if (userInfo.role == "businesshub_manager") {
      var level = userInfo.level.split(",");
      var userBhub = level[1];
      if (userBhub && userBhub == customerHub) {
        return true;
      }
    }
  }


  const checkifAudit = (customerHub, userRole) => {

    if (userInfo.role == "admin") {
      return false;
    }
    if (userInfo.role == "audit") {
      var level = userInfo.level.split(",");
      var userBhub = level[1];
      if (userBhub && userBhub == customerHub) {
        return true;
      }
    }
  }

  const checkifBilling = (customerHub, userRole) => {

    if (userInfo.role == "admin") {
      return true;
    }
    if (userInfo.role == "billing") {
      var level = userInfo.level.split(",");
      var userBhub = level[1];
      if (userBhub && userBhub == customerHub) {
        return true;
      }
    }
  }


  const checkRejectbutton = (customerHub, userRole) => {

    var level = userInfo.level.split(",");
    var userBhub = level[1];

    if (userInfo.role == "admin" && customerHub.approval_type != "Completed") {
      return true;
    }

    if (userInfo.role == "billing") {
      if (userBhub && userBhub == customerHub && customerHub.approval_type == "Pending") {
        return true;
      }
    }

    if (userInfo.role == "businesshub_manager") {
      if (userBhub && userBhub == customerHub && customerHub.approval_type == "Reviewed By TL") {
        return true;
      }
    }

    if (userInfo.role == "audit") {
      if (userBhub && userBhub == customerHub && customerHub.approval_type == "Approved By Audit") {
        return true;
      }
    }

    if (userInfo.role == "billing") {
      if (userBhub && userBhub == customerHub && customerHub.approval_type == "Completed" || customerHub.approval_type == "Rejected" ) {
        return true;
      }
    }


  }


  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              {/* <h4 className="card-title">Pending CRMD (customers) &nbsp;
              <Link class="btn btn-xs btn-primary" to="/my_approvals">My Approvals</Link>
             </h4> */}
              {/*            
             <div class="form-group d-flex"></div>
             <hr/> */}
              <div className="table-responsive">
                {/* <table className="table">
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

                          {
                            checifkVerify(customer?.BUID, customer?.business_hub) === true ? (
                              <button onClick={() => handleVerifyButton(customer?._id)} className="btn btn-xs btn-outline-success">
                              <i class="icon-check"></i>
                              Verify
                            </button>
                            ) : ''
                          }

                         

                          {
                          checkifcanApprove(customer?.BUID, customer?.business_hub) === true ? (
                            <button onClick={() => handleApproveButton(customer?._id)} className="btn btn-xs btn-outline-danger">
                            <i class="icon-check"></i>
                            Approve
                          </button>
                          ) : ''
                          
                          }

                          
                         
                        </td>
                    </tr>
                 ))}
                 </tbody>
               </table> */}


                {/* <br/><hr/>
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
                /> */}



                <br /><hr />
                <h4 className="card-title">Pending Review/Approval(CRMD) &nbsp;&nbsp;</h4>
                <input type="text" class="form-control" placeholder="" disabled />
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>AccountNo.</th>
                      <th>Type</th>
                      <th>Customer Name</th>
                      <th>Region</th>
                      <th>Bhub</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {CustomerPending?.data?.map((customer) => (
                      <tr key={customer?.id}>
                        <td>{customer?.id}</td>
                        <td>{datePicker(customer?.created_at)}</td>
                        <td>{customer?.AccountNo}</td>
                        <td>{customer?.AcountType}</td>
                        <td>{customer?.Old_FullName} </td>
                        <td>{customer?.region}</td>
                        <td>{customer?.hub}</td>
                        <td>
                          <label className={customer?.approval_type == 'Pending' ? "badge badge-info" : "badge badge-success"}>
                            {customer?.approval_type}
                          </label>
                        </td>
                        <td>

                          <button onClick={() => handleHandlectionClick(customer)} className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button> &nbsp;

                          {
                            checkifTeamLead(customer?.hub, userInfo?.level) === true && customer.approval_type == "Pending" ? (
                              <button onClick={() => handleHandleButtonVerify(customer)} className="btn btn-xs btn-outline-success">
                                <i class="icon-check"></i>
                                Verify
                              </button>
                            ) : ''
                          }

                          {
                            checkifBhubManager(customer?.hub, userInfo?.level) === true && customer.approval_type == "Reviewed By TL" ? (
                              <button onClick={() => handleHandleButtonVerify(customer)} className="btn btn-xs btn-outline-primary">
                                <i class="icon-check"></i>
                                Approve
                              </button>
                            ) : ''
                          }


                          {
                            checkifAudit(customer?.hub, userInfo?.level) === true && customer.approval_type == "Approved By BHM" ? (
                              <button onClick={() => handleHandleButtonVerify(customer)} className="btn btn-xs btn-primary">
                                <i class="icon-check"></i>
                                Verify
                              </button>
                            ) : ''
                          }


                          {
                            checkifBilling(customer?.hub, userInfo?.level) === true && customer.approval_type == "Approved By Audit" ? (
                              <button onClick={() => handleHandleButtonVerify(customer)} className="btn btn-xs btn-outline-danger">
                                <i class="icon-check"></i>
                                Sync Record to Live
                              </button>
                            ) : ''
                          }


                          &nbsp;


                          {
                            checkRejectbutton(customer?.hub, userInfo?.level) === true ? (
                              <button onClick={() => handleHandleButtonReject(customer)} className="btn btn-xs btn-danger">
                                <i class="icon-check"></i>
                                Reject
                              </button>
                            ) : ''

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

export default PendingCustomer;