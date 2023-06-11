import React from "react";
import { useDispatch, useSelector  } from "react-redux";

const CustomerCard = ({ statusCard, onFilterStatusChange }) => {

  const filterStatus = useSelector((state) => state.customer.filterStatus);

  const handleCardClick = (statusCode) => {
    onFilterStatusChange(statusCode); // Pass the updated filter status to the parent component
  };

  
  return (
    <>
      <div className="row">
        {statusCard?.map((status) => (
          <div className="col-md-6 col-lg-3 grid-margin stretch-card"
          key={status.StatusCode}
          onClick={() => handleCardClick(status.StatusCode)}
          style={{ cursor: "pointer" }}
          >
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
