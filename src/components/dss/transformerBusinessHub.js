import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link  } from "react-router-dom";
import { useGetdtbybusinessHubQuery } from '../../redux/services/dss/dtService';
import { setBHubDT} from './transformerSlice';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import DynamicData from '../layout/dynamicData';
import Popup from '../modal/popup';

const DTBusinessHub = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { dtbusinesshub } = useSelector((state) => state.dss) || [];
  const [selectedObject, setSelectedObject] = useState(null);

  const dispatch = useDispatch();


  //console.log("type:", type);
  const { data, isFetching, isUninitialized, refetch } = useGetdtbybusinessHubQuery( {  pageNo: currentPage });

  console.log(dtbusinesshub);

  const navigate = useNavigate();

  useEffect(() => {
    if (data ) {
      dispatch(setBHubDT(data?.data));
    }
 }, [data]);



    const handleActionClick = (data) => {
      setSelectedObject(data);
      navigate(`/details/${data.Assetid}`, { 
        state: { 
          rowData: data, 
          rowTitle: 'Awailable DT in Business Hubs',
          rowSubTitle: data.DSS_11KV_415V_Name,
          routeName: '/dt_by_business_hub'
         } });
    };

   
    const columns = [
      { title: "Business Hub", field: "hub_name" },
      { title: "Number of Dts", field: "asset_count" },
      { title: "Number of Customers", field: "customers" },
      { title: "Prepaid Customers", field: "prepaid_customers" },
      { title: "Postpaid Customers", field: "postpaid_customers" },
      { title: "Postpaid Payment", field: "postpaid_payments" },
      { title: "Prepaid Payment", field: "prepaid_payments_previous" },
      { title: "Amount Billed", field: "bills" },
      
    ];

   
   

    return (

        <Fragment>
         
            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 

        <div>
           
             <div className="row">
            <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">DT By Business Hub &nbsp;&nbsp;
                  <button className="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span className="icon-refresh"></span></button>
                  &nbsp;&nbsp;</h4>
                  <hr/>


                  <div className="table-responsive">

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Business Hub</th>
                        <th>Number of Dts</th>
                        <th>Number of Customers</th>
                        <th>Prepaid Customers</th>
                        <th>Postpiad Customers</th>
                        <th>Amount Billed</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                    {dtbusinesshub?.map((customer) => (

                      <tr key={customer.id}>
                        <td>{customer.hub_name}</td>
                        <td>{customer.asset_count}</td>
                        <td>{customer.customers}</td>
                        <td>{customer.prepaid_customers}</td>
                        <td>{customer.postpaid_customers}</td>
                        <td>{customer.bills}</td>
                        <td>
                          <button className="btn btn-primary btn-xs" onClick={() => handleActionClick(customer)}><span className="mdi mdi-eye">View</span></button>
                        </td>
                      </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
            
            </div>
        </div>
        }
        </Fragment>
    );
}

export default DTBusinessHub;