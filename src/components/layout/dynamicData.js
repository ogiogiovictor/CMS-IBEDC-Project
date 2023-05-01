import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link  } from "react-router-dom";
import { CustomerInfoTable } from '../createcustomer/customerinfotable';

const DynamicData = () => {
    const { dss, dssData } = useSelector((state) => state.dss) || [];
    const location = useLocation();
    const rowData = location.state.rowData;
    const rowTitle = location.state.rowTitle;
    const rowSubTitle = location.state.rowSubTitle;
    const routeName = location.state.routeName;
    const navigate = useNavigate();

    console.log(dss);
    
    const handleGoBack = () => {
        //navigate(-1);
        window.location.href = `${routeName}`;
      };

    

    return (
       
        <div className="row profile-page">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{ rowSubTitle } </h4>
              <Link onClick={handleGoBack} class="btn btn-info btn-xs"><i class="icon-action-undo"></i></Link>
                 <div class="profile-body">
                     <ul class="nav tab-switch" role="tablist">
                       <li class="nav-item">
                         <a class="nav-link active" id="user-profile-info-tab" data-toggle="pill" href="#user-profile-info" role="tab" aria-controls="user-profile-info" aria-selected="true">
                           { rowTitle }
                         </a>
                       </li>
                      
                     </ul>
 
 
                     <div class="row">
                       <div class="col-md-12">
                         
                         <div class="tab-content tab-body" id="profile-log-switch">
 
                           <div class="tab-pane fade show active pr-3" id="user-profile-info" role="tabpanel" aria-labelledby="user-profile-info-tab">
                         
                           
                             <CustomerInfoTable customerInfo={rowData} />
                          
 
 
                           </div>
 
                             
 
                       
                       </div>
 
 
                      
                     </div>
                      </div>
 
 
            </div>
 
                 
          </div>
        </div>
        
      </div>
      </div>
    )
}

export default DynamicData;
