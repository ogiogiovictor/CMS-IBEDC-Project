import React, { useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../redux/services/auth/authService";
import { logout, setCredentials } from "../../redux/auth/authSlice";

import "./header.css";
import PageLoader from "../spinner/loader";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data && data?.data?.name) {
      dispatch(setCredentials(data?.data));
    }
  }, [data, dispatch]);

  return isFetching ? (
    <PageLoader />
  ) : (
    <Fragment>
      <nav className="navbar horizontal-layout col-lg-12 col-12 p-0">
        <div className="nav-top flex-grow-1">
          <div className="container d-flex flex-row h-100">
            <div className="text-center navbar-brand-wrapper d-flex align-items-top">
              <NavLink
                className="navbar-brand brand-logo brand-logo-header"
                to="/"
              >
                IBEDC CMS
              </NavLink>
              <NavLink className="navbar-brand brand-logo-mini" to="/">
                IBEDC CMS
              </NavLink>
            </div>
            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <form className="search-field" action="#">
                <div className="form-group mb-0">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="icon-magnifier"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
              <ul className="navbar-nav navbar-nav-right mr-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="notificationDropdown"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <i className="icon-bell"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                    aria-labelledby="notificationDropdown"
                  >
                    <a className="dropdown-item py-3">
                      <p className="mb-0 font-weight-medium float-left">
                        You have 4 new notifications
                      </p>
                      <span className="badge badge-pill badge-inverse-info float-right">
                        View all
                      </span>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-inverse-success">
                          <i className="icon-exclamation mx-0"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <h6 className="preview-subject font-weight-normal text-dark mb-1">
                          Application Error
                        </h6>
                        <p className="font-weight-light small-text mb-0">
                          Just now
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-inverse-warning">
                          <i className="icon-bubble mx-0"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <h6 className="preview-subject font-weight-normal text-dark mb-1">
                          Settings
                        </h6>
                        <p className="font-weight-light small-text mb-0">
                          Private message
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-inverse-info">
                          <i className="icon-user-following mx-0"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <h6 className="preview-subject font-weight-normal text-dark mb-1">
                          New user registration
                        </h6>
                        <p className="font-weight-light small-text mb-0">
                          2 days ago
                        </p>
                      </div>
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    onClick={() => dispatch(logout())}
                  >
                    <i className="icon-logout" title="Logout"></i>
                  </NavLink>
                </li>
                <li className="nav-item nav-profile">
                  <a className="nav-link" href="#">
                    {/* <span className="nav-profile-text">
                        Hello {userInfo?.name}
                      </span> */}
                    <span>{`Hello ${userInfo?.name}`}</span>
                    <img
                      src="http://via.placeholder.com/36x36"
                      className="rounded-circle"
                      alt="profile"
                    />
                  </a>
                </li>
              </ul>
              <button
                className="navbar-toggler align-self-center"
                type="button"
                data-toggle="minimize"
              >
                <span className="icon-menu text-white"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="container">
            <ul className="nav page-navigation">
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="link-icon icon-screen-desktop"></i>
                  <span className="menu-title">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-disc"></i>
                  <span className="menu-title">Customers</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/createcustomer">
                        Create Customer
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/customers/postpaid">
                        Postpaid
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/customers/prepaid">
                        Prepaid
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/payments">
                        Payments
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/bills">
                        Bills
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/customers">
                        All Customers
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-book-open"></i>
                  <span className="menu-title">Assets</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/transformers">
                        DSS Information
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/feeders">
                        Feeders
                      </NavLink>
                    </li>
                   
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/transmission">
                        Transmission Sub Stations
                      </NavLink>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink className="nav-link" to="/powertransformer">
                        Power Transformer
                      </NavLink>
                    </li> */}
                    
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-pie-chart"></i>
                  <span className="menu-title">Customer Complaint</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/tickets">
                        Complaint
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/ccuperformance">
                        CCU Performance Report
                      </NavLink>
                    </li>
                   
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-wallet"></i>
                  <span className="menu-title">Events</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/mdacustomers">
                        MDA Customers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/powerupdown">
                        Event Analysis
                      </NavLink>
                    </li>
                    {/* <li className="nav-item">
                      <NavLink className="nav-link" to="/billdistribution">
                       Energy Reading
                      </NavLink>
                    </li> */}
                    
                  </ul>
                </div>
              </li>

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-calculator"></i>
                  <span className="menu-title">Staff</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/ibedcstaff">
                        IBEDC Staff
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/ibedcstaff">
                        Outsourced Staff
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/ibedcstaff">
                        Leave Management
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/ibedcstaff">
                        Reports
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li> */}

              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-disc"></i>
                  <span className="menu-title">Approvals</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/crmdetails"
                      >
                        Approve Customer
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        to="crmdetails"
                      >
                        CAAD
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  href="pages/documentation/documentation.html"
                  className="nav-link"
                >
                  <i className="link-icon icon-docs"></i>
                  <span className="menu-title">MAP Payments</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
