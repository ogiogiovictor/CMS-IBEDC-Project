import React, {Fragment, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BillCard from './billcards';
import { useGetAllBillsQuery } from '../../redux/services/bill/billService';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const Bills = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching, isUninitialized, refetch } = useGetAllBillsQuery( 
    { pageNo: currentPage });

  const navigate = useNavigate();
  useEffect(() => {
    if (currentPage && data) {
      refetch();
    }
  }, [data, refetch, currentPage])

  console.log(data);

  const columns = [
    { title: "Bill Month", field: "BillMonthName" },
    { title: "Bill Year", field: "BillYear" },
    { title: "Account No", field: "AccountNo" },
    { title: "Customer Name", field: "CustomerName" },
    { title: "Business Hub", field: "BUName1" },
    { title: "Current Charge", field: "CurrentChgTotal" },
  ];

  const handleActionClick = ({ FAccountNo, DistributionID }) => {
    navigate(`/testing`);
    window.scrollTo(0, 0);
  };
  
    return (
        <Fragment>
            <BillCard cardData={data}/>

            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 
          
          <div className="row">
          <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
            <div className="card">
           <div className="card-body">
             <h4 className="card-title">Latest Bills <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button></h4>
           
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Bills(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
              </div>

             <div className="table-responsive">
             <DataTable 
                 data={data?.data?.bills?.data}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.bills?.total || 1}
                 pageSize={data?.data?.bills?.per_page || 1}
                 onPageChange={(page) => setCurrentPage(page)}
                 onActionClick={handleActionClick}
                />
             {/* {data ? (
               <table className="table">
                 <thead>
                   <tr>
                    <th>Bill Month</th>
                     <th>Bill Year</th>
                     <th>Account Number</th>
                     <th>Customer Name</th>
                     <th>Business Hub</th>
                     <th>Current Charge</th>
                     <th>Status</th>
                   </tr>
                 </thead>
                 <tbody>
                 {data.data.bills.data.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.BillMonthName}</td>
                <td>{bill.BillYear}</td>
                <td>{bill.AccountNo}</td>
                <td>{bill.CustomerName}</td>
                <td>{bill.BUName1}</td>
                <td>{bill.CurrentChgTotal}</td>
                <td><Link className="btn btn-xs btn-success"><i class="icon-user"></i>View</Link></td>
              </tr>
            ))}
                
                 </tbody>
               </table>
               ) : (
                <div>No data available</div>
              )} */}

             </div>
           </div>

        
         </div>
       </div>
       
        </div>
          }

       
   </Fragment>
    );
}

export default Bills;