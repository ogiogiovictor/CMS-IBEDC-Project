import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomerCard from '../cards/customercard';
import { useGetDashboardStatsQuery } from "../../redux/services/auth/authService";
import { useSearchAssetDTMutation } from "../../redux/services/dss/dtService";
import { setDashboardStats } from "../../redux/auth/authSlice";
import { notify  } from '../../utils/notify';
import SHOWCRMFORM from './showcrmdform';

const NEWCRMD = () => {
  const { data, isFetching } = useGetDashboardStatsQuery("dashboardStats", {});
  const [isProcessing, setIsProcessing] = useState(false);

  const { dashboardStats } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(setDashboardStats(data?.data));
    }
  }, [data, dispatch]);

  console.log(data?.data);


  const [values, setValues] = useState({
    account_no: '',
    account_type: '',
  });

  //Blur Event
  const [touched, setTouched] = useState({
    account_no: false,
    account_type: false,
  });

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onBlurHandler = (e) => {
    setTouched({...touched, [e.target.name]: true})
  }


    //Searching...
    const [customerData, setCustomerData] = useState(undefined);
    const [postSearch ] = useSearchAssetDTMutation();

  const postCustomer = async (e) => {
    e.preventDefault();

    if (!values.account_no || !values.account_type ) {
       setValues({...values, errorMessage: 'Please fill all fields'});
       return;
    }else {
    
      //Collect data from the form
      const idata = { 
        AccountNo: values.account_no,
        account_type: values.account_type,
        type: "customers"
      }

      try {
        setIsProcessing(true);
        const result = await postSearch(idata).unwrap();
         if(result.data){
          setCustomerData(result.data);
          notify("success", "Customer Successful Found" || "Process Completed Successfully");
          setIsProcessing(false);
         }else{
          setIsProcessing(false); // Enable the button back
          setValues({...values, errorMessage: 'No Customer was Found. Please try again'});
          return;
         }
         //console.log(result.data.customer);
      } catch (error) {
        if (error.status === 500) {
          // Handle error 500 here...
          setIsProcessing(false); // Enable the button back
          setValues({...values, errorMessage: 'We Could not find any Account attached to a customer, Please contact support.'});
          return;
        }
        setIsProcessing(false);
        // Handle other errors here...
        setValues({...values, errorMessage: error.message});
        return;
      }

    }

  }

    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">FIND CUSTOMERS - CRMD</h4>
                  <p className="card-description">
                  <hr/>
                   Customer Record Management Document - CRMD &nbsp;&nbsp;&nbsp;
                   {/* <NavLink to="/addcustomer" className="btn btn-xs btn-primary">Add New</NavLink> */}
                   &nbsp;&nbsp;&nbsp;
                   <NavLink to="/viewcustomers" className="btn btn-xs btn-info">View Pending Customers</NavLink>
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={postCustomer}>
                    
                   { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                      
                    <div className="form-group">

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="surname">Enter AccountNo</label>
                                <input type="text" 
                                className="form-control" 
                                name="account_no"
                                value={values.account_no}
                                onChange={onChangeHandler}
                                onBlur={onBlurHandler}
                                touched={touched.account_no.toString()}
                                placeholder="Enter AccountNo" required
                                />
                                <small>AccountNo Cannot be empty</small>
                            </div>

                            <div className="col-md-6">

                                <label htmlFor="surname">Account Type</label>
                                <select name="account_type" className="form-control"  onChange={onChangeHandler}>
                                    <option value="">Select Account Type</option>
                                    <option value="Prepaid">Prepaid</option>
                                    <option value="Postpaid">Postpaid</option>
                                </select>
                                <small>Account Type Cannot be empty</small>
                            </div>

                        </div>

                    </div>

                  

                   
                    <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Proceed'}
                    </button>
                  </form> 



                  <div>
                    <hr/><br/>
                  {
                   customerData !== undefined ? <SHOWCRMFORM data={customerData[0]} /> : null
                  }
                  </div>
                  
                </div>
              </div>
            </div>

            <CustomerCard cstats={dashboardStats?.customer_by_region} />

        </div>
    );
}

export default NEWCRMD;