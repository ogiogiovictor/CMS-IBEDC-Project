import React, { Fragment } from 'react';

const RecentCustomer = () => {

    return (

        <Fragment>
             <div className="row">
            <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Recent Customer</h4>

                  <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Customers(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
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
                          <td><button className="btn btn-xs btn-outline-primary">View</button></td>
                        </tr>
                        <tr>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td><label className="badge badge-warning">Suspended</label></td>
                          <td><button className="btn btn-xs btn-outline-primary">View</button></td>
                        </tr>
                        <tr>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td><label className="badge badge-info">Inactive</label></td>
                          <td><button className="btn btn-xs btn-outline-primary">View</button></td>
                        </tr>
                        <tr>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td><label className="badge badge-success">Active</label></td>
                          <td><button className="btn btn-xs btn-outline-primary">View</button></td>
                        </tr>
                        <tr>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td><label className="badge badge-warning">Closed</label></td>
                          <td><button className="btn btn-xs btn-outline-primary">View</button></td>
                        </tr>
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

export default RecentCustomer;