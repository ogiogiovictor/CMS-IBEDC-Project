import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const PostpaidCustomer = () => {
    return (
        <Fragment>
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Postpaid Customers</h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Customer(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>

             <div className="table-responsive">
               <table className="table">
                 <thead>
                   <tr>
                     <th>Account No</th>
                     <th>Surname</th>
                     <th>FirstName</th>
                     <th>Business Hub</th>
                     <th>Service Center</th>
                     <th>DSS Name</th>
                     <th>Status</th>
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
                     <td><Link to="/customerinfo"><button class="btn btn-xs btn-success"><i class="icon-user"></i>View</button></Link></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-warning">Suspended</label></td>
                     <td><Link to="/customerinfo"><button class="btn btn-xs btn-success"><i class="icon-user"></i>View</button></Link></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-info">Inactive</label></td>
                     <td><Link to="/customerinfo"><button class="btn btn-xs btn-success"><i class="icon-user"></i>View</button></Link></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-success">Active</label></td>
                     <td>
                      <Link to="/customerinfo"><button class="btn btn-xs btn-success"><i class="icon-user"></i>View</button></Link></td>
                   </tr>
                   <tr>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td>Jacob</td>
                     <td>53275531</td>
                     <td>12 May 2017</td>
                     <td><label className="badge badge-warning">Closed</label></td>
                     <td><Link to="/customerinfo"><button class="btn btn-xs btn-success"><i class="icon-user"></i>View</button></Link></td>
                   </tr>
                 </tbody>
               </table>
             </div>

           </div>

           <div class="col-md-12">
                <nav>
                    <ul class="pagination rounded-flat pagination-success">
                      <li class="page-item"><a class="page-link" href="#"><i class="icon-arrow-left"></i></a></li>
                      <li class="page-item active"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#">4</a></li>
                      <li class="page-item"><a class="page-link" href="#"><i class="icon-arrow-right"></i></a></li>
                    </ul>
                  </nav>
                </div>
                
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default PostpaidCustomer;