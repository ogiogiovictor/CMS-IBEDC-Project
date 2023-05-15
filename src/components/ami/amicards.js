import React from 'react';

const AMICard = (props) => {

  const dtItems = props.cardData.filter(item => item.AssetType === 'DT');
  const feederItem = props.cardData.filter(item => item.AssetType === 'Feeder');
  const mdItems = props.cardData.filter(item => item.AssetType === 'MD');
  const nmdItems = props.cardData.filter(item => item.AssetType === 'NMD');

  const dtLength = dtItems.length;
  const feederLength = feederItem.length;
  const mdLength = mdItems.length;
  const nmdLength = nmdItems.length;


    return (
        <div className="row">
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Total Reading</h4>
                  <h3 className="font-weight-light mb-3">{props.cardData.length ?? 0}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3 grid-margin stretch-card">
          <div className="card bg-dark text-white border-0">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <i className="link-icon icon-book-open icon-user icon-lg"></i>
                <div className="ml-4">
                  <h4 className="font-weight-light">Active AMI Feeders</h4>
                  <h3 className="font-weight-light mb-3">{feederLength ?? 0}</h3>
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
                  <h4 className="font-weight-light">Active DT Readings</h4>
                  <h3 className="font-weight-light mb-3">{ dtLength ?? 0}</h3>
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
                  <h4 className="font-weight-light">Active MD Readings</h4>
                  <h3 className="font-weight-light mb-3">{ mdLength ?? 0}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
       
       
      </div>
    );
}

export default AMICard;
