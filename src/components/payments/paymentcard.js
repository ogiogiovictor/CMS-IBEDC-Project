import React from "react";

const PaymentCard = ({ payCard }) => {
  const { ecmi_payment, ems_payment, total_payments, today_payments, spec_bills } = payCard;
  return (
    <div className="row">
      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-dark text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="icon-user icon-lg"></i>
              <div className="ml-4">
                <h4 className="font-weight-light">Postpaid Payment</h4>
                <h3 className="font-weight-light mb-3">{ ems_payment ?? 0}</h3>
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
                <h4 className="font-weight-light">Prepaid Payments</h4>
                <h3 className="font-weight-light mb-3">{ ecmi_payment ?? 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-danger text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              {/* <i className="icon-screen-desktop icon-lg"></i> */}
              <div className="ml-4">
                <h4 className="font-weight-light">This Month Payment</h4>
                <h3 className="font-weight-light mb-3">{ total_payments ?? 0}</h3>
                <small class="badge badge-primary">Spectrum Bill Payment:<br/> {spec_bills}</small>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-info text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="icon-screen-desktop icon-lg"></i>
              <div className="ml-4">
                <h4 className="font-weight-light">Today's Payments</h4>
                <h3 className="font-weight-light mb-3">{ today_payments ?? 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PaymentCard;
