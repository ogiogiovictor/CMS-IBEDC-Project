import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useGetAmiEventsQuery } from '../../redux/services/ami/amiService';
import { setEvents } from '../../redux/services/ami/amiSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';

const AmiEvents = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.ami) || [];

  const {data, isError, isFetching, isSuccess, isUninitialized, refetch} = useGetAmiEventsQuery(
    { pageNo: currentPage },  
  );

  useEffect(() => {
    if(currentPage && data){
      refetch();
      dispatch(setEvents(data?.data?.ami_data?.data))
    }
  }, [data, currentPage, dispatch, refetch])

  console.log(data);
  console.log(isSuccess);

  const columns = [
    { title: "MSNO", field: "MSNO" },
    { title: "Consumption", field: "KWH_ABS" },
    { title: "AssetType", field: "AssetType" },
    { title: "Region", field: "Region" },
    { title: "Business Hub", field: "BusinessHub" },
    { title: "Begin Time", field: "SAVEDB_TIME" },
    { title: "Transformer", field: "Transformer" },
  ];

  const handleActionClick = ({MSNO}) => {
    //   navigate(`/amiDetails/${MSNO}`);
       window.scrollTo(0, 0);
     };



    return (
        <Fragment>

          {isUninitialized ? <PageLoader /> : ''}

          {!isFetching ? <PageLoader /> : 
            
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Events Analysis</h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Customer(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
             <DataTable 
                 data={events}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.ami_data?.data?.total || 1}
                 pageSize={data?.data?.ami_data?.data?.per_page || 1}
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

export default AmiEvents;