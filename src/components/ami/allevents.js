import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMytoFeedersQuery } from '../../redux/services/meter/meterService';
import { setMYTO } from '../../redux/services/ami/amiSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import EventCard from './eventcards';
import { notify } from "../../utils/notify";

const AllEvents = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { canmyamito } = useSelector((state) => state.ami) || [];
    const navigate = useNavigate();

    const { type } = useParams();
    const [updatedType, setUpdatedType] = useState(type);
    
    const { data, isError, error, isFetching, isSuccess, isUninitialized, refetch } = useGetMytoFeedersQuery({ userQuery: updatedType, pageNo: currentPage });

    console.log(canmyamito);
    console.log(data?.data?.data?.data);

   
  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }


    useEffect(() => {
        if(currentPage && data){
        //refetch();
       // dispatch(setMYTO(data?.data?.data?.data));
         let newData = data?.data?.data?.data;
         if (type) {
          if (type === '33kV Panel' || type === 'Bus Coupler' || type === 'Incomer' || type === 'Line Breaker' || type === 'MYTO' || type === 'Spare') {
            newData = newData.filter(eventloop => eventloop.AssetType === type);
          }
        }
       

       dispatch(setMYTO(newData));

        }
      }, [data, currentPage, updatedType, type, dispatch, refetch]);


      const columns = [
        { title: "Date", field: "DATE" },
        { title: "MSNO", field: "MSNO" },
        { title: "Descr", field: "Descr" },
        { title: "AssetType", field: "AssetType" },
        { title: "Consumption", field: "KWH_ABS" },
        { title: "Region", field: "Region" },
        { title: "Business Hub", field: "BusinessHub" },
        { title: "Begin Time", field: "BEGINTIME" },
        { title: "End Time", field: "ENDTIME" },
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

            { isSuccess === true ? ( <EventCard  cardData={data}  onFilterStatusChange={handleEventClick}/>) : '' }
            
            
        {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All FEEDER EVENTS  </h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search event(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
          
             <DataTable 
                 data={canmyamito}
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

export default AllEvents;