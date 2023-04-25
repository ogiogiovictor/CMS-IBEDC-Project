import React, {Fragment, useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTransmissionQuery } from '../../redux/services/transmission/transmissionService';
import { setTransmission, setDataTransmission } from './transmissionSlice';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";

const Transmission = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { transmission, transmissionData } = useSelector((state) => state.transmission) || [];
  const dispatch = useDispatch();

  const { data, isFetching, isUninitialized, refetch } = useGetTransmissionQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      refetch();
      dispatch(setTransmission(data?.data));
      //dispatch(setDataTransmission(data?.data?.transmission_stations?.data));
    }
  }, [data, dispatch, currentPage, refetch]);

  console.log(transmission);

  const handleActionClick = ({ AssetId }) => {
   // navigate(`/transmissionDetails/${AssetId}`);
    window.scrollTo(0, 0);
  };

  const columns = [
    { title: "Asset ID", field: "Assetid" },
    { title: "TS Name", field: "TS_132KV_Name" },
    { title: "Longitude", field: "longtitude" },
    { title: "Latitude", field: "latitude" },
    { title: "Date Captured", field: "Capture DateTime" },
  ];

    return (
        <Fragment>
        
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All Transmission Station </h4>
           
             <div className="table-responsive">
             {isUninitialized ? <PageLoader /> : ''}

             <DataTable 
                    data={transmission}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.payments?.total || 1}
                    pageSize={data?.data?.payments?.per_page || 1}
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

export default Transmission;