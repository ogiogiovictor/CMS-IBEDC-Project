import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllMetersQuery } from '../../redux/services/meter/meterService';
import { setMeter } from '../../redux/services/meter/meterSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';

const Meters = () => {

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meter } = useSelector((state) => state.meter) || [];
  const [selectedObject, setSelectedObject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    { title: "TYPE", field: "type" },
    { title: "Region", field: "region" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Region", field: "Region" },
    { title: "Meter Number", field: "meter_number" },
    { title: "Latitude", field: "latitude" },
    { title: "Longitude", field: "longitude" },
  ];

  const handleActionClick = ({meter}) => {
    setSelectedObject(meter);
    navigate(`/details/${meter.id}`, { 
      state: { 
        rowData: meter, 
        rowTitle: 'Meter Information',
        rowSubTitle: meter.type,
        routeName: '/meters'
       } });
       window.scrollTo(0, 0);
     };

   

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
             <select className="form-control" name="type" required >
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
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search type(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
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