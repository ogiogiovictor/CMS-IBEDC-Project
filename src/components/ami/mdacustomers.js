import React, {Fragment, useState} from 'react';
import AMICard from './amicards';
import { useGetAllServiceQuery } from '../../redux/services/ami/amiService';
import { setAmi } from '../../redux/services/ami/amiSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import { useSelector } from 'react-redux';


const MDACustomers = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { ami } = useSelector((state) => state.ami) || [];

  const {data, isError, isFetching, isSuccess, isUninitialized, refetch} = useGetAllServiceQuery(
    { pageNo: currentPage },  //{ cacheTime: 0 }
  );

  console.log(data)


    return (
        <Fragment>
            
            <AMICard />
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">MDA Customers
                <div className="btn  btn-fw">
                    <select className="form-control">
                        <option value="">Select Type</option>
                        <option value="Feeder">Feeder</option>
                        <option value="DT">Distribution Sub Station</option>
                        <option value="MD">MD</option>
                        <option value="NMD">NMD</option>
                    </select>
                </div>
             </h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Customer(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
               <table className="table">
                 <thead>
                   <tr>
                     <th>Date</th>
                     <th>MSNO</th>
                     <th>Begin Time</th>
                     <th>KWH_ABS</th>
                     <th>Transformer</th>
                     <th>AssetType</th>
                     <th>Status</th>
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

export default MDACustomers;