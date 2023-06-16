import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerDetailsByTypeQuery } from "../../redux/services/customer/customerService";
import { useSearchAssetDTMutation } from "../../redux/services/dss/dtService";
import { setAllCustomers, setPostpaidCards, setPrepaidCards, setFilterStatus, setFilteredCustomers  } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import CustomerCard from "../createcustomer/customercard";
import Popup from "../modal/popup";
import { notify } from "../../utils/notify";

const AllCustomers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State for popup

  //Search Implementation
  const [hiddenFieldValue, setHiddenFieldValue] = useState('customers');
  const [searchResult, setSearchResult] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, postpaidCards, prepaidCards } = useSelector((state) => state.customer) || [];

  const { customerType, type } = useParams();
  const stringType = customerType &&  `${customerType.charAt(0).toUpperCase()}${customerType.slice(1).toLowerCase()}`;

  const filterStatus = useSelector((state) => state.customer.filterStatus);
  
  const openPopup = () => {  setIsOpen(true); };
  const closePopup = () => { setIsOpen(false); };

  const userStatus = type && type.toUpperCase();
 // console.log(stringType);
  const { data, isFetching, refetch, error, dataUpdatedAt } = useGetCustomerDetailsByTypeQuery(
    { userQuery: stringType, userStatus: filterStatus, pageNo: currentPage }
  );

  
  if (error) {
    console.log(error);
    notify("error", error.data.data);
    navigate(`/errorpage`);
  }

  //console.log(dataUpdatedAt);

  const handleFilterStatusChange = (statusCode) => {
     dispatch(setFilterStatus(statusCode));
     console.log(filterStatus);
  };


  useEffect(() => {
    if (currentPage && data) {
      //refetch();
      dispatch(setAllCustomers(data?.data?.customers?.data));
      filterStatus == null && dispatch(setAllCustomers(data?.data?.customers?.data));
      userStatus && dispatch(setAllCustomers(data?.data?.customers?.data));
      customerType === "prepaid" && dispatch(setPrepaidCards(data?.data?.prepaid));
      customerType === "postpaid" && dispatch(setPostpaidCards(data?.data?.postpaid));
    }
  }, [data, dispatch, refetch, currentPage, customerType, filterStatus]);


  //Searching...
  const [postSearch ] = useSearchAssetDTMutation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(searchText);
  }


  const performSearch = async (query) =>  { 
    const payload = {
      AccountNo: query,
      type: hiddenFieldValue
    };

    if(!payload.AccountNo){
      return null;
    }
    try {
         
      const result = await postSearch(payload).unwrap();
      console.log(result);
      setCurrentPage(1);
      dispatch(setAllCustomers(result.data));
      
     // refetch();

    } catch (error) {
      console.log(error);
      notify("error", "Error occured while searching  || " + error?.data.data);
      // Handle any error that occurs during the search
    }
  }

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
    { title: "Status", field: "StatusCode" },
  ];

  const filteredCustomers = customers?.filter((customer) =>
    customer?.FirstName?.toLowerCase().includes(searchText?.toLowerCase())
  );


  const customContent = (handleStartDateChange, handleEndDateChange, handleSubmit) => (
    <div>
      <p style={{ marginBottom: '10px' }}>
        <label>
          Start Date:
          <input type="date"  onChange={handleStartDateChange} style={{ marginLeft: '10px' }} />
        </label>
      </p>
      <p style={{ marginBottom: '10px' }}>
        <label>
          End Date:
          <input type="date"  onChange={handleEndDateChange} style={{ marginLeft: '13px' }} />
        </label>
      </p>
      <p>
        <button  className="btn btn-danger btn-xs"  type="button" onClick={handleSubmit}>
          Submit
        </button>
      </p>
    </div>
  );
  


  return (
    <>
      {customerType ? (
        customerType === "postpaid" ? (
          <CustomerCard statusCard={postpaidCards} onFilterStatusChange={handleFilterStatusChange} />
        ) : customerType === "prepaid" ? (
          <CustomerCard statusCard={prepaidCards} onFilterStatusChange={handleFilterStatusChange} />
        ) : (
          ""
        )
      ) : (
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                {/* <h4 className="card-title">Customer Summary</h4>
                <canvas id="barChart"></canvas> */}
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

             
              <div class="row">

                      <div class="col-md-10">
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
                            <input type="hidden"  value={hiddenFieldValue} 
                                            onChange={(e) => setHiddenFieldValue(e.target.value)}
                                            class="form-control" />
                            <button type="submit" className="btn btn-primary ml-3">
                              Search
                            </button>
                            </div>
                          </form>
                      </div>


                        <div  class="col-md-2">
                        <button type="submit" className="btn btn-danger ml-4" onClick={openPopup}>
                          Export(excel)
                        </button>
                        </div>

              </div>
           
               

              <Popup isOpen={isOpen} onClose={closePopup} title="Advance Search" content={customContent} />

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
