import React from 'react';

const Cards = () => {
    return (
        <div className="row">
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Total Customers</h4>
                  <h3 className="font-weight-light mb-3">3,895, 650</h3>
                  <p className="mb-0 font-weight-light">39 today's customers </p>
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
                  <h4 className="font-weight-light">Total DT</h4>
                  <h3 className="font-weight-light mb-3">37, 650</h3>
                  <p className="mb-0 font-weight-light">43,000 total feeders </p>
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
                  <h4 className="font-weight-light">Total Complaints</h4>
                  <h3 className="font-weight-light mb-3">13,149</h3>
                  <p className="mb-0 font-weight-light">69 today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-success text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-user-following icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Total Staff</h4>
                  <h3 className="font-weight-light mb-3">37, 580</h3>
                  <p className="mb-0 font-weight-light">65,456 outsourced </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Cards;
