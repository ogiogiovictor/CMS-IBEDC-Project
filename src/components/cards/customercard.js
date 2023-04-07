import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './cards.css'

const changeColor = {
  color: 'black',
}

const CustomerCard = () => {

    return (
        <Fragment>
             <div className="col-md-3 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Customers By Region</h4>
                  <div className="mb-3">
                    <p className="d-flex mb-2">
                      <Link to="#" style={changeColor} >Ibadan</Link>
                      <span className="ml-auto font-weight-bold">70,0000</span>
                    </p>
                    <div className="progress progress-xs">
                      <div className="progress-bar bg-danger percentage" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="d-flex mb-2">
                    <Link to="#" style={changeColor} >Kwara</Link>
                      <span className="ml-auto font-weight-bold">116,920</span>
                    </p>
                    <div className="progress progress-xs">
                      <div className="progress-bar bg-success percentage"  role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="d-flex mb-2">
                    <Link to="#" style={changeColor}>Ogun</Link>
                      <span className="ml-auto font-weight-bold">10,000</span>
                    </p>
                    <div className="progress progress-xs">
                      <div className="progress-bar bg-primary percentage" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="d-flex mb-2">
                    <Link to="#" style={changeColor}>Oyo</Link>
                      <span className="ml-auto font-weight-bold">30,000</span>
                    </p>
                    <div className="progress progress-xs">
                      <div className="progress-bar bg-warning percentage" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="d-flex mb-2">
                    <Link to="#" style={changeColor} >Osun</Link>
                      <span className="ml-auto font-weight-bold">1999</span>
                    </p>
                    <div className="progress progress-xs">
                      <div className="progress-bar bg-danger percentage" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div>
                    <p className="d-flex mb-2">
                      <b>Total</b>
                      <span className="ml-auto font-weight-bold">12,000</span>
                    </p>
                    <div className="progress progress-xs">
                      <div className="progress-bar bg-info percentage" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Fragment>
    );
}

export default CustomerCard;