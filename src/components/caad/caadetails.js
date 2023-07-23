import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate, Link  } from "react-router-dom";
import DataTable from '../datatable';
import { useSelector } from 'react-redux';
import { useApproveCAADMutation, useRejectCAADMutation } from '../../redux/services/caad/caadService';
import { notify } from '../../utils/notify';
import { datePicker, checkStatus, formatNumbers } from '../../redux/helpers';

const CAADETAILS = () => {

    const { userInfo } = useSelector((state) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const rowData = location.state.rowData;
    const rowTitle = location.state.rowTitle;
    const rowSubTitle = location.state.rowSubTitle;
    const routeName = location.state.routeName;
    const navigate = useNavigate();


    const handleGoBack = () => {
        //navigate(-1);
        window.location.href = `${routeName}`;
      };


      const handleActionBatchClick = (rowData) => {
      
      };
      


      const columns = [
        { title: "AccountNo", field: "accountNo" },
        { title: "Surname", field: "surname" },
        { title: "Lastname", field: "lastname" },
        { title: "Business Hub", field: "business_hub" },
        { title: "Account Type", field: "accountType" },
        { title: "Trans Type", field: "transtype" },
        { title: "Effective Date", field: "effective_date" },
        { title: "Amount", field: "amount" },
        //{ title: "Status", field: "status" },
      ];



      const [ approvelCAAD ] = useApproveCAADMutation();

      const [ rejectCAAD ] = useRejectCAADMutation();
      

      //Single Approval
      const ApprovalButtons = () => {

        const handleApproval = async (id, status, role, batch_type) => {
           
            try {
                const idata = {
                    id: id,
                    status: status,
                    role: role,
                    batch_type: batch_type
                }

                const result =  await approvelCAAD(idata).unwrap();
                if(result?.data){
                    notify("success", result.message);
                    //navigate('/allcaad', { replace: true });
                }

            } catch(error){
                if(error?.data?.success === false){
                    notify("error", error.data.data);
                }
                console.log(error.data)
            }
        };


      
        const handleRejection = async (id, status, role, batch_type) => {
            try {
                const idatajected = {
                    id: id,
                    status: status,
                    role: role,
                    batch_type: batch_type
                }

                const result =  await rejectCAAD(idatajected).unwrap();
                if(result?.data){
                    notify("success", result.message);
                    navigate('/allcaad', { replace: true });
                }

            } catch(error){
                if(error?.data?.success === false){
                    notify("error", error.data.data);
                }
                console.log(error.data)
            }
        };

      
        if (rowData.batch_type === 'single') {
          if (userInfo.role === 'admin' || (userInfo.role === 'district_accountant' && rowData.status === '0') || (userInfo.role === 'businesshub_manager' && rowData.status === '1')
          || (userInfo.role === 'auditor' && rowData.status === '2')  || (userInfo.role === 'regional_manager' && rowData.status === '3')
          || (userInfo.role === 'hcs' && rowData.status === '4')  || (userInfo.role === 'cco' && rowData.status === '5')  || (userInfo.role === 'md' && rowData.status === '6')
          ) {
            return (
              <div>
                <button  onClick={() => handleApproval(rowData.id, rowData.status, userInfo.role, rowData.batch_type)} className="btn btn-info btn-sm">Approve</button>&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleRejection(rowData.id, rowData.status, userInfo.role, rowData.batch_type)} className="btn btn-danger btn-sm">Reject</button>
              </div>
            );
         }
         
        }
      
        return null; // If no buttons need to be shown, return null
      };



       //Batch Approval
       const BatchApproval = () => {
        const handleBatchApproval = async (id, status, role, batch_type, batch_id) => {
            try {
                const idata = {
                    id: id,
                    status: status,
                    role: role,
                    batch_type: batch_type,
                    batch_id: batch_id
                }

                const result =  await approvelCAAD(idata).unwrap();
                if(result?.data){
                    notify("success", result.message);
                    navigate('/allcaad', { replace: true });
                }

            } catch(error){
                if(error?.data?.success === false){
                    notify("error", error.data.data);
                }
                console.log(error.data)
            }
        };
      
        const handleBatchRejection = async (id, status, role, batch_type, batch_id) => {
            try {
                const idatajected = {
                    id: id,
                    status: status,
                    role: role,
                    batch_type: batch_type,
                    batch_id: batch_id
                }

                const result =  await rejectCAAD(idatajected).unwrap();
                if(result?.data){
                    notify("success", result.message);
                    navigate('/allcaad', { replace: true });
                }

            } catch(error){
                if(error?.data?.success === false){
                    notify("error", error.data.data);
                }
                console.log(error.data)
            }
        };
      
        if (rowData.bulk_unique_id) {
          if (userInfo.role === 'admin' || (userInfo.role === 'district_accountant' && rowData.batch_status === '0') || (userInfo.role === 'auditor' && rowData.batch_status === '1')
          || (userInfo.role === 'businesshub_manager' && rowData.batch_status === '2')  || (userInfo.role === 'regional_manager' && rowData.batch_status === '3')
          || (userInfo.role === 'md' && rowData.batch_status === '5')  || (userInfo.role === 'billing' && rowData.batch_status === '5')
          ) {
            return (
              <div>
                <button onClick={() => handleBatchApproval(rowData.id, rowData.bulk_unique_id, rowData.batch_status, userInfo.role, 'batched')} className="btn btn-info btn-sm">Approve Batch</button>&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleBatchRejection(rowData.id, rowData.bulk_unique_id, rowData.batch_status, userInfo.role, 'batched')} className="btn btn-danger btn-sm">Reject Batch</button>
              </div>
            );
         }
        }
      
        return null; // If no buttons need to be shown, return null
      };







    return (
        <Fragment>
           <div className="row profile-page">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{ rowSubTitle } 
              
             

              </h4>
              <Link onClick={handleGoBack} class="btn btn-info btn-xs"><i class="icon-action-undo"></i></Link>
                 <div class="profile-body">
                     <ul class="nav tab-switch" role="tablist">
                       <li class="nav-item">
                         <a class="nav-link active" id="user-profile-info-tab" data-toggle="pill" href="#user-profile-info" role="tab" aria-controls="user-profile-info" aria-selected="true">
                           { rowTitle }
                         </a>
                       </li>
                     </ul>

                     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div>
                        {rowData.batch_type === 'single' && <ApprovalButtons />}

                        {rowData.bulk_unique_id  && <BatchApproval />}
                           
                        </div>
                     </div>
                       
 
 
                     <div class="row">
                       <div class="col-md-12">
                         
                         <div class="tab-content tab-body" id="profile-log-switch">
 
                           <div class="tab-pane fade show active pr-3" id="user-profile-info" role="tabpanel" aria-labelledby="user-profile-info-tab">
                         
                           
                            {
                                rowData.batch_type == 'single' ? (
                                    
                                    <table className="table table-borderless w-100 mt-4">
                                    <tbody>

                                        <tr>
                                            <td>
                                                <strong>AccountNo:</strong> {rowData.accountNo}
                                            </td>
                                            <td>
                                                <strong>Surname:</strong> {rowData.surname}
                                            </td>
                                            <td>
                                                <strong>LastName:</strong> {rowData.lastname}
                                            </td>
                                            <td>
                                                <strong>OtherName:</strong> {rowData.othername}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Phone No:</strong> {rowData.phoneNo}
                                            </td>
                                            <td>
                                                <strong>Region:</strong> {rowData.region}
                                            </td>
                                            <td>
                                                <strong>Business Hub:</strong> {rowData.business_hub}
                                            </td>
                                            <td>
                                                <strong>Service Center:</strong> {rowData.service_center}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong>Account Type:</strong> {rowData.accountType}
                                            </td>
                                            <td>
                                                <strong>Meter No:</strong> {rowData.meterno}
                                            </td>
                                            <td>
                                                <strong>Billing Type:</strong> {rowData.transtype}
                                            </td>
                                            <td>
                                                <strong>Meter Reading:</strong> {rowData.meter_reading}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong>Effective Date:</strong> {rowData.effective_date}
                                            </td>
                                            <td>
                                                <strong>Batch Type:</strong> {rowData.batch_type}
                                            </td>
                                            <td>
                                                <strong>Transaction Type:</strong> {rowData.transaction_type}
                                            </td>
                                            <td>
                                                <strong>Date Created:</strong> {datePicker(rowData.created_at)}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2}>
                                                <strong>Amount:</strong> {formatNumbers(rowData.amount)}
                                            </td>
                                            <td colSpan={2}>
                                                <strong>Remart:</strong> {rowData.remarks}
                                            </td>
                                        </tr>


                                        <tr>
                                            <td colSpan={4}>
                                                <strong>Status:</strong><button className="btn btn-secondary btn-sm">{checkStatus(rowData.status)}</button> 
                                            </td>
                                        </tr>



                                        <hr/>
                                        <h6 className="card-title">Approvals / Comments </h6>
                                        <hr/>
                                        <tr>
                                        <td colSpan={4}>
                                        <table style={{ border: '1px solid #000', borderCollapse: 'collapse' }}>
                                            <tr>
                                                <th style={{ border: '1px solid #000', padding: '8px' }}>ID</th>
                                                <th style={{ border: '1px solid #000', padding: '8px' }}>Name</th>
                                                <th style={{ border: '1px solid #000', padding: '8px' }}>Comments</th>
                                                <th style={{ border: '1px solid #000', padding: '8px' }}>Date</th>
                                            </tr>
                                            {rowData.caad_comment.map((comment, index) => ( 
                                               <tr key={index}>
                                               <td style={{ border: '1px solid #000', padding: '8px' }}>{index + parseInt(1)}</td>
                                               <td style={{ border: '1px solid #000', padding: '8px' }}>{comment.approval_by}</td>
                                               <td style={{ border: '1px solid #000', padding: '8px' }}>{comment.comments}</td>
                                               <td style={{ border: '1px solid #000', padding: '8px' }}>{datePicker(comment.created_at)}</td>
                                             </tr>
                                             
                                            ))}
                                              </table>
                                        </td>
                                        </tr>
                                        


                                        <hr/>
                                        <h6 className="card-title">Uploaded File </h6>
                                        <hr/>
                                        <tr>
                                        <td colSpan={4}>
                                            {rowData.file_upload.map((file, index) => ( 
                                               <table class="table-bordered table-primary">
                                                    <tr>
                                                        <td>
                                                        <a href={`http://localhost:8000/storage/customercaad/${file.file_name}`} target="_blank" rel="noopener noreferrer">
                                                            <strong>File Name:</strong> {file.file_name}
                                                        </a>
                                                        </td>
                                                        <td>
                                                            <strong>File Type:</strong> {file.file_type}
                                                        </td>
                                                        <td>
                                                            <strong>File Size:</strong> {file.file_size}
                                                        </td>
                                                    </tr>
                                               </table>
                                            ))}
                                        </td>
                                        </tr>
                                        
                                    </tbody>
                                    </table>


                                ) : (
                                    <div>
                                        {
                                            rowData.bulk_unique_id ? (
                                                
                                                <Fragment>
                                                <div class="card-body d-flex flex-column justify-content-between">
                                                    <div>
                                                        <p class="mb-1"><span class="h4 mb-0 mr-2">Date Created </span></p>
                                                        <p class="mb-0 text-muted font-weight-light">{  rowData.created_at} </p>                        
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <p class="mb-1"><span class="h4 mb-0 mr-2">Batch Unique ID </span></p>
                                                        <p class="mb-0 text-muted font-weight-light">{  rowData.bulk_unique_id} </p>                        
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <p class="mb-1"><span class="h4 mb-0 mr-2">Batch Name </span></p>
                                                        <p class="mb-0 text-muted font-weight-light">{  rowData.batch_name} </p>                        
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <p class="mb-1"><span class="h4 mb-0 mr-2">Region </span></p>
                                                        <p class="mb-0 text-muted font-weight-light">{  rowData.region} </p>                        
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <p class="mb-1"><span class="h4 mb-0 mr-2">Business Hub </span></p>
                                                        <p class="mb-0 text-muted font-weight-light">{  rowData.business_hub} </p>                        
                                                    </div>
                                                    <br/>
                                                    <div>
                                                        <p class="mb-1"><span class="h4 mb-0 mr-2">Batch Status </span></p>
                                                        <p class="mb-0 text-muted font-weight-light"><button className="btn btn-secondary btn-sm"> {checkStatus(rowData.batch_status)}</button> </p>                        
                                                    </div>
                                                </div>
                                                <hr/>
                                                    <DataTable 
                                                    data={rowData.withmanycaads}
                                                    columns={columns}
                                                    pagination
                                                    currentPage={1}
                                                    totalCount={rowData.withmanycaads.length || 1}
                                                    pageSize={rowData.withmanycaads.length || 1}
                                                    onPageChange={(page) => setCurrentPage(page)}
                                                    onActionClick={handleActionBatchClick}
                                                    />

                                                </Fragment>

                                               

                                         
                                            ) :
                                             
                                            (
                                                <div>No Batch</div>
                                            )
                                        }
                                    </div>
                                )
                            }

                             {/* <CustomerInfoTable customerInfo={rowData} /> */}
                          
 
 
                           </div>
 
                             
 
                       
                       </div>
 
 
                      
                     </div>
                      </div>
 
 
            </div>
 
                 
          </div>
        </div>
        
      </div>
      </div>
        </Fragment>
    )
}


export default CAADETAILS;