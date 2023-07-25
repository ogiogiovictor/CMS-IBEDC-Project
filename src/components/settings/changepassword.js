import React, { useState,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { useChangePasswordMutation } from '../../redux/services/user/userService';
import { notify  } from '../../utils/notify';

const ChangePassword = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store
  const navigate = useNavigate();



  const [values, setValues] = useState({
    old_password: '',
    new_password: '',
    confpassword: '',
  });

  //Blur Event
  const [touched, setTouched] = useState({
    old_password: false,
    new_password: false,
    confpassword: false,
  });

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onBlurHandler = (e) => {
    setTouched({...touched, [e.target.name]: true})
  }


    const [changePassword] = useChangePasswordMutation();

  const postCustomer = async (e) => {
    e.preventDefault();

    if (!values.old_password) {
       setValues({...values, errorMessage: 'Please enter all fields'});
       return;
    }else {
    
      //Collect data from the form
      const idata = { 
        old_password: values.old_password,
        new_password: values.new_password,
        confpassword: values.confpassword,
      }

      if(idata.new_password !== idata.confpassword){
        setValues({...values, errorMessage: 'Password does not match'});
        return;
        }

        setIsProcessing(true);

      try {

        const response = await changePassword(idata).unwrap();
        console.log(response.message);

        notify('success',  response.message)
        setIsProcessing(false);
        setValues({...values, errorMessage: ''});
        setValues({ old_password: ''});
        setValues({...values, new_password: ''});
        setValues({...values, confpassword: ''});
        setValues({...values, errorMessage: response.message});
      
      } catch (error) {
        setIsProcessing(false);
        console.log(error.data.data);
        notify('error',  error.data.data)
        setValues({...values, errorMessage: error.data.data});
       
      }

    }

  }

    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">CHANGE PASSWORD</h4>
                  <p className="card-description">
                  <hr/>
                  Password Reset </p>

                 
                   <form className="forms-sample" onSubmit={postCustomer}>
                    
                   { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                      
                    <div className="form-group">
                      <label htmlFor="surname">Enter Old Password</label>
                      <input type="text" 
                      className="form-control" 
                      name="old_password"
                      value={values.old_password}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.old_password.toString()}
                      placeholder="Enter Old Password" required
                      />
                      <small>OLD PASSWORD Cannot be empty</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="surname">Enter New Password</label>
                      <input type="text" 
                      className="form-control" 
                      name="new_password"
                      value={values.new_password}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.new_password.toString()}
                      placeholder="Enter New Password" required
                      />
                      <small>NEW PASSWORD Cannot be empty</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="surname">Confirm New Password</label>
                      <input type="text" 
                      className="form-control" 
                      name="confpassword"
                      value={values.confpassword}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.confpassword.toString()}
                      placeholder="Enter Confirm Password" required
                      />
                      <small>Confirm Password Cannot be empty</small>
                    </div>
                    

                   
                    <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Proceed'}
                    </button>
                  </form> 
                  
                </div>
              </div>
            </div>

        </div>
    );
}

export default ChangePassword;