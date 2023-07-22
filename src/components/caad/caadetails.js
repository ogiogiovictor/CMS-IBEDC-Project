import React, { Fragment } from 'react';
import { useLocation, useNavigate, Link  } from "react-router-dom";



const CAADETAILS = () => {

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
                            <button onClick={handleGoBack} className="btn btn-info btn-sm">Approve</button>&nbsp;&nbsp;&nbsp;
                            <button onClick={handleGoBack} className="btn btn-danger btn-sm">Reject</button>
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
                                                <strong>Date Created:</strong> {rowData.created_at}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2}>
                                                <strong>Amount:</strong> {rowData.amount}
                                            </td>
                                            <td colSpan={2}>
                                                <strong>Remart:</strong> {rowData.remarks}
                                            </td>
                                           
                                        </tr>


                                        <hr/>
                                        <h6 className="card-title">Approvals / Comments </h6>
                                        <hr/>
                                        <tr>
                                        <td colSpan={4}>
                                            {rowData.caad_comment.map((comment, index) => ( 
                                               <table class="table-bordered table-primary">
                                                    <tr>
                                                        <td>
                                                            <strong>Approved By:</strong> {comment.approval_by}
                                                        </td>
                                                        <td>
                                                            <strong>Comment:</strong> {comment.comments}
                                                        </td>
                                                        <td>
                                                            <strong>Date:</strong> {comment.created_at}
                                                        </td>
                                                    </tr>
                                               </table>
                                            ))}
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
                                    <div>adfasd</div>
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