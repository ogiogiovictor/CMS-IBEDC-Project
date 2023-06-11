import React, {Fragment, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useGetPaymentInfoQuery } from '../../redux/services/payment/paymentService';
import PageLoader from "../spinner/loader";
import { CustomerInfoTable } from '../createcustomer/customerinfotable';
import { setPaymentInfo } from '../payments/paymentSlice';

const UserObject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { FAccount, Token, CSPClientID } = useParams();
    const { paymentInfo } = useSelector((state) => state.payment) || {};

    const { data, isFetching, isUninitialized } = useGetPaymentInfoQuery(
        { FAccount, Token, CSPClientID });

    useEffect(() => {
        if (data) {
             dispatch(setPaymentInfo(data?.data));
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
             <h4 className="card-title">{paymentInfo.CustomerName ?? 0}</h4>
             <Link onClick={goBack} class="btn btn-info btn-xs"><i className="icon-action-undo"></i></Link>
                <div className="profile-body">
                    <ul className="nav tab-switch" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" id="user-profile-info-tab" data-toggle="pill" href="#user-profile-info" role="tab" aria-controls="user-profile-info" aria-selected="true">
                           Payment Information
                        </a>
                      </li>
                     
                    </ul>


                    <div className="row">
                      <div className="col-md-12">
                        
                        <div className="tab-content tab-body" id="profile-log-switch">

                          <div className="tab-pane fade show active pr-3" id="user-profile-info" role="tabpanel" aria-labelledby="user-profile-info-tab">
                        
                            { isUninitialized ? <PageLoader /> : ''}

                           { isFetching ? <PageLoader /> : 
                            <CustomerInfoTable customerInfo={paymentInfo} />
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

export default UserObject;