import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventsLoopQuery } from '../../redux/services/meter/meterService';
import { setEvents } from '../../redux/services/ami/amiSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import EventCard from './eventcards';
import { notify } from "../../utils/notify";

const Events = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.ami) || [];
    const navigate = useNavigate();

    const { type } = useParams();
    const [updatedType, setUpdatedType] = useState(type);
    
    const { data, isError, error, isFetching, isSuccess, isUninitialized, refetch } = useGetEventsLoopQuery({ userQuery: updatedType, pageNo: currentPage });

    console.log(type);

   
  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }


    useEffect(() => {
        if(currentPage && data){
        //  refetch();
         // dispatch(setEvents(data?.data?.ami_data?.data));
         let newData = data?.data?.ami_data?.data;
         if (type) {
          if (type === 'DT' || type === 'Feeder' || type === 'Non-MD' || type === 'MD' || type === 'Government/Organization') {
            newData = newData.filter(eventloop => eventloop.AssetType === type);
          }
        }
        console.log(updatedType)

        dispatch(setEvents(newData));

        }
      }, [data, currentPage, updatedType, type, dispatch, refetch]);


      const columns = [
        { title: "Date", field: "DATE" },
        { title: "MSNO", field: "MSNO" },
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
            routeName: '/events'
           } });
           window.scrollTo(0, 0);
         };
   

        const handleEventClick = (event) => {
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
             <h4 className="card-title">All Events  </h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search event(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
          
             <DataTable 
                 data={events}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.ami_data?.total || 1}
                 pageSize={data?.data?.ami_data?.per_page || 1}
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

export default Events;