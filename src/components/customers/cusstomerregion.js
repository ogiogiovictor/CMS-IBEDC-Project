import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCustomerByRegionQuery, useExportCustomersMutation } from "../../redux/services/customer/customerService";
import { setRegionCustomers  } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import { notify } from "../../utils/notify";

const CustomerByRegion = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [mregion, setRegion] = useState('');
  const [link, setLink] = useState(null); // State to store the download link


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

  //console.log(searchCustomers)

  useEffect(() => {
    if (data) {
      dispatch(setRegionCustomers(data?.data?.data));
    }
  }, [data, dispatch, refetch, currentPage, region]);


  const [ postExport ] = useExportCustomersMutation();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    let payload = null; 

    try {

      payload = {
        'mregion' : mregion,
        'download' : "download_by_region",
      }
    
      const response = await postExport(payload);
      const dahome = response?.error?.data;
      console.log(dahome);
      const csvData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(dahome);
            
      const tempLink = document.createElement('a');
      tempLink.href = csvData;
      tempLink.setAttribute('download', 'export.csv');
      document.body.appendChild(tempLink);

      setLink(tempLink); // Set the download link in state
      notify("info", "Pulling data from server...", 10000);

      tempLink.click();
      tempLink.parentNode.removeChild(tempLink);

      if (tempLink) {
        notify("success", "Data Successfully Downloaded", 10000);
      }

      
    } catch (error) {
      //console.log(error);
      console.error('Export error:', error);
      notify("danger", "Error Downloading File", 10000);
      
    }

   


  };

  const handleRegion = (e) => { 
    setRegion(e.target.value);
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
                        
                            <select onChange={handleRegion} name="region" className="form-control" required> 
                            <option value="">Select Region</option>
                                {searchCustomers?.length > 0 ? (
                                  [...new Set(searchCustomers.map(el => el.Region))].map(regionName => (
                                    <option key={regionName} value={regionName}>{regionName}</option>
                                  ))
                                ) : (
                                  <option value="" disabled>No data available</option>
                                )}
                            </select>
                          
                            <button type="submit" className="btn btn-sm btn-primary ml-3">
                              DOWNLOAD
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
