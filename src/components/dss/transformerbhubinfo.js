import React, {useState, Fragment} from 'react';
<<<<<<< HEAD
import { useLocation, useNavigate   } from "react-router-dom";
=======
import { Link, useLocation, useNavigate, useParams   } from "react-router-dom";
>>>>>>> f21d1981a8b9682800a0e835b068944977659639
import DataTable from '../datatable';
import { useSelector } from 'react-redux';
import PageLoader from "../spinner/loader";
import { useGetDTbyInBhubsQuery } from '../../redux/services/dss/dtService';
<<<<<<< HEAD
=======
import { CSVLink } from 'react-csv';

>>>>>>> f21d1981a8b9682800a0e835b068944977659639

const TransformerBHubInfo = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const rowData = location.state.rowData;
    const rowTitle = location.state.rowTitle;
    const rowSubTitle = location.state.rowSubTitle;
    const routeName = location.state.routeName;
    const navigate = useNavigate();
<<<<<<< HEAD


    const { data, isFetching, isUninitialized, refetch } = useGetDTbyInBhubsQuery({ hub_name: rowSubTitle, pageNo: currentPage });

    console.log(data);

    const columns = [
        { title: "Date", field: "DATE" },
        { title: "MSNO", field: "MSNO" },
        { title: "Descr", field: "Descr" },
      ];

      const handleActionClick = (event) => {
        //This is where we drill down to customers
        console.log(event);
      }

=======
    const { hubName } = useParams();


   ///const { data, isFetching, isUninitialized, refetch } = useGetDTbyInBhubsQuery({ hub_name: rowSubTitle, pageNo: currentPage });
    const { data, isFetching, isUninitialized, refetch } = useGetDTbyInBhubsQuery({ hubName });

    console.log(data?.data);

      const handleActionClick = (customer) => {
         navigate(`/customers_in_dts/${customer?.BusinessHub}/${customer?.DistributionID}`, { 
          state: { 
            rowData: customer, 
            rowTitle: `Customers In ${customer?.BusinessHub} For ${customer?.dtinformation?.DSS_11KV_415V_Name} DSS`,
            rowSubTitle: customer.DistributionID,
            routeName: `/transformer_business_hub_info/${customer.BusinessHub}`
           } });
      }

      const goBack = () => {
        navigate(-1);
      };

>>>>>>> f21d1981a8b9682800a0e835b068944977659639
    return (
        <Fragment> 
            
        {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
<<<<<<< HEAD
             <h4 className="card-title">{ rowSubTitle } BUSINESS HUBS DSS</h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search DSS(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
          
             <DataTable 
                 data={data}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.data?.total || 1}
                 pageSize={data?.data?.data?.per_page || 1}
                 onPageChange={(page) => setCurrentPage(page)}
                 onActionClick={handleActionClick}
                />
=======
             <h4 className="card-title"> <b><u>{data?.data?.length }</u> </b> DSS IN <b><u>{ rowSubTitle?.toUpperCase() }</u> </b>BUSINESS HUBS &nbsp;&nbsp;
             <CSVLink data={data?.data} filename={"dssinbhusinesshub.csv"}> <button className="btn btn-xs btn-primary">Export to CSV</button></CSVLink>&nbsp;&nbsp;
             </h4>
             <Link onClick={goBack} class="btn btn-info btn-xs"><i class="icon-action-undo"></i></Link>
             <hr/>
             {/* <div class="form-group d-flex"><br/>
                          <input type="text" class="form-control" placeholder="Search DSS(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div> */}
             <div className="table-responsive">
          
             <table className="table">
                 <thead>
                   <tr>
                    
                   <th>AssetID</th>
                     <th>DSS Name</th>
                     <th>No of Customers</th>
                     <th>Service Center</th>
                     <th>Address</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>

                 {data?.data?.map((customer) => (
                    <tr key={customer?.DistributionID}>
                        <td>{customer?.DistributionID}</td>
                        <td>{customer?.dtinformation?.DSS_11KV_415V_Name}</td>
                        <td><span className="badge badge-primary badge-rounded">{customer?.get_customer_count_count} </span></td>
                        <td>{customer?.dtinformation?.DSS_11KV_415V_Owner}</td>
                        <td>{customer?.dtinformation?.DSS_11KV_415V_Address}</td>
                        <td>{customer?.dtinformation?.Status}</td>
                       
                       <td><button onClick={() => handleActionClick(customer)} className="btn btn-xs btn-outline-primary">
                            <i class="icon-user"></i>
                            View
                          </button>&nbsp;
                        </td> 
                    </tr>
                        ))
                    }


                 </tbody>
               </table>
>>>>>>> f21d1981a8b9682800a0e835b068944977659639
             </div>
           </div>

          
                
         </div>
       </div>
       
     </div>
       }
   </Fragment>
    );
  

}


export default TransformerBHubInfo;