import React, { Fragment, useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageLoader from "../components/spinner/loader";
import axios from "axios";
import { notify } from "../utils/notify";

const ResetPassword = () => {

  const { loading, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { token } = useParams();
  // State to handle token existence check
  const [isTokenValid, setTokenValid] = useState(false);
  const [isEmail, setIsEmail ] = useState('');

  const navigateToDashboard = useCallback(() => {
    if (userToken) {
      navigate("/dashboard");
    }
  }, [userToken, navigate]);

  useEffect(() => {
    navigateToDashboard();
  }, [navigateToDashboard]);


  // useEffect to check if the token exists in the API
  useEffect(() => {
    // Define a function to check the token in your API
    const checkTokenValidity = async () => {
      try {
        // Replace 'your-api-endpoint' with the actual API endpoint to check the token
        const response = await fetch(`http://localhost:8000/api/check-password/${token}`);

        if (response.ok) {
          // Token exists and is valid
          setTokenValid(true);
          const responseData = await response.json();
          setIsEmail(responseData?.data?.email);

        } else {
          // Token doesn't exist or is invalid
          setTokenValid(false);
          notify("error", "Invalid Token");
         // navigate("/forgot_password");
        }
      } catch (error) {
        console.error('Error checking token:', error);
        notify("error", "Invalid Token! Something Went Wrong");
        // Handle any error that occurs during the API call
      }
    };

    // Call the function to check the token when the component mounts
    checkTokenValidity();
  }, [token]); // useEffect will re-run whenever 'token' changes



  const submitForm = async (data) => {

    try{

        const email = data.email;
        const password = data.password;
        const confpassword = data.confpassword;

        const idata = {
            email: email,
            password: password,
            confpassword: confpassword
        }

    //use axios to post data to the backend
    const response = await axios.post("http://localhost:8000/api/forgot-password", idata);
    console.log(response?.data?.data?.token);
    if(response?.data?.data?.token){
        notify("success", "Password Reset Link Sent Successfully");
    }else{
        notify("error", "Password Reset Link Not Sent");
    }

    } catch (e){
        console.log(e);
    }
    
  };
  return userToken ? (
    <PageLoader />
  ) : (
    <Fragment>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper auth p-0 theme-two">
            <div className="row d-flex align-items-stretch">
              <div className="col-md-4 banner-section d-none d-md-flex align-items-stretch justify-content-center">
                <div className="slide-content bg-1"></div>
              </div>
              <div className="col-12 col-md-8 h-100 bg-white">
                <div className="auto-form-wrapper d-flex align-items-center justify-content-center flex-column">
                  <form onSubmit={handleSubmit(submitForm)}>
                    <h3 className="mr-auto">RESET PASSWORD</h3>
                    <p className="mb-5 mr-auto">Enter your email below. { token } </p>
                    {/* <p> {error && <Error>{error}</Error>}</p> */}
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="E-mail"
                          value={isEmail}
                          {...register("email")}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter Password"
                          {...register("password")}
                          required
                        />
                      </div>
                    </div>


                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          {...register("confpassword")}
                          required
                        />
                      </div>
                    </div>
                   
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Reset"}
                      </button>
                     
                    </div>
                    <div className="wrapper mt-5 text-gray">
                      <p className="footer-text">
                        Copyright © 2023 CMS IBEDC. All rights reserved.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
