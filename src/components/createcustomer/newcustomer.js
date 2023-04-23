import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from '../cards/customercard';
import { addCustomer } from '../../redux/customer/customerActions';
import { useGetDashboardStatsQuery } from "../../redux/services/auth/authService";
import { setDashboardStats } from "../../redux/auth/authSlice";

const NewCustomer = () => {
  const { data, isFetching } = useGetDashboardStatsQuery("dashboardStats", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  const { dashboardStats } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store

  useEffect(() => {
    if (data) {
      dispatch(setDashboardStats(data?.data));
    }
  }, [data, dispatch]);

  console.log(dashboardStats?.customer_by_region)


  const [values, setValues] = useState({
    ticketid: '',
  });

  //Blur Event
  const [touched, setTouched] = useState({
    ticketid: false,
  });

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onBlurHandler = (e) => {
    setTouched({...touched, [e.target.name]: true})
  }


  const postCustomer = (e) => {
    e.preventDefault();

    if (!values.ticketid) {

       setValues({...values, errorMessage: 'Please enter a ticketID'});
       return;
    }else {
    
      //Collect data from the form
      const idata = { 
        ticketid: values.ticketid,
      }

      dispatch(addCustomer(idata));

    }

    



  }

 


    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">FIND COMPLAIN - ENTER TICKET ID</h4>
                  <p className="card-description">
                  <hr/>
                   Customer Record Management Document - CRMD
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={postCustomer}>
                    
                   { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                      
                    <div className="form-group">
                      <label htmlFor="surname">Enter TicketID</label>
                      <input type="text" 
                      className="form-control" 
                      name="ticketid"
                      value={values.ticketid}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.ticketid.toString()}
                      placeholder="Enter TicketID" required
                      />
                      <small>TICKET ID Cannot be empty</small>
                    </div>
                    

                   
                    <button type="submit" className="btn btn-primary mr-2">Proceed</button>
                    {/* <button className="btn btn-light">Cancel</button> */}
                      {/* <button className="btn btn-primary mr-2" disabled={isSubmitting}> {isSubmitting ? 'Submitting..' : 'Save'}</button> */}
                  </form> 
                </div>
              </div>
            </div>

            <CustomerCard cstats={dashboardStats?.customer_by_region} />

        </div>
    );
}

export default NewCustomer;