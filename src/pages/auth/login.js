import React, { Fragment, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/auth/authActions";
import LoadingSpinner from "../../components/spinner";
import { useGetUserDetailsQuery } from "../../redux/services/auth/authService";

const Login = () => {
  const { loading, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { isFetching } = useGetUserDetailsQuery();
  // useEffect(() => {
  //   if (userToken) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate, userToken]);

  const navigateToDashboard = useCallback(() => {
    if (userToken) {
      navigate("/dashboard");
    }
  }, [userToken, navigate]);

  useEffect(() => {
    navigateToDashboard();
  }, [navigateToDashboard]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };
  return userToken ? (
    <LoadingSpinner />
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
                    <h3 className="mr-auto">Hello! let's get started</h3>
                    <p className="mb-5 mr-auto">Enter your details below.</p>
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
                          {...register("email")}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-lock"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          {...register("password")}
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
                        {loading ? "Loading..." : "Login"}
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

export default Login;
