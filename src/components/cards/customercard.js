import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./cards.css";

const changeColor = {
  color: "black",
};

const CustomerCard = ({ cstats }) => {
  return (
    <Fragment>
      <div className="col-md-3 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Customers By Region</h4>
            {cstats?.map(({ id, Region, total }) => (
              <div className="mb-3" key={id}>
                <p className="d-flex mb-2">
                  <Link to="#" style={changeColor}>
                    {Region}
                  </Link>
                  <span className="ml-auto font-weight-bold">{total}</span>
                </p>
                <div className="progress progress-xs">
                  <div
                    className="progress-bar bg-primary percentage"
                    role="progressbar"
                    aria-valuenow={total}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))}

            <div>
              <p className="d-flex mb-2">
                <b>Total</b>
                <span className="ml-auto font-weight-bold">12,000</span>
              </p>
              <div className="progress progress-xs">
                <div
                  className="progress-bar bg-info percentage"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerCard;
