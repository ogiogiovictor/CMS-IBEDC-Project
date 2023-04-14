import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const login = () => {
  return (
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
                  <form action="#">
                    <h3 className="mr-auto">Hello! let's get started</h3>
                    <p className="mb-5 mr-auto">Enter your details below.</p>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="icon-user-outline"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
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
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <Link
                        to="/dashboard"
                        className="btn btn-primary submit-btn"
                      >
                        SIGN IN
                      </Link>
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

export default login;
