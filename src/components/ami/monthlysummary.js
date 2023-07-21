import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMonthlySummaryQuery } from '../../redux/services/meter/meterService';
import { setMonthlySummary } from '../../redux/services/ami/amiSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import { notify } from "../../utils/notify";

const MonthlySummary = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { summarymonthami } = useSelector((state) => state.ami) || [];
    const navigate = useNavigate();

    const { type } = useParams();
    const [updatedType, setUpdatedType] = useState(type);
    
    const { data, isError, error, isFetching, isSuccess, isUninitialized, refetch } = useGetMonthlySummaryQuery({ pageNo: currentPage });

   // console.log(canmyamito);
    console.log(data);

   
  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }


    useEffect(() => {
        if(currentPage && data){
        //refetch();
        dispatch(setMonthlySummary(data?.data));
      
        }
      }, [data, currentPage, updatedType, type, dispatch, refetch]);


      const columns = [
        { title: "Year", field: "Year" },
        { title: "Month", field: "Month" },
        { title: "MSNO", field: "MSNO" },
        { title: "Descr", field: "Descr" },
        { title: "AssetType", field: "AssetType" },
        { title: "Consumption", field: "consumption" },
        { title: "Region", field: "region" },
        { title: "Business Hub", field: "business_hub" },
        { title: "Transformer", field: "Transformer" },
      ];
    
      const handleActionClick = (event) => {
        //setSelectedObject(feeder);
        navigate(`/details/${event.MSNO}`, { 
          state: { 
            rowData: event, 
            rowTitle: 'Event Information',
            rowSubTitle: event.Transformer,
            routeName: '/all_feeders_with_myto'
           } });
           window.scrollTo(0, 0);
         };
   

        const handleEventClick = (event) => {
          console.log(event)
          const updatedType = event;
          setUpdatedType(updatedType);
        }

    return (
        <Fragment>

    
            
        {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All Events  </h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search event(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
          
             <DataTable 
                 data={summarymonthami}
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

export default MonthlySummary;