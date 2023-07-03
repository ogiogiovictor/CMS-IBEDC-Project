import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNstsCustomersQuery } from "../../redux/services/customer/customerService";
import { setNstsCustomers  } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import { notify } from "../../utils/notify";

const NstsCustomers = () => {
  const [currentPage, setCurrentPage] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { nstscustomers } = useSelector((state) => state.customer) || [];

 // console.log(stringType);
  const { data, isFetching, refetch, error } = useGetNstsCustomersQuery();

  
  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }


  console.log(data?.data?.total);

  useEffect(() => {
    if (data) {
      dispatch(setNstsCustomers(data?.data?.data));
    }
  }, [data, dispatch, refetch, currentPage]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };


  const handleActionClick = ({  }) => {
  
    window.scrollTo(0, 0);
  };

  const columns = [
    
    { title: "Setup Date", field: "OpenDate" },
    { title: "Surname", field: "Surname" },
    { title: "FirstName", field: "FirstName" },
    { title: "Account Number", field: "AccountNo" },
    { title: "Business Hub", field: "BusinessHub" },
    { title: "MeterNo", field: "MeterNo" },
    { title: "DSS ID", field: "DistributionID" },
    { title: "Region", field: "Region" },
  ];

  


  return (
    <>
     
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> All Non STS Customers <span className="badge badge-success">{ data?.data?.total }</span></h4>

             
              <div class="row">

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

              </div>
           
               

              {isFetching ? (
                <PageLoader />
              ) : nstscustomers?.length !== 0 ? (
                <DataTable
                  data={nstscustomers}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.total || 1}
                  pageSize={data?.data?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionClick}
                />
              ) : (
                <p className="text-center">No Custom Record Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NstsCustomers;
