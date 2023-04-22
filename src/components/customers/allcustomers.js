import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerDetailsByTypeQuery } from "../../redux/services/customer/customerService";
import { setAllCustomers, setPostpaidCards, setPrepaidCards } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import CustomerCard from "../createcustomer/customercard";

const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { customers, postpaidCards, prepaidCards } =
    useSelector((state) => state.customer) || [];
  const navigate = useNavigate();
  const { customerType } = useParams();
  const stringType =
    customerType &&
    `${customerType.charAt(0).toUpperCase()}${customerType
      .slice(1)
      .toLowerCase()}`;

  console.log(stringType);
  const { data, isFetching, refetch } = useGetCustomerDetailsByTypeQuery(
    { userQuery: stringType, pageNo: currentPage },
    "",
    {
      pollingInterval: 900000,
    }
  );

  useEffect(() => {
    if (currentPage && data) {
      refetch();
      dispatch(setAllCustomers(data?.data?.customers?.data));
      customerType === "prepaid" &&
        dispatch(setPrepaidCards(data?.data?.prepaid));
      customerType === "postpaid" &&
        dispatch(setPostpaidCards(data?.data?.postpaid));
    }
  }, [data, dispatch, currentPage, refetch, customerType]);

  console.log(data);

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
    customer?.FirstName.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <>
      {customerType ? (
        customerType === "postpaid" ? (
          <CustomerCard statusCard={postpaidCards} />
        ) : customerType === "prepaid" ? (
          <CustomerCard statusCard={prepaidCards} />
        ) : (
          ""
        )
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Customer Summary</h4>
                <canvas id="barChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                {customerType
                  ? `${customerType.charAt(0).toUpperCase()}${customerType
                      .slice(1)
                      .toLowerCase()} customers`
                  : "All customer"}
              </h4>

              <div className="form-group d-flex">
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
              ) : customers?.length !== 0 ? (
                <DataTable
                  data={customers}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.customers?.meta?.total || 1}
                  pageSize={data?.data?.customers?.meta?.per_page || 1}
                  onPageChange={(page) => setCurrentPage(page)}
                  onActionClick={handleActionClick}
                />
              ) : (
                <p className="text-center">No Customer Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCustomers;
