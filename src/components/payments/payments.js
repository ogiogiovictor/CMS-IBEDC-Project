import React, {Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllPaymentQuery } from '../../redux/services/payment/paymentService';
import { setPayment, setDataPayment } from './paymentSlice';
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
     // refetch();
      dispatch(setPayment(data?.data));
      dispatch(setDataPayment(data?.data?.payments?.data));
    }
  }, [data, dispatch, currentPage, refetch]);

  const handleActionClick = ({ FAccount, Token, CSPClientID }) => {
    navigate(`/paymentDetails/${FAccount}/${Token}/${CSPClientID}`);
    window.scrollTo(0, 0);
  };

  console.log(paymentData);

  const columns = [
    { title: "Pay Date", field: "TransactionDateTime" },
    { title: "AccountNo", field: "AccountNo" },
    { title: "Meter No", field: "MeterNo" },
    { title: "Token", field: "Token" },
    { title: "Business Unit", field: "BUID" },
    { title: "Amount", field: "Amount" },
  ];


    return (
        <Fragment>
            <PaymentCard payCard={payment} />

            {isUninitialized ? <PageLoader /> : ''}

          {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">All Payment
             &nbsp;&nbsp;
             <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button>
             </h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Payments(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>

             <div className="table-responsive">
               
             <DataTable 
                    data={paymentData}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.payments?.total || 1}
                    pageSize={data?.data?.payments?.per_page || 1}
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