import React, {Fragment, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import BillCard from './billcards';
import { useGetAllBillsQuery } from '../../redux/services/bill/billService';
import { setBills, setDataBills } from './billSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const Bills = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { bills, billData } = useSelector((state) => state.bills) || [];
  const dispatch = useDispatch();
  const { data, isFetching, isUninitialized, refetch } = useGetAllBillsQuery( 
    { pageNo: currentPage },  //{ cacheTime: 0 }
    );

  const navigate = useNavigate();


  useEffect(() => {
    if (currentPage && data) {
      refetch();
      //dispatch(setBills(data?.data?.bills?.data)); //You are only dispatching the bills
      dispatch(setBills(data?.data));
      dispatch(setDataBills(data?.data?.bills?.data));
    }
  }, [data, refetch, currentPage, dispatch]);


  const columns = [
    { title: "Bill Month", field: "BillMonthName" },
    { title: "Bill Year", field: "BillYear" },
    { title: "Account No", field: "AccountNo" },
    { title: "Customer Name", field: "CustomerName" },
    { title: "Business Hub", field: "BUName1" },
    { title: "Current Charge", field: "CurrentChgTotal" },
  ];

  const handleActionClick = ({BillID}) => {
    navigate(`/billDetails/${BillID}`);
    window.scrollTo(0, 0);
  };
  
    return (
        <Fragment>
            <BillCard cardData={bills}/>

            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 
          
          <div className="row">
          <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
            <div className="card">
           <div className="card-body">
             <h4 className="card-title">Latest Bills <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button></h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
              </div>

             <div className="table-responsive">
             <DataTable 
                 data={billData}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.bills?.total || 1}
                 pageSize={data?.data?.bills?.per_page || 1}
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

export default Bills;