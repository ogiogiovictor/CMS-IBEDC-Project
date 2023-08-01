import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import { notify } from '../../utils/notify';
import { useGetmyCAADQuery } from '../../redux/services/caad/caadService';
import { setMyCAAD, setMyBatchCAAD } from '../../redux/services/caad/caadSlice';
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const MYCAAD = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { mycaad, mycaadbatch } = useSelector((state) => state.caad) || [];
  const navigate = useNavigate();

    //Everything Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [hiddenFieldValue, setHiddenFieldValue] = useState('mycaads');

  const {  data, isError, error, isFetching, isSuccess, isUninitialized, refetch} = useGetmyCAADQuery({ pageNo: currentPage });
  


  // console.log(mycaad);
  // console.log(data?.data?.single?.data);
  

  if (isError) {
    notify("error", error?.data?.data || "An error occurred");
  }

  
  useEffect(() => {
    if(currentPage && data){
      refetch();
     dispatch(setMyCAAD(data?.data?.single?.data));
     dispatch(setMyBatchCAAD(data?.data?.batch?.data));

    }
  }, [data, currentPage, dispatch, refetch]);


  const columns = [
    { title: "ID", field: "id" },
    { title: "AccountNo", field: "accountNo" },
    { title: "Surname", field: "surname" },
    { title: "Lastname", field: "lastname" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Account Type", field: "accountType" },
    { title: "Trans Type", field: "transtype" },
    { title: "Effective Date", field: "effective_date" },
    { title: "Amount", field: "amount" },
    // { title: "Status", field: "status" },
  ];

  

  const batchcolumn = [
    { title: "BatchID", field: "id" },
    { title: "Batch Name", field: "batch_name" },
    { title: "Business Hub", field: "business_hub" },
    { title: "TotalCount", field: "withmanycaads_count" },
    { title: "Comments", field: "withmayncomments_count" },
   // { title: "Status", field: "batch_status" },
    { title: "Date Created", field: "created_at" },
  ];


  const handleActionBatchClick = (mycaadbatch) => { 
    navigate(`/caadetails/${mycaadbatch.bulk_unique_id}/${mycaadbatch.id}`, { 
      state: { 
        rowData: mycaadbatch, 
        rowTitle: 'CAAD Information (Batch)',
        rowSubTitle: mycaadbatch.batch_name,
        routeName: '/caads'
       }});
  }


  const handleActionSingleClick = (mycaad) => { 
    navigate(`/caadetails/${mycaad.batch_type}/${mycaad.id}`, { 
      state: { 
        rowData: mycaad, 
        rowTitle: `CAAD Information (${mycaad.batch_type})`,
        rowSubTitle: mycaad.batch_name,
        routeName: '/caads'
       }});

  }


  const [postSearch ] = useSearchAssetDTMutation();


  const handleSearchSubmit = (e) => {
    e.preventDefault();
   performSearch(searchQuery);
  }


  const performSearch = async (searchQuery) =>  {
    const payload = {
      caad: searchQuery,
      type: hiddenFieldValue
    };

    if(!payload.caad){
      notify("error", "Please search for a CAAD..");
      return null;
    }

    try {
         
      const result = await postSearch(payload).unwrap();
      console.log(result)
      setCurrentPage(1);
      dispatch(setMyCAAD(result));

    } catch (error) {
      notify("error", error.data);
      console.log(error.data);
      // Handle any error that occurs during the search
    }

  }




    return (
        <div className="row">


            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                <h4 className="card-title">MY CAAD REQUEST &nbsp;
             <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
             </h4>


             <div class="row">
                      <div class="col-md-12">
                          <form onSubmit={handleSearchSubmit}>
                            <div class="form-group d-flex">
                        
                            <input type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            name="search_caad"
                              className="form-control" placeholder="Search CAAD..." />

                              <input type="hidden"  value={hiddenFieldValue} 
                              onChange={(e) => setHiddenFieldValue(e.target.value)}
                              className="form-control" />
                                <button type="submit" className="btn btn-primary ml-3">Search</button>
                            </div>
                          </form>
                      </div>

                  </div>

                  {isFetching ? <PageLoader /> : 

                  <DataTable 
                  data={mycaad}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.single?.total || 1}
                  pageSize={data?.data?.single?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionSingleClick}
                 
                  />

                  }
                 
                  
                </div>
              </div>
            </div>


          
            {/* <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                
                  <p className="card-description">
                  <hr/>
                  BATCHED REQUESTS <hr/>
                  </p>

                  {isFetching ? <PageLoader /> : 

                  <DataTable 
                  data={mycaadbatch}
                  columns={batchcolumn}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.data?.total || 1}
                  pageSize={data?.data?.data?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionBatchClick}
                  />
                }
                 
                  
                </div>
              </div>
            </div> */}

           

        </div>
    );
}

export default MYCAAD;