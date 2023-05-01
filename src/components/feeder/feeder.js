import React, {Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFeederQuery } from '../../redux/services/feeder/feederService';
import { setFeeder, setDataFeeder } from './feederSlice';
import FeederCard from './feedercard';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";

const Feeder = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { feeder, feederData } = useSelector((state) => state.feeder) || [];
  const dispatch = useDispatch();
  const [selectedObject, setSelectedObject] = useState(null);

  const { type } = useParams();

  const { data, isFetching, isUninitialized, refetch } = useGetAllFeederQuery(
    { userQuery: type, pageNo: currentPage });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage && data) {
      refetch();
      dispatch(setFeeder(data?.data));
      dispatch(setDataFeeder(data?.data?.feeders?.data));
      type === "11kv Feeder" && dispatch(setDataFeeder(data?.data?.feeders?.data));
      type === "33kv Feeder" && dispatch(setDataFeeder(data?.data?.feeders?.data));
    }
  }, [data, dispatch, currentPage, refetch, type]);

  console.log(feeder);

  const handleActionClick = (feeder) => {
    setSelectedObject(feeder);
    navigate(`/details/${feeder.Assetid}`, { 
      state: { 
        rowData: feeder, 
        rowTitle: 'Feeder Information',
        rowSubTitle: feeder.F11kvFeeder_Name,
        routeName: '/feeders'
       } });
  };

  const columns = [
    { title: "Asset ID", field: "Assetid" },
    { title: "Asset Type", field: "assettype" },
    { title: "Feeder Name", field: "F11kvFeeder_Name" },
    { title: "Service Center", field: "Biz_Hub" },
    { title: "Longitude", field: "longtitude" },
    { title: "Latitude", field: "latitude" },
    { title: "Date Entered", field: "Capture DateTime" },
  ];


    return (
        <Fragment>
            <FeederCard feeder={feeder} />

            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All Feeders
             &nbsp;&nbsp;
             <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
             &nbsp;&nbsp;
                  <button type="button" class="btn btn-info btn-fw">
                  <i class="icon-cloud-upload"></i>Add Feeder
                  </button>
                  <div className="btn  btn-fw">
                  <select className="form-control">
                    <option value="">Select Feeder Type</option>
                    <option value="33kv Feeder">11kv Feeder</option>
                    <option value="11kv Feeder">33kv Feeder</option>
                  </select>
                  </div>
             </h4>

             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Feeders(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
           
             <div className="table-responsive">
             <DataTable 
                    data={feederData}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.feeders?.total || 1}
                    pageSize={data?.data?.feeders?.per_page || 1}
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

export default Feeder;