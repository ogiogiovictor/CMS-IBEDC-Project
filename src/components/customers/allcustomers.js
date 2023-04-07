import React, { Fragment } from 'react';

const AllCustomers = () => {

    return (

        <Fragment>
             <div className="row">

             <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Customer Summary</h4>
                  <canvas id="barChart"></canvas>
                </div>
              </div>
            </div>

            <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">All Customer</h4>

                  <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Customers(s)..." />
                          <button type="submit" className="btn btn-primary ml-3">Search</button>
                  </div>
                
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Customer Name</th>
                          <th>Account Number.</th>
                          <th>Customer Type</th>
                          <th>Business Hub</th>
                          <th>Service Center</th>
                          <th>DSS ID</th>
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

export default AllCustomers;