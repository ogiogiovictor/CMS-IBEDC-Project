import React, { Fragment  } from 'react';
import LocationCard from './locationcard';

const Location = () => {
 
    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">LIST OF LOCATION</h4>
                  <p className="card-description">
                  <hr/>
                   All Locations By Type
                   <hr/>
                  </p>

                 
                   This is where the List goes HERE
                  
                </div>
              </div>
            </div>

            <LocationCard />

        </div>
    );
}

export default Location;