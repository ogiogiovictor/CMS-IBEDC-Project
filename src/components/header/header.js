import React, { useEffect, Fragment } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../../redux/services/auth/authService";
//import { useGetLogOutMutation } from "../../redux/services/user/userService";
import { logout, setCredentials, logoutAndDeleteTokens } from "../../redux/auth/authSlice";
import { notify } from "../../utils/notify";

import "./header.css";
import PageLoader from "../spinner/loader";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  const { data, isFetching, error } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });


  if(error && error.originalStatus === 500) {
    dispatch(logout());
    notify("error", "An error occurred, you have not been properly profiled");
  }

  if(error && error.originalStatus === 401) {
    dispatch(logout());
    notify("error", "An error occurred while fetching user details.");
  }

 
  useEffect(() => {
    if (data && !localStorage.getItem("userMenu")) {
      localStorage.setItem("userMenu", JSON.stringify(data));
    } else if (data) {
      const storedData = JSON.parse(localStorage.getItem("userMenu"));
      if (storedData && JSON.stringify(storedData) !== JSON.stringify(data)) {
        localStorage.setItem("userMenu", JSON.stringify(data));
      }
    }
  }, [data, localStorage]);
  

  useEffect(() => {
    if (data && data?.data?.name) {
      dispatch(setCredentials(data?.data));
    }
  }, [data, dispatch]);


  const storedData = JSON.parse(localStorage.getItem("userMenu"));
  console.log(storedData)

  const renderSubmenuItems = (submenus) => {
    return submenus?.map((submenu) => (
      <li className="nav-item" key={submenu.id}>
        <NavLink className="nav-link" to={submenu.sub_menu_url}>
          {/* {submenu.name} */}
          {submenu.sub_menu_name}
        </NavLink>
      </li>
    ));
  };


  const renderMenuItems = () => {
    return storedData?.data?.menus?.map((menu) => (
      <li className="nav-item" key={menu.id}>
        <a href="#" className="nav-link">
          <i className="link-icon icon-disc"></i>
          <span className="menu-title">{menu.menu_name}</span>
          <i className="menu-arrow"></i>
        </a>
        <div className="submenu">
          <ul className="submenu-item">
            {renderSubmenuItems(menu.submenu)}
          </ul>
        </div>
      </li>
    ));
  };


  
 
  //const [ postLogout ] = useGetLogOutMutation();

  const handleLogout = async (e)  =>  {
  //   e.preventDefault();
  dispatch(logoutAndDeleteTokens(userInfo?.id));
  //   localStorage.removeItem("userToken");
  //   localStorage.removeItem("userInfo");
  //   localStorage.removeItem("userMenu");
   
  //   try{

  //     const result =  await postLogout({"userid": userInfo?.id}).unwrap();
  //     console.log(result);
  //     navigate("/");
  
  //   }catch(error){
  //     console.log(error)
  //   }
  };


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
                <div className="form-group mb-0">
                  <div className="input-group"> ({`${userInfo?.authority}`})
                  </div>
                </div>
              <ul className="navbar-nav navbar-nav-right mr-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="notificationDropdown"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <i className="icon-settings"></i>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                    aria-labelledby="notificationDropdown"
                  >
                   
                    <div className="dropdown-divider"></div>
                    <a href="/change_password" className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-inverse-warning">
                          <i className="icon-settings mx-0"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <h6 className="preview-subject font-weight-normal text-dark mb-1">
                          Settings
                        </h6>
                        <p className="font-weight-light small-text mb-0">
                          Change Password
                        </p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
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

          {renderMenuItems()}

              {/* <li className="nav-item">
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
              </li> */}


               {/* <li className="nav-item">
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
                    
                  </ul>
                </div>
              </li>  */}

              {/* <li className="nav-item">
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
                  </ul>
                </div>
              </li> */}

              {/* <li className="nav-item">
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
                      <NavLink className="nav-link" to="/amievents">
                        Events Analysis
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li> */}




              {/* <li className="nav-item">
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
              </li> */}
  

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="link-icon icon-docs"></i>
                  <span className="menu-title">Administration</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="submenu">
                  <ul className="submenu-item">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/allusers"
                      >
                       User
                      </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink
                        className="nav-link"
                        to="/locations"
                      >
                        Locations
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li> */}


            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
