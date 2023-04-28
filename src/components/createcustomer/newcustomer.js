import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomerCard from '../cards/customercard';
import { useGetDashboardStatsQuery } from "../../redux/services/auth/authService";
import { usePostTicketIDMutation } from "../../redux/services/customer/customerService";
import { setDashboardStats } from "../../redux/auth/authSlice";
import { setTicketInfo } from "../../redux/customer/customerSlice";

const NewCustomer = () => {
  const { data, isFetching } = useGetDashboardStatsQuery("dashboardStats", {});

  const [addTicket, { isLoading }] = usePostTicketIDMutation();

  const { dashboardStats } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store
  const navigate = useNavigate();

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


  const postCustomer = async (e) => {
    e.preventDefault();

    if (!values.ticketid) {
       setValues({...values, errorMessage: 'Please enter a ticketID'});
       return;
    }else {
    
      //Collect data from the form
      const idata = { 
        ticketid: values.ticketid,
      }

      try {
        const result =  await addTicket(idata).unwrap();
        //console.log(result);
         dispatch(setTicketInfo(result));
         if(result.data.customer){
          navigate('/crmd');
         }else{
          setValues({...values, errorMessage: 'No Customer was Found With This TicketID. Please contact IT'});
          return;
         }
         //console.log(result.data.customer);
      } catch (error) {
        if (error.status === 500) {
          // Handle error 500 here...
          setValues({...values, errorMessage: 'We Could not find any ticket ID attached to a customer, Please contact helpdesk.'});
          return;
        }
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