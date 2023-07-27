import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import { notify } from '../../utils/notify';
import { useGetmyCAADQuery } from '../../redux/services/caad/caadService';
import { setMyCAAD, setMyBatchCAAD } from '../../redux/services/caad/caadSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const MYCAAD = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { mycaad, mycaadbatch } = useSelector((state) => state.caad) || [];
  const navigate = useNavigate();

  const {  data, isError, error, isFetching, isSuccess, isUninitialized, refetch} = useGetmyCAADQuery({ pageNo: currentPage });
  
/*
  console.log(mycaad);
  console.log(data?.data?.single?.data);
  */

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
    { title: "AccountNo", field: "accountNo" },
    { title: "Surname", field: "surname" },
    { title: "Lastname", field: "lastname" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Account Type", field: "accountType" },
    { title: "Trans Type", field: "transtype" },
    { title: "Effective Date", field: "effective_date" },
    { title: "Amount", field: "amount" },
    //{ title: "Status", field: "status" },
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
        rowTitle: 'CAAD Information (Single)',
        rowSubTitle: mycaad.batch_name,
        routeName: '/caads'
       }});

  }




    return (
        <div className="row">


            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">MY CAAD REQUESTS</h4>
                  <p className="card-description">
                  <hr/>
                 SINGLE REQUESTS <hr/>
                  </p>

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



            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  {/* <h4 className="card-title">BATCHED REQUESTS</h4> */}
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
            </div>

           

        </div>
    );
}

export default MYCAAD;