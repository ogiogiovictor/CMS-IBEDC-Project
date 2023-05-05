import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ stats }) => {
  return (
    <div className="row">
      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-dark text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="icon-user icon-lg"></i>
              <div className="ml-4">
                <Link to="/customers" className="linkCards">
                  <h4 className="font-weight-light">Total Customers</h4>
                </Link>
                <h3 className="font-weight-light mb-3">
                  {stats.total_customers}
                </h3>
                <p className="mb-0 font-weight-light">All customers </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-primary text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="link-icon icon-book-open icon-user icon-lg"></i>
              <div className="ml-4">
                <Link to="/transformers" className="linkCards">
                  <h4 className="font-weight-light">Total DT</h4>
                </Link>
                <h3 className="font-weight-light mb-3">{stats.total_dss}</h3>
                <p className="mb-0 font-weight-light">
                 <Link to="/feeders">total feeders - {stats.feeder_11 + stats.feeder_33} </Link> 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-danger text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="icon-screen-desktop icon-lg"></i>
              <div className="ml-4">
                <Link to="/tickets" className="linkCards">
                  <h4 className="font-weight-light">Total Complaints</h4>
                </Link>
                <h3 className="font-weight-light mb-3">{stats.crm_tickets}</h3>
                {/* <p className="mb-0 font-weight-light">69 today</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-success text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="icon-power icon-lg"></i>
              <div className="ml-4">
                <Link to="" className="linkCards">
                  <h4 className="font-weight-light">Online Feeders</h4>
                </Link>
                <h3 className="font-weight-light mb-3">0</h3>
                <p className="mb-0 font-weight-light">Total Event - 10 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
