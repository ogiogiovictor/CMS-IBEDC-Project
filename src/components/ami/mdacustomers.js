import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import AMICard from './amicards';
import { useGetAMIServiceQuery } from '../../redux/services/ami/amiService';
import { setAmi } from '../../redux/services/ami/amiSlice';
import PageLoader from "../spinner/loader";
import DataTable from '../datatable';


const MDACustomers = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const { ami } = useSelector((state) => state.ami) || [];
  const dispatch = useDispatch();

  const {data, isError, isFetching, isSuccess, isUninitialized, refetch} = useGetAMIServiceQuery(
    { pageNo: currentPage },  //{ cacheTime: 0 }
  );


  useEffect(() => {
    if(currentPage && data){
      refetch();
      dispatch(setAmi(data.data))
    }
  }, [data, currentPage, refetch])
  console.log(ami)

  const columns = [
    { title: "MSNO", field: "MSNO" },
    { title: "Consumption", field: "consumption" },
    { title: "AssetType", field: "AssetType" },
    { title: "Region", field: "region" },
    { title: "Business Hub", field: "business_hub" },
    { title: "Begin Time", field: "BEGINTIME" },
    { title: "Transformer", field: "Transformer" },
  ];

  const handleActionClick = ({MSNO}) => {
 //   navigate(`/amiDetails/${MSNO}`);
    window.scrollTo(0, 0);
  };


    return (
        <Fragment>
            
            <AMICard  cardData={ami}/>

            {isUninitialized ? <PageLoader /> : ''}

            {isFetching ? <PageLoader /> : 

        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">AMI (Asset/Event Types)
                <div className="btn  btn-fw">
                    <select className="form-control">
                        <option value="">Select Type</option>
                        <option value="Feeder">Feeder</option>
                        <option value="DT">DT</option>
                        <option value="MD">MD</option>
                        <option value="NMD">NMD</option>
                    </select>
                </div>
             </h4>
             <div class="form-group d-flex">
                          <input type="text" class="form-control" placeholder="Search Customer(s)..." />
                          <button type="submit" class="btn btn-primary ml-3">Search</button>
                    </div>
             <div className="table-responsive">
             <DataTable 
                 data={ami}
                 columns={columns}
                 pagination
                 currentPage={currentPage}
                 totalCount={data?.data?.total || 1}
                 pageSize={data?.data?.per_page || 1}
                 onPageChange={(page) => setCurrentPage(page)}
                 onActionClick={handleActionClick}
                />

             </div>
           </div>

                
         </div>
       </div>
       
     </div>
      }
   </Fragment>
    );
}

export default MDACustomers;