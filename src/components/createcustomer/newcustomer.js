import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from '../cards/customercard';
import { addCustomer } from '../../redux/customer/customerActions';

const NewCustomer = () => {
  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store
  const [values, setValues] = useState({
    surname: '',
    firstname: '',
    middlename: '',
    phoneNumber: '',
    email: '',
    fullAddress: '',
    state: '',
    lga: '',
    serviceCenter: '',
    errorMessage: '',
  });

  //Blur Event
  const [touched, setTouched] = useState({
    surname: false,
    firstname: false,
    middlename: false,
    phoneNumber: false,
    email: false,
    fullAddress: false,
    state: false,
    lga: false,
    serviceCenter: false,
  });

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onBlurHandler = (e) => {
    setTouched({...touched, [e.target.name]: true})
  }


  const postCustomer = (e) => {
    e.preventDefault();

    if (!values.phoneNumber || !values.fullAddress || !values.state || !values.serviceCenter
      || !values.surname || !values.firstname || !values.middlename || !values.email) {

       setValues({...values, errorMessage: 'Please fill all fields'});
       return;
    }else {
    
      //Collect data from the form
      const data = { 
        surname: values.surname,
        firstname: values.firstname,
        middlename: values.middlename,
        phoneNumber: values.phoneNumber,
        email: values.email,
        fullAddress: values.fullAddress,
        state: values.state,
        lga: values.lga,
        serviceCenter: values.serviceCenter,
      }

      dispatch(addCustomer(data));

    }

    



  }

 


    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ADD NEW CUSTOMER</h4>
                  <p className="card-description">
                  <hr/>
                   Customer Record Management Document - CRMD
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={postCustomer}>
                    
                   { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                      
                    <div className="form-group">
                      <label for="surname">Surname</label>
                      <input type="text" 
                      className="form-control" 
                      name="surname"
                      value={values.surname}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.surname.toString()}
                      placeholder="Enter Account No" required
                      pattern='^[A-Za-z0-9]{3,25}$'
                      />
                      <small>Surname should be between 3 -25 characters with no special characters</small>
                    </div>
                    

                    <div className="form-group">
                      <label for="firstname">Firstname</label>
                      <input type="text" 
                      className="form-control" 
                      name="firstname" 
                      value={values.firstname}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      placeholder="Enter Firstname" required 
                      pattern='^[A-Za-z0-9]{3,25}$'
                      touched={touched.firstname.toString()}
                      />
                       <small>Firstname should be between 3 -25 characters with no special characters</small>
                    </div>

                    <div className="form-group">
                      <label for="middlename">MiddleName</label>
                      <input type="text" 
                      className="form-control" 
                      name="middlename" 
                      value={values.middlename}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      placeholder="Enter Middlename"
                      pattern='^[A-Za-z0-9]{3,25}$'
                      touched={touched.middlename.toString()}
                       />
                       <small>Middlename should be between 3 -25 characters with no special characters</small>
                    </div>

                    <div className="form-group">
                      <label for="phoneNumber">Phone Number</label>
                      <input type="phone" 
                      className="form-control" 
                      name="phoneNumber" 
                      value={values.phoneNumber}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      placeholder="Enter Phone Number" required 
                      pattern='^[0-9]{11}$'
                      touched={touched.phoneNumber.toString()}
                      />
                      <small>Should be a valid phone number 247 704 560 7871</small>
                    </div>
                    <div className="form-group">
                      <label for="email">Email Address</label>
                      <input type="email" 
                      className="form-control" 
                      value={values.email}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      name="email" placeholder="Enter Email" 
                      touched={touched.email.toString()}
                      />
                       <small>Should be a valid email address adeyanjo@gmail.com</small>
                    </div>
                    <div className="form-group">
                      <label for="fullAddress">Customer Address</label>
                      <input type="text" className="form-control" 
                      name="fullAddress" 
                      value={values.fullAddress}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.fullAddress.toString()}
                      placeholder="Enter Address" required />
                        <small>Cannot be empty</small>
                    </div>

                    <div className="form-group">
                    <label for="state">State</label>
                    <select className="form-control" name="state" 
                    values={values.state}
                    onChange={onChangeHandler}
                    required
                    >
                          <option value=''>Select State</option>
                          <option>Lagos</option>
                          <option>Benin</option>
                        </select>
                        <small>Cannot be empty</small>
                    </div>

                    <div className="form-group">
                    <label for="lga">Local Government Area</label>
                    <select className="form-control" name="lga"
                     value={values.state}
                     onChange={onChangeHandler}
                     required
                     >
                          <option value=''>Select State</option>
                          <option>Lagos</option>
                          <option>Benin</option>
                        </select>
                        <small>Select State is required</small>
                    </div>

                    <div className="form-group">
                    <label for="serviceCenter">Service Centre</label>
                    <select className="form-control" name="serviceCenter"
                     value={values.serviceCenter}
                     onChange={onChangeHandler}
                     required
                     >
                          <option value=''>Select Service Center</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                        <small>Select Service Centre</small>
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