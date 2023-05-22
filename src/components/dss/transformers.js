import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link  } from "react-router-dom";
import TransformerCard from './transformercards';
import { useGetAllDistributionQuery, useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
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

  //Everything to click card and update state
  const [updatedType, setUpdatedType] = useState(type); 

  //Everything Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenFieldValue, setHiddenFieldValue] = useState('dt_asset');
  const [searchResult, setSearchResult] = useState(null);

  //console.log("type:", type);
  const { data, isFetching, isUninitialized, refetch } = useGetAllDistributionQuery(
    { userQuery: updatedType, pageNo: currentPage }
  );

  const navigate = useNavigate();

  const openPopup = () => {  setIsOpen(true); };
  const closePopup = () => { setIsOpen(false); };

  useEffect(() => {
    if (currentPage && (data || searchResult)) {
      //refetch();
      dispatch(setDss(data || searchResult));
      dispatch(setDataDss(data?.data?.allDt?.data));
      type === "Distribution Sub Station 11KV_415V" && dispatch(setDataDss(data?.data?.allDt?.data));
      type === "Distribution Sub Station 33KV_415V" && dispatch(setDataDss(data?.data?.allDt?.data));
    }
 }, [data, searchResult, dispatch, currentPage, type, updatedType, dssInfo]);

 //Handle cardclick and rerender page
  const handleTransformerClick = (elevenDt) => {
    //perform certian actions
   dispatch(setDssInfo(elevenDt));
   const updatedType = elevenDt;
   setCurrentPage(1); 
   dispatch(setDataDss([])); 
   setSelectedObject(null); 
   setUpdatedType(updatedType);
   refetch({ userQuery: updatedType }); // refetch the data with the updated type parameter
   
 }

    const handleActionClick = (data) => {
      setSelectedObject(data);
      navigate(`/details/${data.Assetid}`, { 
        state: { 
          rowData: data, 
          rowTitle: 'Asset Information',
          rowSubTitle: data.DSS_11KV_415V_Name,
          routeName: '/transformers'
         } });
    };

    const [postSearch ] = useSearchAssetDTMutation();

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      performSearch(searchQuery);
    }

    const performSearch = async (query) =>  {
        const payload = {
          searchQuery: query,
          hiddenField: hiddenFieldValue
        };

        if(!payload.searchQuery){
          return null;
        }

        try {
         
          const result = await postSearch(payload).unwrap();
          setCurrentPage(1);
          dispatch(setDataDss(result.data.allDt.data));
          dispatch(setDss(result));
          refetch();

        } catch (error) {
          console.log(error);
          // Handle any error that occurs during the search
        }
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

    console.log(dssData);

    const customContent = (handleStartDateChange, handleEndDateChange, handleBusinessHubChange, 
      handleStatus, handleFeeder, handleCustomer, handleInjection, handleEnergy, handleSubmit) => (
      <div>
        <p style={{ marginBottom: '10px' }}>
          <label>
            Start Date: &nbsp;
            <input type="date"  onChange={handleStartDateChange} style={{ marginLeft: '10px' }} />
          </label>
          &nbsp; &nbsp;
          <label>
            End Date: &nbsp;
            <input type="date"  onChange={handleEndDateChange} style={{ marginLeft: '13px' }} />
          </label>
        </p>
        <p style={{ marginBottom: '10px' }}>
          <label>
            Business Hub  &nbsp;
            <select onChange={handleBusinessHubChange} name="business_hub">
            <option value="">Select Hub</option>
                {dssData.length > 0 ? (
                  [...new Set(dssData.map(el => el.hub_name))].map(hubName => (
                    <option key={hubName} value={hubName}>{hubName}</option>
                  ))
                ) : (
                  <option value="" disabled>No data available</option>
                )}
            </select>
          </label>
          &nbsp; &nbsp;
          <label>
            Status  &nbsp;
            <select onChange={handleStatus} name="status">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            </select>
          </label>
        </p>
        <p>
          <input type="checkbox" value="add_feeder" onChange={handleFeeder}  /> Feeder &nbsp;&nbsp;
          <input type="checkbox" value="add_customers" onChange={handleCustomer} /> Customers &nbsp;&nbsp;
          <input type="checkbox" value="add_inj_station" onChange={handleInjection} /> Injection SubStation &nbsp;&nbsp;
          <input type="checkbox" value="add_energy" onChange={handleEnergy} /> Energy &nbsp;&nbsp;
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
                  &nbsp;&nbsp;
                  <Link to="/transformer_map" class="btn btn-primary btn-fw">
                  <i class="icon-cloud-upload"></i>View Map
                  </Link>
                 
                  </h4>

                  <div class="row">
                      <div class="col-md-10">
                          <form onSubmit={handleSearchSubmit}>
                            <div class="form-group d-flex">
                        
                                <input type="text" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                name="search_dss"
                                class="form-control" placeholder="Search Distribution Station..." />

                                <input type="hidden"  value={hiddenFieldValue} 
                                onChange={(e) => setHiddenFieldValue(e.target.value)}
                                class="form-control" />
                                <button type="submit" class="btn btn-primary ml-3">Search</button>
                            </div>
                          </form>
                      </div>

                      <div class="col-md-2">
                          <button type="submit" className="btn btn-danger ml-4" onClick={openPopup}>
                                Export(excel)
                          </button>
                      </div>
                  </div>

                  

                   

                  <Popup isOpen={isOpen} onClose={closePopup} title="Advance Search (DSS)" content={customContent} />

                      
                  <div className="table-responsive">
                  <DataTable 
                    data={dssData}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.allDt?.total || 1}
                    pageSize={data?.data?.allDt?.per_page || 1}
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