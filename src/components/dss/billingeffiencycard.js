import React from 'react';

const BillingEfficiencyCard = ({ dtStatus }) => {
  //const { dtTotal, elevenDt, thirtyDt } = idssCard ?? 0;

  console.log(dtStatus)
    return (
        <div className="row">

          {
            dtStatus?.map((stats) => (
              <div className="col-md-6 col-lg-3 grid-margin stretch-card" key={stats.id}>
                <div className="card bg-dark text-white border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="icon-user icon-lg"></i>
                      <div className="ml-4">
                        <h4 className="font-weight-light">{stats.Status}</h4>
                        <h3 className="font-weight-light mb-3">{stats.AssetCount}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

       
      

       
      </div>
    );
}

export default BillingEfficiencyCard;
