import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllMetersQuery } from '../../redux/services/meter/meterService';
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import { setMeter } from '../../redux/services/meter/meterSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import { notify } from "../../utils/notify";

const Meters = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meter } = useSelector((state) => state.meter) || [];
  const [selectedObject, setSelectedObject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


     //Everything Search State
     const [searchQuery, setSearchQuery] = useState('');
     const [hiddenFieldValue, setHiddenFieldValue] = useState('meters');
     const [selectedType, setSelectedType] = useState("");


  const {data, isError, isFetching, isUninitialized, refetch} = useGetAllMetersQuery(
    { pageNo: currentPage },  
  );

  useEffect(() => {
    if(currentPage && data){
     // refetch();
      dispatch(setMeter(data?.data?.data))
    }
  }, [data, currentPage, dispatch])



  const columns = [
    { title: "ID", field: "id" },
    { title: "TYPE", field: "type" },
    { title: "Region", field: "region" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Meter Number", field: "meter_number" },
    { title: "Latitude", field: "latitude" },
    { title: "Longitude", field: "longitude" },
  ];

  const handleActionClick = (meter) => {
    setSelectedObject(meter);
    navigate(`/details/${meter.id}`, { 
      state: { 
        rowData: meter, 
        rowTitle: 'Meter Information',
        rowSubTitle: meter.type,
        routeName: '/all_meters'
       } });
       window.scrollTo(0, 0);
     };


  const [postSearch ] = useSearchAssetDTMutation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  }


  const performSearch = async (searchQuery) =>  {
    const payload = {
      Meters: searchQuery,
      type: hiddenFieldValue
    };

    if(!payload.Meters){
      notify("error", "Please enter a search query");
      return null;
    }

    try {
         
      const result = await postSearch(payload).unwrap();
      setCurrentPage(1);
      dispatch(setMeter(result?.data?.data))

    } catch (error) {
      notify("error", error.data.data);
      console.log(error.data.data);
      // Handle any error that occurs during the search
    }


  }


  const makeOnchangeMeters = (e) => {
    const selectedValue = e.target.value;
    setSelectedType(selectedValue);
    
    // alert(selectedValue)
  }
   

    return (
        <Fragment>

               

          {isUninitialized ? <PageLoader /> : ''}

          {isFetching ? <PageLoader /> : 
            
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Meter Installation - DSS - Feeders
             <div className="btn  btn-fw">
             <select className="form-control" name="type" required onChange={makeOnchangeMeters} >
                                <option value="">Select Type</option>
                                <option value="Distribution Sub Station 11KV_415V">Distribution Sub Station 11KV_415V</option>
                                <option value="Distribution Sub Station 33KV_415V">Distribution Sub Station 33KV_415V</option>
                                <option value="11KV Feeder">11KV Feeder</option>
                                <option value="33KV Feeder">33KV Feeder</option>
                                <option value="MD">MD</option>
                                <option value="NMD">NMD</option>
                                <option value="MDA">MDA</option>
                                </select>
                </div>
             </h4>

             <div class="row">
                      <div class="col-md-12">
                          <form onSubmit={handleSearchSubmit}>
                            <div class="form-group d-flex">
                        
                            <input type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            name="search_ticket"
                              className="form-control" placeholder="Search Meters..." />

                              <input type="hidden"  value={hiddenFieldValue} 
                              onChange={(e) => setHiddenFieldValue(e.target.value)}
                              className="form-control" />
                                <button type="submit" className="btn btn-primary ml-3">Search</button>
                            </div>
                          </form>
                      </div>

              </div>

            


             <div className="table-responsive">
             <DataTable 
                 data={meter}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.total || 1}
                 pageSize={data?.data?.per_page || 1}
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

export default Meters;