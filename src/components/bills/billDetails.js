import React, {Fragment, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useGetBillInfoQuery } from '../../redux/services/bill/billService';
import PageLoader from "../spinner/loader";
import { CustomerInfoTable } from '../createcustomer/customerinfotable';
import { setBillInfo } from '../bills/billSlice';


const BillDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { BillID } = useParams();
    const { billInfo, isFetching, isUninitialized } = useSelector((state) => state.bills) || [];

    const { data, refetch } = useGetBillInfoQuery({ BillID }, { cacheTime: 0 });

    console.log(data);

    useEffect(() => {
        if (data) {
            dispatch(setBillInfo(data?.data));
        }
    }, [data, dispatch]);

    const goBack = () => {
        navigate(-1);
      };

      return (
    <Fragment>
        <div className="row profile-page">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">{billInfo.CustomerName ?? 0}</h4>
             <Link onClick={goBack} class="btn btn-info btn-xs"><i class="icon-action-undo"></i></Link>
                <div class="profile-body">
                    <ul class="nav tab-switch" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="user-profile-info-tab" data-toggle="pill" href="#user-profile-info" role="tab" aria-controls="user-profile-info" aria-selected="true">
                           Bills Information For the Month of {billInfo.BillMonthName ?? 0} / {billInfo.BillYear ?? 0}
                        </a>
                      </li>
                     
                    </ul>


                    <div class="row">
                      <div class="col-md-12">
                        
                        <div class="tab-content tab-body" id="profile-log-switch">

                          <div class="tab-pane fade show active pr-3" id="user-profile-info" role="tabpanel" aria-labelledby="user-profile-info-tab">
                        
                            { isUninitialized ? <PageLoader /> : ''}

                           { isFetching ? <PageLoader /> : 
                            <CustomerInfoTable customerInfo={billInfo} />
                           }

                          </div>

                      </div>


                     
                    </div>
                     </div>


           </div>

                
         </div>
       </div>
       
     </div>
     </div>
    </Fragment>
      );
}

export default BillDetails;