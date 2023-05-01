import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams  } from "react-router-dom";
import TransformerCard from './transformercards';
import { useGetAllDistributionQuery } from '../../redux/services/dss/dtService';
import { setDss, setDataDss } from './transformerSlice';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import DynamicData from '../layout/dynamicData';

const Transformer = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { dss, dssData } = useSelector((state) => state.dss) || [];
  const dispatch = useDispatch();

  const [selectedObject, setSelectedObject] = useState(null);

  const { type } = useParams();
  const { data, isFetching, isUninitialized, refetch } = useGetAllDistributionQuery(
    { userQuery: type, pageNo: currentPage }
  );

  const navigate = useNavigate();

    useEffect(() => {
      if (currentPage && data) {
        refetch();
        dispatch(setDss(data?.data));
        type === "Distribution Sub Station 11KV_415V" && dispatch(setDataDss(data?.data?.allDt?.data));
        type === "Distribution Sub Station 33KV_415V" && dispatch(setDataDss(data?.data?.allDt?.data));
      }
    }, [data, dispatch, currentPage, refetch, type]);
    
   
    // console.log("...................checking here.............");
    console.log(data);
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
      { title: "Service Center", field: "DSS_11KV_415V_Owner" },
      { title: "Longitude", field: "longitude" },
      { title: "Latitude", field: "latitude" },
      { title: "Status", field: "DSS_11KV_415V_cus_profile" },
    ];

    return (

        <Fragment>
            <TransformerCard dssCard={dss} />

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
                  <button type="button" class="btn btn-info btn-fw">
                  <i class="icon-cloud-upload"></i>Add Distribution Station(DT)
                  </button>
                  <div className="btn  btn-fw">
                  <select className="form-control">
                    <option value="">Select Distribution Station Type</option>
                    <option value="Distribution Sub Station 11KV_415V">Distribution Sub Station 11KV_415V</option>
                    <option value="Distribution Sub Station 33KV_415V">Distribution Sub Station 33KV_415V</option>
                  </select>
                  </div>
                  </h4>
                  
                  <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Distribution Station..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
                      
                  <div className="table-responsive">
                  <DataTable 
                    data={data?.data?.allDt?.data}
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