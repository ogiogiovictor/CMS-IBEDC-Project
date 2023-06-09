import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const RecentCustomer = ({ recentCustomer }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Customer</h4>

              <div class="form-group d-flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Customers(s)..."
                />
                <button type="submit" className="btn btn-primary ml-3">
                  Search
                </button>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>AccountNo</th>
                      <th>Surname</th>
                      <th>Firstname</th>
                      <th>Account Type</th>
                      <th>Business Hub</th>
                      <th>Service Center</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCustomer?.map((customer) => (
                      <tr key={customer?.CustomerSK}>
                        <td>{customer?.AccountNo}</td>
                        <td>{customer?.Surname}</td>
                        <td>{customer?.FirstName}</td>
                        <td>{customer?.AccountType}</td>
                        <td>{customer?.BusinessHub}</td>
                        <td>{customer?.service_center}</td>
                        <td>
                          <label className="badge badge-info">
                            {customer?.StatusCode}
                          </label>
                        </td>
                        <td>
                          {/* <button className="btn btn-xs btn-outline-success">
                            <i class="icon-user"></i>
                            View
                          </button> */}
                          <Link
                            className="btn btn-xs btn-success"
                            to={`/customerinfo/${customer?.FAccountNo}/${customer?.DistributionID}`}
                          >
                            <i class="icon-user"></i>
                            View
                          </Link>
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
};

export default RecentCustomer;
