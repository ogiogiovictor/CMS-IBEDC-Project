import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import DataTable from '../datatable';
import { useGetCustomersinDTByBusinessHubQuery } from '../../redux/services/dss/dtService';
import { CSVLink } from 'react-csv';


const CustomerInDT = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const rowData = location.state.rowData;
    const rowTitle = location.state.rowTitle;
    const rowSubTitle = location.state.rowSubTitle;
    const routeName = location.state.routeName;
    const navigate = useNavigate();
    const { hubName, dssID } = useParams();

    const { data, isFetching, isUninitialized, refetch } = useGetCustomersinDTByBusinessHubQuery({ hubName, dssID });


    //console.log(data?.data?.data);

    const columns = [
        { title: "AccountNo", field: "AccountNo" },
        { title: "DistributionID", field: "DistributionID" },
        { title: "BusinessHub", field: "BusinessHub" },
        { title: "Surname", field: "Surname" },
        { title: "FirstName", field: "FirstName" },
        { title: "OtherNames", field: "OtherNames" },
        { title: "AccountType", field: "AccountType" },
        { title: "Region", field: "Region" },
        
      ];

      const handleActionClick = (data) => {

      }

      const goBack = () => {
        navigate(-1);
      };


    return (
        <Fragment>

       
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">{rowTitle} &nbsp;&nbsp;
             {/* <CSVLink data={data?.data?.data} filename={"dssinbhusinesshub.csv"}> <button className="btn btn-xs btn-primary">Export to CSV</button></CSVLink>&nbsp;&nbsp; */}
             <Link onClick={goBack} class="btn btn-info btn-xs"><i class="icon-action-undo"></i></Link>
             </h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search event(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
          
               <DataTable 
                 data={data?.data?.data}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.data?.total || 1}
                 pageSize={data?.data?.data?.per_page || 1}
                 onPageChange={(page) => setCurrentPage(page)}
                 onActionClick={handleActionClick}
                />  
             </div>
           </div>

          
                
         </div>
       </div>
       
     </div>
      
   </Fragment>
    );
  

}

export default CustomerInDT;