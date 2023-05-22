import React from "react";

const LocationCard = () => {
  
  return (
    <>
          <div className="col-md-6 col-lg-3 grid-margin stretch-card">
            <div className="card bg-grey text-grey border-0">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="ml-1">
                    <h6 className="font-weight-light"> Business Hub</h6>
                    <p className="card-description"> 
                        <form className="forms-sample">

                        <div className="form-group">
                        <label htmlFor="surname">Add Business Huub</label>
                        <input type="text" 
                        className="form-control" 
                        name="ticketid"
                        placeholder="Enter Business Hub" required
                        />
                        <small>Business Hub Cannot be empty</small>
                        </div>

                        <button type="submit" className="btn btn-primary mr-2">
                            Submit
                        </button>
                    

                        </form>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3 grid-margin stretch-card">
            <div className="card bg-grey text-grey border-0">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="ml-1">
                    <h6 className="font-weight-light">Add Service Center</h6>
                    <p className="card-description"> 
                        <form className="forms-sample">

                        <div className="form-group">
                        <label htmlFor="surname">Service Center</label>
                        <input type="text" 
                        className="form-control" 
                        name="ticketid"
                        placeholder="Enter Service Center" required
                        />
                        <small>Service Center Cannot be empty</small>
                        </div>

                        <button type="submit" className="btn btn-danger mr-2">
                            Submit
                        </button>
                    

                        </form>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3 grid-margin stretch-card">
            <div className="card bg-grey text-grey border-0">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="ml-1">
                    <h6 className="font-weight-light">Add Region</h6>
                    <p className="card-description"> 
                        <form className="forms-sample">

                        <div className="form-group">
                        <label htmlFor="surname">Region</label>
                        <input type="text" 
                        className="form-control" 
                        name="ticketid"
                        placeholder="Enter Region" required
                        />
                        <small>Region Cannot be empty</small>
                        </div>

                        <button type="submit" className="btn btn-success mr-2">
                            Submit
                        </button>
                    

                        </form>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
    </>
  );
};

export default LocationCard;
