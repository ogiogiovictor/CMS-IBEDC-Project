import React from 'react';

const BillCard = ({cardData}) => {
  // /console.log(cardData);
  const { lastMonthBills, thisMonthBills, totalHighestBill, highestBilledCustomers } = cardData;
 // console.log(data.cardData.data);

    return (
        <div className="row">

          <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                {/* <i className="icon-user icon-lg"></i> */}
                <div className="ml-4">
                  <h4 className="font-weight-light">Last Month Bill</h4>
                  <h3 className="font-weight-light mb-3">{lastMonthBills ?? ''}</h3>
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
                  <h4 className="font-weight-light">This Month Bill</h4>
                  <h3 className="font-weight-light mb-3">{thisMonthBills}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      

        {/* <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-danger text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-screen-desktop icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Highest Owning Customers</h4>
                  <h3 className="font-weight-light mb-3">{totalHighestBill}</h3>
                </div>
              </div>
            </div>
          </div>
        </div> */}
       
      </div>
    );
}

export default BillCard;
