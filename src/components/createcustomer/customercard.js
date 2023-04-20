import React from "react";

const CustomerCard = ({ statusCard }) => {
  return (
    <>
      <div className="row">
        {statusCard?.map((status) => (
          <div className="col-md-6 col-lg-3 grid-margin stretch-card">
            <div className="card bg-dark text-white border-0">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="icon-user icon-lg"></i>
                  <div className="ml-4">
                    <h4 className="font-weight-light">{status.StatusCode}</h4>
                    <h3 className="font-weight-light mb-3">{status.total}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomerCard;
