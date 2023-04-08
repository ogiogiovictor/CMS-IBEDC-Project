import React, { useState } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import CustomerCard from '../cards/customercard';

const NewCustomer = () => {
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
  });


  const postCustomer = (e) => {
    e.preventDefault();
  }

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  console.log(values);


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

                    <div className="form-group">
                      <label for="surname">Surname</label>
                      <input type="text" 
                      className="form-control" 
                      name="surname"
                      value={values.surname}
                      onChange={onChangeHandler}
                      placeholder="Enter Account No" />
                    </div>

                    <div className="form-group">
                      <label for="firstname">Firstname</label>
                      <input type="text" 
                      className="form-control" 
                      name="firstname" 
                      value={values.firstname}
                      onChange={onChangeHandler}
                      placeholder="Enter Firstname" />
                    </div>

                    <div className="form-group">
                      <label for="middlename">MiddleName</label>
                      <input type="text" 
                      className="form-control" 
                      name="middlename" 
                      value={values.middlename}
                      onChange={onChangeHandler}
                      placeholder="Enter Middlename" />
                    </div>

                    <div className="form-group">
                      <label for="phoneNumber">Phone Number</label>
                      <input type="email" 
                      className="form-control" 
                      name="phoneNumber" 
                      value={values.phoneNumber}
                      onChange={onChangeHandler}
                      placeholder="Enter Phone Number" />
                    </div>
                    <div className="form-group">
                      <label for="email">Email Address</label>
                      <input type="email" 
                      className="form-control" 
                      value={values.email}
                      onChange={onChangeHandler}
                      name="email" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                      <label for="fullAddress">Customer Address</label>
                      <input type="password" className="form-control" 
                      name="fullAddress" 
                      value={values.fullAddress}
                      onChange={onChangeHandler}
                      placeholder="Enter Address" />
                    </div>

                    <div className="form-group">
                    <label for="stae">State</label>
                    <select className="form-control" name="state" 
                    values={values.state}
                    onChange={onChangeHandler}
                    >
                          <option value=''>Select State</option>
                          <option>Lagos</option>
                          <option>Benin</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label for="lga">Local Government Area</label>
                    <select className="form-control" name="lga"
                     value={values.state}
                     onChange={onChangeHandler}
                     >
                          <option value=''>Select State</option>
                          <option>Lagos</option>
                          <option>Benin</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label for="serviceCenter">Service Centre</label>
                    <select className="form-control" name="serviceCenter"
                     value={values.serviceCenter}
                     onChange={onChangeHandler}
                     >
                          <option value=''>Select Service Center</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
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