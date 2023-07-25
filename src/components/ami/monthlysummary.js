import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMonthlySummaryQuery } from '../../redux/services/meter/meterService';
import { setMonthlySummary } from '../../redux/services/ami/amiSlice';
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import EventCard from './eventcards';
import { notify } from "../../utils/notify";

const MonthlySummary = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { summarymonthami } = useSelector((state) => state.ami) || [];
    const navigate = useNavigate();

    const { type } = useParams();
    const [updatedType, setUpdatedType] = useState(type);

      //Searching implementation for Feeder
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenFieldValue, setHiddenFieldValue] = useState('search_events_summary');
    
    const { data, isError, error, isFetching, isSuccess, isUninitialized, refetch } = useGetMonthlySummaryQuery({ userQuery: updatedType, pageNo: currentPage });

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
        let newData = data?.data?.summary_data;
        if (type) {
          if (type === 'DT' || type === 'Feeder' || type === 'Non-MD' || type === 'MD' || type === 'Government/Organization') {
            newData = newData.filter(eventloop => eventloop.AssetType === type);
          }
        }
        dispatch(setMonthlySummary(newData));
        //dispatch(setMonthlySummary(data?.data?.summary_data));
      
        }
      }, [data, currentPage, updatedType, type, dispatch, refetch]);


      const columns = [
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
   
       //Searching...
      const [postSearch ] = useSearchAssetDTMutation();

      const handleSearchSubmit = (e) => {
        e.preventDefault();
        performSearch(searchQuery);
      }


      const performSearch = async (searchQuery) => {
        try {
          refetch();
          const payload = {
            MonthlyEvent: searchQuery,
            type: hiddenFieldValue
          };

          const response = await postSearch(payload);
          if (response.data) {
            notify("success", response.data.message);
            dispatch(setMonthlySummary(response.data.data));
            console.log(response.data.data);
          } else {
            notify("info", "Error, Something went wrong");
          }
        } catch (e) {
          notify("error", "Error occured while searching " + e?.message);
        }
      }


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
             <h4 className="card-title">Events Summary { new Date().getFullYear() } - {  new Date().getMonth() + 1 } </h4>
             <form onSubmit={handleSearchSubmit}>
                <div class="form-group d-flex">
                          <input type="text" 
                                  value={searchQuery} 
                                  onChange={(e) => setSearchQuery(e.target.value)} 
                                  name="searching"
                                  class="form-control" placeholder="Search By MSNO" />

                                  <input type="hidden"  value={hiddenFieldValue} 
                                  onChange={(e) => setHiddenFieldValue(e.target.value)}
                                  class="form-control" />
                                  <button type="submit" class="btn btn-danger ml-3">Search</button>
                  </div>
              </form>
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