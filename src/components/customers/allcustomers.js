import React, { useState, useMemo, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../pagination";
import { useGetCustomerDetailsByTypeQuery } from "../../redux/services/customer/customerService";
import { setAllCustomers } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";

const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customer) || [];

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
  }, [data, dispatch, currentPage]);

  console.log(currentPage);

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
                />
                <button type="submit" className="btn btn-primary ml-3">
                  Search
                </button>
              </div>

              {isFetching ? (
                <PageLoader />
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Account Number.</th>
                        <th>Customer Type</th>
                        <th>Business Hub</th>
                        <th>Service Center</th>
                        <th>DSS ID</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers?.map((c, i) => (
                        <tr key={i}>
                          <td>{c?.FirstName}</td>
                          <td>{c?.AccountNo}</td>
                          <td>{c?.AcctTypeDesc}</td>
                          <td>{c?.BusinessHub}</td>
                          <td>{c?.service_center}</td>
                          <td>{c?.UTID}</td>
                          <td>
                            <label className="badge badge-info">
                              {c?.StatusCode}
                            </label>
                          </td>
                          <td>
                            <Link
                              className="btn btn-xs btn-success"
                              to={`/customerinfo/${c?.FAccountNo}/${c?.DistributionID}`}
                            >
                              <i class="icon-user"></i>
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="col-md-12">
              <Pagination
                currentPage={currentPage}
                totalCount={data?.data?.customers?.total || 1}
                pageSize={data?.data?.customers?.per_page || 1}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCustomers;
