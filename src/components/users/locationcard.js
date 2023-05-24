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


          

       
    </>
  );
};

export default LocationCard;
