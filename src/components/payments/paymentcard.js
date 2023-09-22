import React from "react";

const PaymentCard = ({ payCard }) => {
  const { prev_last_month, ecmi_payment, ems_payment, total_payments, today_payments, spec_bills, spec_bill_lastMonth, last_month_prepaid, last_month, this_month } = payCard;
  return (
    <div className="row">
      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-dark text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              {/* <i className="icon-user icon-lg"></i> */}
              <div className="ml-4">
                <h4 className="font-weight-light">Postpaid Payment { prev_last_month} </h4>
                <h3 className="font-weight-light mb-3">{ spec_bill_lastMonth ?? 0}</h3>
                <small class="badge badge-dark">For the Month { prev_last_month}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-primary text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              {/* <i className="link-icon icon-book-open icon-user icon-lg"></i> */}
              <div className="ml-4">
                <h4 className="font-weight-light">Last Prepaid Payments</h4>
                <h3 className="font-weight-light mb-3">{ last_month_prepaid ?? 0}</h3>
                <small class="badge badge-dark"></small>
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
                <h4 className="font-weight-light">Total Collection for {last_month} </h4>
                <h3 className="font-weight-light mb-3">{ total_payments ?? 0}</h3>
                <small class="badge badge-primary">Last Month Total Collection {last_month} <br/></small>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="col-md-6 col-lg-3 grid-margin stretch-card">
        <div className="card bg-info text-white border-0">
          <div className="card-body">
            <div className="d-flex align-items-center">
              {/* <i className="icon-screen-desktop icon-lg"></i> */}
              <div className="ml-4">
                <h4 className="font-weight-light">Prepaid Collection for {this_month}</h4>
                <h3 className="font-weight-light mb-3">{ today_payments ?? 0}</h3>
                <small class="badge badge-primary">This Month {this_month}</small>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PaymentCard;
