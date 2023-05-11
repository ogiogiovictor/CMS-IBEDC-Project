import React, {Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetAllFeederQuery } from '../../redux/services/feeder/feederService';
import { setFeeder, setDataFeeder } from './feederSlice';
import FeederCard from './feedercard';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import Popup from '../modal/popup';
// import AddFeeder from './addfeeder';

const Feeder = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { feeder, feederData } = useSelector((state) => state.feeder) || [];
  const dispatch = useDispatch();
  const [selectedObject, setSelectedObject] = useState(null);

  const [isOpen, setIsOpen] = useState(false); // State for popup

  const { type } = useParams();

  const { data, isFetching, isUninitialized, refetch } = useGetAllFeederQuery(
    { userQuery: type, pageNo: currentPage });
  
  const navigate = useNavigate();

  const openPopup = () => {  setIsOpen(true); };
  const closePopup = () => { setIsOpen(false); };

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
    { title: "Biz Hub", field: "Biz_Hub" },
    { title: "Longitude", field: "longtitude" },
    { title: "Latitude", field: "latitude" },
    { title: "Date Entered", field: "Capture DateTime" },
  ];


  const customContent = (handleStartDateChange, handleEndDateChange, handleSubmit) => (
    <div>
      <p style={{ marginBottom: '10px' }}>
        <label>
          Start Date:
          <input type="date"  onChange={handleStartDateChange} style={{ marginLeft: '10px' }} />
        </label>
      </p>
      <p style={{ marginBottom: '10px' }}>
        <label>
          End Date:
          <input type="date"  onChange={handleEndDateChange} style={{ marginLeft: '13px' }} />
        </label>
      </p>
      <p>
        <button  className="btn btn-danger btn-xs"  type="button" onClick={handleSubmit}>
          Submit
        </button>
      </p>
    </div>
  );

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
             <Link to="/add_feeder" class="btn btn-info btn-fw">
             <i class="icon-cloud-upload"></i>Add 11KV Feeder
             </Link>
             &nbsp;&nbsp;
             <Link to="/add_thirty_feeder" class="btn btn-danger btn-fw">
             <i class="icon-cloud-upload"></i>Add 33KV Feeder
             </Link>
             </h4>

             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Feeders(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                          <button type="submit" className="btn btn-danger ml-4" onClick={openPopup}>
                          Export(excel)
                        </button>
                    </div>

                    <Popup isOpen={isOpen} onClose={closePopup} title="Advance Search" content={customContent} />

           
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