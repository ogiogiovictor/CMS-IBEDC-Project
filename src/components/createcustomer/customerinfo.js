import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useGetCustomerInfoQuery } from "../../redux/services/customer/customerService";
import { setCustomerInfo } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";

const CustomerInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1);
  };

  const { FAccount, DistributionID } = useParams();
  const { customerInfo } = useSelector((state) => state.customer) || {};

  const { data, isFetching } = useGetCustomerInfoQuery(
    { FAccount, DistributionID },
    "",
    {
      pollingInterval: 900000,
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(setCustomerInfo(data?.data));
    }
  }, [data, dispatch]);

  return (
    isFetching ? (
      <PageLoader />
    ) : (
    <>
      <div className="row profile-page">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                {customerInfo?.FirstName} {customerInfo?.Surname} {customerInfo?.OtherNames} (360 Overview)
              </h4>
              <Link onClick={goBack} class="btn btn-info btn-xs">
                <i class="icon-action-undo"></i>
              </Link>
              <div class="profile-body">
                <ul class="nav tab-switch" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="user-profile-info-tab"
                      data-toggle="pill"
                      href="#user-profile-info"
                      role="tab"
                      aria-controls="user-profile-info"
                      aria-selected="true"
                    >
                      Profile Information
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-activity-tab"
                      data-toggle="pill"
                      href="#user-profile-activity"
                      role="tab"
                      aria-controls="user-profile-activity"
                      aria-selected="false"
                    >
                      Customer Payment
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-bill-tab"
                      data-toggle="pill"
                      href="#user-profile-bill"
                      role="tab"
                      aria-controls="user-profile-bill"
                      aria-selected="false"
                    >
                      Customer Bills
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-asset-tab"
                      data-toggle="pill"
                      href="#user-profile-asset"
                      role="tab"
                      aria-controls="user-profile-asset"
                      aria-selected="false"
                    >
                      Asset
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-metering-tab"
                      data-toggle="pill"
                      href="#user-profile-metering"
                      role="tab"
                      aria-controls="user-profile-metering"
                      aria-selected="false"
                    >
                      Metering
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-ticket-tab"
                      data-toggle="pill"
                      href="#user-profile-ticket"
                      role="tab"
                      aria-controls="user-profile-ticket"
                      aria-selected="false"
                    >
                      Tickets
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-energy-tab"
                      data-toggle="pill"
                      href="#user-profile-energy"
                      role="tab"
                      aria-controls="user-profile-energy"
                      aria-selected="false"
                    >
                      Energy Allocation
                    </a>
                  </li>

                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="user-profile-disconnection-tab"
                      data-toggle="pill"
                      href="#user-profile-disconnection"
                      role="tab"
                      aria-controls="user-profile-disconnection"
                      aria-selected="false"
                    >
                      Disconnection
                    </a>
                  </li>
                </ul>

                <div class="row">
                  <div class="col-md-12">
                    <div class="tab-content tab-body" id="profile-log-switch">
                      <div
                        class="tab-pane fade show active pr-3"
                        id="user-profile-info"
                        role="tabpanel"
                        aria-labelledby="user-profile-info-tab"
                      >
                        <table class="table table-borderless w-100 mt-4">
                          <tr>
                            <td>
                              <strong>Account No :</strong> Johnathan Deo
                            </td>
                            <td>
                              <strong>Meter No :</strong> staradmin.com
                            </td>
                            <td>
                              <strong>Business Hub:</strong> Johnathan Deo
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Customer Type :</strong> USA
                            </td>
                            <td>
                              <strong>Customer Class :</strong>{" "}
                              Richard@staradmin.com
                            </td>
                            <td>
                              <strong>Service Band :</strong> Johnathan Deo
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Languages :</strong> English, German,
                              Spanish.
                            </td>
                            <td>
                              <strong>Phone :</strong> +73646 4563
                            </td>
                            <td>
                              <strong>Phone Number :</strong> Johnathan Deo
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Customer Address :</strong> English,
                              German, Spanish.
                            </td>
                            <td>
                              <strong>DSS ID :</strong> +73646 4563
                            </td>
                            <td>
                              <strong>DSS Name:</strong> Johnathan Deo
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <strong>Feeder :</strong> English, German,
                              Spanish.
                            </td>
                            <td>
                              <strong>Injection Sub Station :</strong> +73646
                              4563
                            </td>
                            <td>
                              <strong>Transmission:</strong> Johnathan Deo
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <strong>Latitude :</strong> English, German,
                              Spanish.
                            </td>
                            <td>
                              <strong>Longitude</strong> +73646 4563
                            </td>
                            <td>
                              <strong>Meter No:</strong> Johnathan Deo
                            </td>
                          </tr>
                        </table>

                        <div class="row">
                          <div class="col-12 mt-5">
                            <h5 class="mb-5">Other Information</h5>
                            <div class="stage-wrapper pl-4">
                              <div class="stages border-left pl-5 pb-4">
                                <div class="btn btn-icons btn-rounded stage-badge btn-inverse-success">
                                  <i class="icon-event"></i>
                                </div>
                                <div class="d-flex align-items-center mb-2 justify-content-between">
                                  <h5 class="mb-0">Date Added</h5>
                                </div>
                                <p>2023-10-19</p>
                              </div>
                              <div class="stages border-left pl-5 pb-4">
                                <div class="btn btn-icons btn-rounded stage-badge btn-inverse-danger">
                                  <i class="icon-cloud-download"></i>
                                </div>
                                <div class="d-flex align-items-center mb-2 justify-content-between">
                                  <h5 class="mb-0">Customer Staus</h5>
                                </div>
                                <p>
                                  {" "}
                                  <td>
                                    <Link to="/customerinfo">
                                      <button class="btn btn-xs btn-info">
                                        <i class="icon-user"></i>Active
                                      </button>
                                    </Link>
                                  </td>
                                </p>
                              </div>
                              <div class="stages pl-5 pb-4">
                                <div class="btn btn-icons btn-rounded stage-badge btn-inverse-primary">
                                  <i class="icon-checkbox-marked-circle-outline"></i>
                                </div>
                                <div class="d-flex align-items-center mb-2 justify-content-between">
                                  <h5 class="mb-0">Old Account No</h5>
                                </div>
                                <p>69/10/20349/-01</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-activity"
                        role="tabpanel"
                        aria-labelledby="user-profile-activity-tab"
                      >
                        <div class="form-group d-flex">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search Customers(s)..."
                          />
                          <button
                            type="submit"
                            className="btn btn-primary ml-3"
                          >
                            Search
                          </button>
                        </div>

                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>TransID</th>
                                <th>Surname</th>
                                <th>Firstname</th>
                                <th>Amount</th>
                                <th>Business Hub</th>
                                <th>TransRef</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>
                                  <i class="remove icon-close"></i>
                                </td>
                                <td>
                                  <label className="badge badge-danger">
                                    Active
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-outline-success">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>Jacob</td>
                                <td>
                                  <input
                                    class="checkbox"
                                    type="checkbox"
                                    checked=""
                                  />
                                </td>
                                <td>
                                  <label className="badge badge-warning">
                                    Suspended
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-danger">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>
                                  <label className="badge badge-info">
                                    Inactive
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-outline-success">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>
                                  <label className="badge badge-success">
                                    Active
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-outline-success">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>
                                  <label className="badge badge-warning">
                                    Closed
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-danger">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-bill"
                        role="tabpanel"
                        aria-labelledby="user-profile-bill-tab"
                      >
                        <div class="form-group d-flex">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search Customers(s)..."
                          />
                          <button
                            type="submit"
                            className="btn btn-primary ml-3"
                          >
                            Search
                          </button>
                        </div>

                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Bill ID</th>
                                <th>Surname</th>
                                <th>Firstname</th>
                                <th>Amount</th>
                                <th>Business Hub</th>
                                <th>TransRef</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>
                                  <i class="remove icon-close"></i>
                                </td>
                                <td>
                                  <label className="badge badge-info">
                                    Active
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-outline-success">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>Jacob</td>
                                <td>
                                  <input
                                    class="checkbox"
                                    type="checkbox"
                                    checked=""
                                  />
                                </td>
                                <td>
                                  <label className="badge badge-info">
                                    Suspended
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-danger">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>
                                  <label className="badge badge-info">
                                    Inactive
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-outline-success">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>
                                  <label className="badge badge-info">
                                    Active
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-outline-success">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>Jacob</td>
                                <td>53275531</td>
                                <td>12 May 2017</td>
                                <td>
                                  <label className="badge badge-info">
                                    Closed
                                  </label>
                                </td>
                                <td>
                                  <button className="btn btn-xs btn-danger">
                                    <i class="icon-user"></i>
                                    View
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-asset"
                        role="tabpanel"
                        aria-labelledby="user-profile-asset-tab"
                      >
                        <table class="table table-borderless w-100 mt-4">
                          <tr>
                            <td>
                              <strong>DSS ID :</strong> Johnathan Deo
                            </td>
                            <td>
                              <strong>DSS Name :</strong> staradmin.com
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Feeder Name :</strong> USA
                            </td>
                            <td>
                              <strong>Injection Substation :</strong> Johnathan
                              Deo
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Service Center :</strong> English, German,
                              Spanish.
                            </td>
                            <td>
                              <strong>Business Hub :</strong> +73646 4563
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>DSS Lat :</strong> English, German,
                              Spanish.
                            </td>
                            <td>
                              <strong>DSS Long :</strong> +73646 4563
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <strong>Pole :</strong> English, German, Spanish.
                            </td>
                            <td>
                              <strong>Upriser :</strong> +73646 4563
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <strong>Transmission Substation :</strong>{" "}
                              English, German, Spanish.
                            </td>
                            <td>
                              <strong>Power Transformer</strong> +73646 4563
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-metering"
                        role="tabpanel"
                        aria-labelledby="user-profile-metering-tab"
                      >
                        Customer Metering Information
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-ticket"
                        role="tabpanel"
                        aria-labelledby="user-profile-ticket-tab"
                      >
                        Customer Ticket Information
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-energy"
                        role="tabpanel"
                        aria-labelledby="user-profile-energy-tab"
                      >
                        Customer Energy Information
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-disconnection"
                        role="tabpanel"
                        aria-labelledby="user-profile-disconnection-tab"
                      >
                        Customer disconnection Information
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ));
};

export default CustomerInfo;
