import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link  } from "react-router-dom";
import TransformerCard from './transformercards';
import { useGetBillingEfficencyQuery } from '../../redux/services/dss/dtService';
import { setDTBill } from './transformerSlice';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import DynamicData from '../layout/dynamicData';
import BillingEfficiencyCard from './billingeffiencycard';

const BillingEfficiency = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { dtbilling } = useSelector((state) => state.dss) || [];
  const dispatch = useDispatch();

  const [selectedObject, setSelectedObject] = useState(null);

  //Everything Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenFieldValue, setHiddenFieldValue] = useState('dt_asset');
  const [searchResult, setSearchResult] = useState(null);

  //console.log("type:", type);
  const { data, isFetching, isUninitialized, refetch } = useGetBillingEfficencyQuery(
    {  pageNo: currentPage }
  );

 // console.log(data?.data?.dt_by_status);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      refetch();
      dispatch(setDTBill(data?.data?.dt_billing?.data));
    }
 }, [data, refetch, dispatch, dtbilling]);


    const handleActionClick = (data) => {
      setSelectedObject(data);
      navigate(`/details/${data.Assetid}`, { 
        state: { 
          rowData: data, 
          rowTitle: 'DT Billing Efficency',
          rowSubTitle: data.DSS_11KV_415V_Name,
          routeName: '/dt_billing_efficiency'
         } });
    };


    const handleSearchSubmit = (e) => {
        e.preventDefault();
       // performSearch(searchQuery);
      }



    const columns = [
      { title: "Asset ID", field: "Assetid" },
      { title: "DSS Name", field: "DSS_11KV_415V_Name" },
      { title: "Total Customers", field: "TotalDSS" },
      { title: "Billed ustomers", field: "TotalCustomers" },
      { title: "UnBilled", field: "UnBilledCustomers" },
      { title: "AmountBilled", field: "AmountBilled" },
      { title: "AmountPaid", field: "AmountPaid" },
    ];



   

    return (

        <Fragment>
            <BillingEfficiencyCard dtStatus={data?.data?.dt_by_status} dt_billed={data?.data?.dt_total_billed_with_value} dt_without={data?.data?.dt_billed_dss} />

            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 

        <div>
           
             <div className="row">
            <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">DT BILLING EFFICIENCY/PAYMENT AS AT { Date('Y-m')} &nbsp;&nbsp;
                  <button class="btn btn-icons btn-rounded btn-secondary" onClick={() => refetch()}><span class="icon-refresh"></span></button> </h4>

                  <div class="row">
                      <div class="col-md-12">
                          <form onSubmit={handleSearchSubmit}>
                            <div class="form-group d-flex">
                        
                                <input type="text" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                name="search_dss"
                                class="form-control" placeholder="Search Distribution Station..." />

                                <input type="hidden"  value={hiddenFieldValue} 
                                onChange={(e) => setHiddenFieldValue(e.target.value)}
                                class="form-control" />
                                <button type="submit" class="btn btn-primary ml-3">Search</button>
                            </div>
                          </form>
                      </div>
                  </div>

                  
                      
                  <div className="table-responsive">
                  <DataTable 
                    data={dtbilling}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.dt_billing.total || 1}
                    pageSize={data?.data?.dt_billing.per_page || 1}
                    onPageChange={(page) => setCurrentPage(page)}
                    onActionClick={handleActionClick}
                    />
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

export default BillingEfficiency;