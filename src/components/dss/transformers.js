import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link  } from "react-router-dom";
import TransformerCard from './transformercards';
import { useGetAllDistributionQuery } from '../../redux/services/dss/dtService';
import { setDss, setDataDss, setDssInfo } from './transformerSlice';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import DynamicData from '../layout/dynamicData';
import Popup from '../modal/popup';

const Transformer = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { dss, dssData } = useSelector((state) => state.dss) || [];
  const dispatch = useDispatch();

  const [selectedObject, setSelectedObject] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for popup

  const dssInfo = useSelector((state) => state.dss.dssInfo);

  const { type } = useParams();

  const [updatedType, setUpdatedType] = useState(type); 

  //console.log("type:", type);
  const { data, isFetching, isUninitialized, refetch } = useGetAllDistributionQuery(
    { userQuery: updatedType, pageNo: currentPage }
  );

  const navigate = useNavigate();

  const openPopup = () => {  setIsOpen(true); };
  const closePopup = () => { setIsOpen(false); };

  useEffect(() => {
    if (currentPage && data) {
      //refetch();
      dispatch(setDss(data));
      dispatch(setDataDss(data));
      type === "Distribution Sub Station 11KV_415V" && dispatch(setDataDss(data?.data?.allDt?.data));
      type === "Distribution Sub Station 33KV_415V" && dispatch(setDataDss(data?.data?.allDt?.data));
    }
 }, [data, dispatch, currentPage, type, updatedType, dssInfo]);

  
 
  // console.log("...................checking here.............");
  console.log(data?.allDt?.data);


  const handleTransformerClick = (elevenDt) => {
    //perform certian actions
   dispatch(setDssInfo(elevenDt));
   const updatedType = elevenDt;
   setCurrentPage(1); 
   dispatch(setDataDss([])); 
   setSelectedObject(null); 
   setUpdatedType(updatedType);
   refetch({ userQuery: updatedType }); // refetch the data with the updated type parameter
  // const updatedType = elevenDt === "Distribution Sub Station 11KV_415V" ? "11KV_415V" : "33KV_415V"; // update the type with your desired format
  // console.log(updatedType);
   
 }

   
    // console.log(data.data.allDt)
    // const handleActionClick = ({Assetid}) => {
    //   navigate(`/transformerDetails/${Assetid}`);
    //   window.scrollTo(0, 0);
    // };

    const handleActionClick = (data) => {
      setSelectedObject(data);
      //navigate(`/details/${data.Assetid}`);
      navigate(`/details/${data.Assetid}`, { 
        state: { 
          rowData: data, 
          rowTitle: 'Asset Information',
          rowSubTitle: data.DSS_11KV_415V_Name,
          routeName: '/transformers'
         } });
    };


    const columns = [
      { title: "Asset ID", field: "Assetid" },
      { title: "Asset Type", field: "assettype" },
      { title: "DSS Name", field: "DSS_11KV_415V_Name" },
      { title: "Customers", field: "get_customer_count_count" },
      { title: "Longitude", field: "longtitude" },
      { title: "Latitude", field: "latitude" },
      { title: "Status", field: "Status" },
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
            <TransformerCard idssCard={dss} onFilterStatusChange={handleTransformerClick}/>

            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 

        <div>
           
             <div className="row">
            <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">All Distribution Sub Stations &nbsp;&nbsp;
                  <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
                  &nbsp;&nbsp;

                  <Link to="/add_transfomer" class="btn btn-danger btn-fw">
                  <i class="icon-cloud-upload"></i>Add Transformer
                  </Link>
                  {/* <button type="button" class="btn btn-info btn-fw">
                  <i class="icon-cloud-upload"></i>Add Distribution Station(DT)
                  </button> */}
                 
                  </h4>
                  
                  <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Distribution Station..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                          <button type="submit" className="btn btn-danger ml-4" onClick={openPopup}>
                          Export(excel)
                        </button>
                    </div>

                    <Popup isOpen={isOpen} onClose={closePopup} title="Advance Search" content={customContent} />

                      
                  <div className="table-responsive">
                  <DataTable 
                    data={dssData.allDt?.data}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.allDt?.total || 1}
                    pageSize={data?.allDt?.per_page || 1}
                    onPageChange={(page) => setCurrentPage(page)}
                    onActionClick={handleActionClick}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            </div>
        </div>
        }
        </Fragment>
    );
}

export default Transformer;