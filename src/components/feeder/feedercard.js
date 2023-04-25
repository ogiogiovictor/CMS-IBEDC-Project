import React from 'react';

const FeederCard = ({ feeder }) => {
  const { feeder_eleven, feeder_thirty, total_feeder } = feeder;
    return (
        <div className="row">
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">11kva Feeder</h4>
                  <h3 className="font-weight-light mb-3">{ feeder_eleven ?? 0 }</h3>
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
                  <h4 className="font-weight-light">33Kva Feeders</h4>
                  <h3 className="font-weight-light mb-3">{ feeder_thirty ?? 0}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-danger text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="link-icon icon-book-open icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Total Feeders</h4>
                  <h3 className="font-weight-light mb-3">{ total_feeder ?? 0}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
       
       
      </div>
    );
}

export default FeederCard;
