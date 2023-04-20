import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from '../cards/customercard';
import { addCustomer } from '../../redux/customer/customerActions';

const NewCustomer = () => {
  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store
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
      const data = { 
        ticketid: values.ticketid,
      }

      dispatch(addCustomer(data));

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
                      <label for="surname">Enter TicketID</label>
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

            <CustomerCard />

        </div>
    );
}

export default NewCustomer;