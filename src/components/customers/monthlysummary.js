import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBillPaymentSummaryQuery } from "../../redux/services/payment/paymentService";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import { notify } from "../../utils/notify";
import { CSVLink } from 'react-csv';

const MonthlyBillPaymentSummary = () => {
  const [currentPage, setCurrentPage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const { data, isFetching, refetch, error } = useGetBillPaymentSummaryQuery();
   console.log(data);

   if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }

  
//   useEffect(() => {
//     if (data) {
//       dispatch(setBillPaymentSummary(data?.data));
//     }
//   }, [data, dispatch, refetch, currentPage]);

  const handleActionClick = () => {
    return;
  };

  const columns = [
    
    { title: "Bill Year", field: "BillYear" },
    { title: "BillMonth", field: "BillMonth" },
    // { title: "Postpaid Collection", field: "Payments" },
    { title: "Bill", field: "Bills" },
    { title: "Postpaid Payment", field: "Payment" },
    { title: "Prepaid Collection", field: "ecmiAmount" },
    { title: "Total Collection", field: "totalCollection" },
  ];

  return (
    <>
     
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> Monthly Collection / Billing </h4>
              <CSVLink data={data?.data} filename={"payment_billing_collection.csv"}> <button className="btn btn-xs btn-primary">Export Report</button></CSVLink>
             
              {/* <div class="row">

                      <div class="col-md-12">
                        <form onSubmit={handleSearchSubmit}>
                        <div className="form-group d-flex">
                            <input
                              type="hidden"
                              class="form-control"
                              name="nsts_customers"
                              value="download_nsts_customers"
                            />
                            <button type="submit" className="btn btn-primary ml-3">
                              Download CSV
                            </button>
                            </div>
                          </form>
                      </div>

              </div> */}
           
               

              {isFetching ? (
                <PageLoader />
              ) : data?.data?.length !== 0 ? (
                <DataTable
                  data={data?.data}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.total || 1}
                  pageSize={data?.data?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionClick}
                />
              ) : (
                <p className="text-center">No  Record Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );


};

export default MonthlyBillPaymentSummary;
