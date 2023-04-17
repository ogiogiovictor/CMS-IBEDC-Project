import React, { useState, useMemo, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination";
import { useGetCustomerDetailsByTypeQuery } from "../../redux/services/customer/customerService";
import { setPostpaidCustomers } from "../../redux/customer/customerSlice";

const PostpaidCustomer = () => {
  let PageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  let postpaidCustomers = useSelector(state => state.customer.postpaidCustomers);
  const { data, isFetching } = useGetCustomerDetailsByTypeQuery(
    "postpaid",
    "",
    {
      pollingInterval: 900000,
    }
  );

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return postpaidCustomers?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, postpaidCustomers, PageSize]);

  useEffect(() => {
    if (data) {
      dispatch(setPostpaidCustomers(data?.data?.customers?.data));
    } else {
      dispatch(setPostpaidCustomers([]));
    }
  }, [data, dispatch]);

  console.log(data);
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Postpaid Customers</h4>

              <div class="form-group d-flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Customer(s)..."
                />
                <button type="submit" class="btn btn-primary ml-3">
                  Search
                </button>
              </div>

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
                    {currentTableData?.map((pCustomer, i) => (
                      <tr key={i}>
                        <td>{pCustomer?.FirstName}</td>
                        <td>{pCustomer?.AccountNo}</td>
                        <td>{pCustomer?.AccountType}</td>
                        <td>{pCustomer?.BusinessHub}</td>
                        <td>{pCustomer?.service_center}</td>
                        <td>{pCustomer?.UTID}</td>
                        <td>
                          <label className="badge badge-info">
                            {pCustomer?.StatusCode}
                          </label>
                        </td>
                        <td>
                          <Link
                            className="btn btn-xs btn-success"
                            to={`/customerinfo/${pCustomer?.FAccountNo}/${pCustomer?.DistributionID}`}
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
            </div>

            <div class="col-md-12">
              <Pagination
                currentPage={currentPage}
                totalCount={
                  postpaidCustomers?.length > 1 ? postpaidCustomers?.length : 0
                }
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostpaidCustomer;
