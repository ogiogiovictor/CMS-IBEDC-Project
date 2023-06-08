import React, {Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllPaymentQuery } from '../../redux/services/payment/paymentService';
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import { setPayment, setDataPayment } from './paymentSlice';
import { notify } from '../../utils/notify';
import PaymentCard from './paymentcard';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";

const Payments = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { payment, paymentData } = useSelector((state) => state.payment) || [];
  const dispatch = useDispatch();

  const { data, isFetching, isUninitialized, refetch } = useGetAllPaymentQuery(
    { pageNo: currentPage });

    const navigate = useNavigate();

  useEffect(() => {
    if (currentPage && data) {
      //refetch();
      dispatch(setPayment(data?.data));
      dispatch(setDataPayment(data?.data?.payments?.data));
    }
  }, [data, dispatch, currentPage, refetch]);

  const handleActionClick = ({ FAccountNo, Token, MeterNo }) => {
    navigate(`/paymentDetails/${FAccountNo}/${Token}/${MeterNo}`);
    window.scrollTo(0, 0);
  };

  const columns = [
    { title: "Pay Date", field: "TransactionDateTime" },
    { title: "AccountNo", field: "AccountNo" },
    { title: "Meter No", field: "MeterNo" },
    { title: "Token", field: "Token" },
    { title: "Business Unit", field: "BUID" },
    { title: "Amount", field: "Amount" },
  ];


  //Implementation for Search
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenFieldValue, setHiddenFieldValue] = useState('search_payment');


  const [ postSearch, { isLoading } ] = useSearchAssetDTMutation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    postPayment(searchQuery);
  }

   //data?.data?.payments?.total  //data?.data?.payments?.meta
  console.log(data);

  const postPayment = async (query) =>  {

    const payload = {
      Payment: query,
      type: hiddenFieldValue
    };

    if(!payload.Payment){
      notify("error", "Please enter search term");
      return;
    }

    try {

      const result = await postSearch(payload).unwrap();
      refetch();
      setCurrentPage(1);
      console.log(result?.payments?.data);
      dispatch(setDataPayment(result?.payments?.data))

    }catch(e){
      console.log(e);
      notify("error", "Error occured while searching  || " + e?.message);
    }

   


  }




    return (
        <Fragment>
            <PaymentCard payCard={payment} />

            {isUninitialized ? <PageLoader /> : ''}

          {isFetching || isLoading ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Prepaid Payment
             &nbsp;&nbsp;
             <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
             </h4>

             <div class="row">
              <div class="col-md-12">
              <form onSubmit={handleSearchSubmit}>
              <div class="form-group d-flex">
                        
                        <input type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        name="searching"
                        class="form-control" placeholder="Search Payment..." />

                        <input type="hidden"  value={hiddenFieldValue} 
                        onChange={(e) => setHiddenFieldValue(e.target.value)}
                        class="form-control" />
                        <button type="submit" class="btn btn-danger ml-3">Search</button>
                    </div>
              </form>
                </div>
             </div>
           
             {/* <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Payments(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
             </div> */}

             <div className="table-responsive">
               
             <DataTable 
                    data={paymentData}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.payments?.meta.total || 1}
                    pageSize={data?.data?.payments?.meta.per_page || 1}
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

export default Payments;