import React, {Fragment} from 'react';
import TicketCard from './ticketcard';

const CcuPerformance = () => {
    return (
        <Fragment>
        {/* <TicketCard /> */}
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">CCU Performance Report</h4>
           
             <div className="form-group d-flex">
             <button type="button" class="btn btn-info btn-fw">
                  <i class="icon-cloud-upload"></i>Download Report
                  </button>
            </div>

             <div className="table-responsive">
               <table className="table">
                 <thead>
                   <tr>
                     <th>Full Name</th>
                     <th>Email</th>
                     <th>Account Type</th>
                     <th>Total Tickets</th>
                     <th>Closed Tickets</th>
                     <th>Open Tickets</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-danger">Active</label></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-warning">Suspended</label></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-info">Inactive</label></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-success">Active</label></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-warning">Closed</label></td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>

           <div className="col-md-12">
                <nav>
                    <ul className="pagination rounded-flat pagination-success">
                      <li className="page-item"><a className="page-link" href="#"><i className="icon-arrow-left"></i></a></li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item"><a className="page-link" href="#">4</a></li>
                      <li className="page-item"><a className="page-link" href="#"><i className="icon-arrow-right"></i></a></li>
                    </ul>
                  </nav>
            </div>



         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default CcuPerformance;