import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerByRegionQuery } from "../../redux/services/customer/customerService";
import { setRegionCustomers  } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import { notify } from "../../utils/notify";

const CustomerByRegion = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedObject, setSelectedObject] = useState(null);

  //Search Implementation
  const [hiddenFieldValue, setHiddenFieldValue] = useState('customers');
  const [searchResult, setSearchResult] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchCustomers } = useSelector((state) => state.customer) || [];
  const { region } = useParams();

 // console.log(stringType);
  const { data, isFetching, refetch, error } = useGetCustomerByRegionQuery({ region });

  
  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }


  useEffect(() => {
    if (data) {
      dispatch(setRegionCustomers(data?.data?.data));
    }
  }, [data, dispatch, refetch, currentPage, region]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };


  const handleActionClick = ({ FAccountNo, DistributionID, AccountType, MeterNo }) => {
   const distributionIDParam = DistributionID ? DistributionID : 'null';
    const MeterNumber = MeterNo ? MeterNo : 'null';
    navigate(`/customerinfo/${FAccountNo}/${distributionIDParam}/${AccountType}/${MeterNumber}`);
    window.scrollTo(0, 0);
  };

  const columns = [
    
    { title: "Setup Date", field: "SetupDate" },
    { title: "Surname", field: "Surname" },
    { title: "FirstName", field: "FirstName" },
    { title: "Account Number", field: "AccountNo" },
    { title: "Business Hub", field: "BusinessHub" },
   // { title: "MeterNo", field: "MeterNo" },
    { title: "DSS ID", field: "DistributionID" },
    { title: "Region", field: "Region" },
  ];

  


  return (
    <>
     
      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title"> Customer By Region</h4>

             
              <div class="row">

                      <div class="col-md-12">
                        <form onSubmit={handleSearchSubmit}>
                        <div className="form-group d-flex">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Search Customers(s)..."
                              name="search_customers"
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary ml-3">
                              Search
                            </button>
                            </div>
                          </form>
                      </div>

              </div>
           
               

              {isFetching ? (
                <PageLoader />
              ) : searchCustomers?.length !== 0 ? (
                <DataTable
                  data={searchCustomers}
                  columns={columns}
                  pagination
                  currentPage={currentPage}
                  totalCount={data?.data?.meta?.total || 1}
                  pageSize={data?.data?.meta?.per_page || 1}
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

export default CustomerByRegion;
