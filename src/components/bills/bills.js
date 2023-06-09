import React, {Fragment, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import BillCard from './billcards';
import { useGetAllBillsQuery } from '../../redux/services/bill/billService';
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import { setBills, setDataBills } from './billSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';
import { notify } from '../../utils/notify';


const Bills = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { bills, billData } = useSelector((state) => state.bills) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isFetching, isUninitialized, refetch, error } = useGetAllBillsQuery( 
    { pageNo: currentPage },  //{ cacheTime: 0 }
    );

    if (error) {
      console.log(error);
      notify("error", error.data.data);
      navigate(`/errorpage`);
    }
 


  useEffect(() => {
    if (data) {
      refetch();
      //dispatch(setBills(data?.data?.bills?.data)); //You are only dispatching the bills
      dispatch(setBills(data?.data));
      dispatch(setDataBills(data?.data?.bills?.data));
    }
  }, [data, dispatch, refetch]);


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


  //Searching implementation for Billing
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenFieldValue, setHiddenFieldValue] = useState('search_bills');
  const [searchLoading, setSearchLoading] = useState(false);

  //Searching...
  const [postSearch ] = useSearchAssetDTMutation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  }

  const performSearch = async (query) =>  { 
    setSearchLoading(true);
    const payload = {
      Bill: query,
      type: hiddenFieldValue
    };
   
    if(!payload.Bill){
      notify("info", "Please enter Search Parameter");
      setSearchLoading(false);
    }

    try {

      const result = await postSearch(payload).unwrap();
      dispatch(setDataBills(result.data));
      setCurrentPage(1);
      setSearchLoading(false);

    }catch(e){
      console.log(e);
      notify("error", "Error occured while searching  || " + e?.message);
      setSearchLoading(false);
    }
  }

  
    return (
        <Fragment>
            <BillCard cardData={bills}/>

            {isUninitialized  ? <PageLoader /> : ''}

            {isFetching || searchLoading ? <PageLoader /> : 
          
          <div className="row">
          <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
            <div className="card">
           <div className="card-body">
             <h4 className="card-title">Latest Bills <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button></h4>
           
             <form onSubmit={handleSearchSubmit}>
              <div class="form-group d-flex">
                        
                        <input type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        name="searching"
                        class="form-control" placeholder="Search Bills(s)..." />

                        <input type="hidden"  value={hiddenFieldValue} 
                        onChange={(e) => setHiddenFieldValue(e.target.value)}
                        class="form-control" />
                        <button type="submit" class="btn btn-danger ml-3">Search</button>
                    </div>
              </form>
             

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