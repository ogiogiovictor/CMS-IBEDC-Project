import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCustomerDetailsByTypeQuery } from "../../redux/services/customer/customerService";
import { setAllCustomers } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";


const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer) || [];
  const navigate = useNavigate();

  const { data, isFetching, refetch } = useGetCustomerDetailsByTypeQuery(
    { userQuery: "postpaid", pageNo: currentPage },
    "",
    {
      pollingInterval: 900000,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setAllCustomers(data?.data?.customers.data));
    }
    if (currentPage) {
      refetch();
      dispatch(setAllCustomers(data?.data?.customers.data));
    }
  }, [data, dispatch, currentPage, refetch]);

  const handleActionClick = ({ FAccountNo, DistributionID }) => {
    navigate(`/customerinfo/${FAccountNo}/${DistributionID}`);
    window.scrollTo(0, 0);
  };

  const columns = [
    { title: "Customer Name", field: "FirstName" },
    { title: "Account Number", field: "AccountNo" },
    { title: "Customer Type", field: "AcctTypeDesc" },
    { title: "Business Hub", field: "BusinessHub" },
    { title: "Service Center", field: "service_center" },
    { title: "DSS ID", field: "UTID" },
    { title: "Status", field: "StatusCode" },
  ];

  const filteredCustomers = customers?.filter((customer) =>
    customer.FirstName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Customer Summary</h4>
              <canvas id="barChart"></canvas>
            </div>
          </div>
        </div>

        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">All Customer</h4>

              <div class="form-group d-flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Customers(s)..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary ml-3">
                  Search
                </button>
              </div>

              {isFetching ? (
                <PageLoader />
              ) : filteredCustomers?.length > 1 ? (
                <DataTable
                  data={filteredCustomers}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.customers?.total || 1}
                  pageSize={data?.data?.customers?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionClick}
                />
              ) : (
                <h4>No Customer Found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCustomers;
