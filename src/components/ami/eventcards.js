import React from 'react';

const EventCard = (props) => {

    //console.log(props.cardData.data.group);
  //const dtItems = props.cardData.filter(item => item.AssetType === 'DT');

  //const dtLength = dtItems.length;

    return (
        <div className="row">


        {
            props.cardData.data.group.map((event) => (
                <div className="col-md-6 col-lg-3 grid-margin stretch-card">
                <div className="card bg-dark text-white border-0">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="ml-4">
                        <h4 className="font-weight-light">{event.AssetType}</h4>
                        <h3 className="font-weight-light mb-3">{event.total}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        }

        
        
        {/* <div className="col-md-6 col-lg-3 grid-margin stretch-card">
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
        </div> */}


        {/* <div className="col-md-6 col-lg-3 grid-margin stretch-card">
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
        </div> */}

        {/* <div className="col-md-6 col-lg-3 grid-margin stretch-card">
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
        </div> */}
       
       
      </div>
    );
}

export default EventCard;
