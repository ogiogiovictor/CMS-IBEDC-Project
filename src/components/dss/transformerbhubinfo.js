import React, {useState, Fragment} from 'react';
import { useLocation, useNavigate   } from "react-router-dom";
import DataTable from '../datatable';
import { useSelector } from 'react-redux';
import PageLoader from "../spinner/loader";
import { useGetDTbyInBhubsQuery } from '../../redux/services/dss/dtService';

const TransformerBHubInfo = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const rowData = location.state.rowData;
    const rowTitle = location.state.rowTitle;
    const rowSubTitle = location.state.rowSubTitle;
    const routeName = location.state.routeName;
    const navigate = useNavigate();


    const { data, isFetching, isUninitialized, refetch } = useGetDTbyInBhubsQuery({ hub_name: rowSubTitle, pageNo: currentPage });

    console.log(data);

    const columns = [
        { title: "Date", field: "DATE" },
        { title: "MSNO", field: "MSNO" },
        { title: "Descr", field: "Descr" },
      ];

      const handleActionClick = (event) => {
        //This is where we drill down to customers
        console.log(event);
      }

    return (
        <Fragment> 
            
        {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">{ rowSubTitle } BUSINESS HUBS DSS</h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search DSS(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
          
             <DataTable 
                 data={data}
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
       }
   </Fragment>
    );
  

}


export default TransformerBHubInfo;