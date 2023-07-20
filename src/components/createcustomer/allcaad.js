import React,  {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import { notify } from '../../utils/notify';
import { useGetSingleCAADQuery } from '../../redux/services/meter/meterService';
import { setCAAD } from '../../redux/services/meter/meterSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';

const ALLCAAD = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { caad } = useSelector((state) => state.meter) || [];
  const navigate = useNavigate();

  const {  data, isError, error, isFetching, isSuccess, isUninitialized, refetch} = useGetSingleCAADQuery({ pageNo: currentPage });
  
  console.log(data?.data?.single?.data);

  
  useEffect(() => {
    if(currentPage && data){
      refetch();
     dispatch(setCAAD(data?.data?.single?.data));

    }
  }, [data, currentPage, dispatch, refetch]);


  const columns = [
    { title: "AccountNo", field: "accountNo" },
    { title: "Surname", field: "surname" },
    { title: "Lastname", field: "lastname" },
    { title: "Service Center", field: "service_center" },
    { title: "Account Type", field: "accountType" },
    { title: "Trans Type", field: "transtype" },
    { title: "Effective Date", field: "effective_date" },
    { title: "Amount", field: "amount" },
  ];


  const batchcolumn = [
    { title: "BatchID", field: "id" },
    { title: "Batch Name", field: "batch_name" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Status", field: "batch_status" },
    { title: "Date Created", field: "created_at" },
  ];


  const handleActionClick = (event) => { 

  }


    return (
        <div className="row">


            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">CAAD REQUEST</h4>
                  <p className="card-description">
                  <hr/>
                 LIST OF PENDING CAAD (SINGLE) <hr/>
                  </p>

                  {isFetching ? <PageLoader /> : 

                  <DataTable 
                  data={caad}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.data?.total || 1}
                  pageSize={data?.data?.data?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionClick}
                  />

                  }
                 
                  
                </div>
              </div>
            </div>



            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">CAAD REQUEST</h4>
                  <p className="card-description">
                  <hr/>
                 LIST OF PENDING CAAD (BATCHED) <hr/>
                  </p>

                  <DataTable 
                  data={data?.data?.batch?.data}
                  columns={batchcolumn}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.data?.total || 1}
                  pageSize={data?.data?.data?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionClick}
                  />
                 
                  
                </div>
              </div>
            </div>

           




             
           




        </div>
    );
}

export default ALLCAAD;