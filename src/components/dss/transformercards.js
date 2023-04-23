import React from 'react';

const TransformerCard = ({ dssCard }) => {
  console.log(dssCard);
  const { dtTotal, elevenDt, thirtyDt } = dssCard;
    return (
        <div className="row">
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">11kva Transformers(DT)</h4>
                  <h3 className="font-weight-light mb-3">{ elevenDt }</h3>
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
                  <h4 className="font-weight-light">33kv Transformers(DT)</h4>
                  <h3 className="font-weight-light mb-3">{ thirtyDt }</h3>
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
                  <h4 className="font-weight-light">DT By Business Hubs</h4>
                  <h3 className="font-weight-light mb-3">0</h3>
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
                  <h4 className="font-weight-light">Total</h4>
                  <h3 className="font-weight-light mb-3">{ dtTotal }</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
}

export default TransformerCard;
