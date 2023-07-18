import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomerInfoTable } from "./customerinfotable";
import DataTable from "../datatable";

const CustomerWidget = ({ customerInfo }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  console.log(customerInfo);

  const handleActionClick = ({ FAccountNo, DistributionID }) => {
    navigate(`/customerinfo/${FAccountNo}/${DistributionID}`);
    window.scrollTo(0, 0);
  };

  const handBillClick = ({ FAccountNo, DistributionID }) => {
    navigate(`/customerinfo/${FAccountNo}/${DistributionID}`);
    window.scrollTo(0, 0);
  };

  const handleTicketBillClick = ({ FAccountNo, DistributionID }) => {
    navigate(`/customerinfo/${FAccountNo}/${DistributionID}`);
    window.scrollTo(0, 0);
  };

  const hanleEventClick = ({ FAccountNo, DistributionID }) => {
   // navigate(`/customerinfo/${FAccountNo}/${DistributionID}`);
    window.scrollTo(0, 0);
  };

  

  const customePaymentsColumns = [
    { title: "Trans ID", field: "receiptnumber" },
    { title: "AccountNo", field: "AccountNo" },
    { title: "Pay Year", field: "PayYear" },
    { title: "Pay Month", field: "PayMonth" },
    { title: "Business Hub", field: "BusinessUnit" },
    { title: "Amount", field: "Payments" },
    { title: "Processed", field: "Processed" },
  ];

  const customePrepaidColumns = [
    { title: "Date", field: "TransactionDateTime" },
    { title: "AccountNo", field: "AccountNo" },
    { title: "Meter No", field: "MeterNo" },
    { title: "Business Hub", field: "BUID" },
    { title: "Amount", field: "Amount" },
    { title: "Units", field: "Units" },
    { title: "Cost Unit", field: "CostOfUnits" },
  ]


  const customerBillsColumns = [
    { title: "Bill Date", field: "Billdate" },
    { title: "Bill Year", field: "BillYear" },
    { title: "Bill Month", field: "BillMonthName" },
    { title: "Business Hub", field: "BUName1" },
    { title: "Current Charge", field: "CurrentChgTotal" },
    { title: "Last Payment", field: "LastPayAmount" },
  ];

  const ticketColumns = [
    { title: "Date Created", field: "opened_at" },
    { title: "Ticket No", field: "ticket_no" },
    { title: "Category", field: "category_id" },
    { title: "Classification", field: "classification" },
    { title: "Location", field: "location_id" },
    { title: "Status", field: "status" },
  ]

  const EventColumns = [
    { title: "Meter", field: "MSNO" },
    { title: "Date", field: "SAVEDB_TIME" },
    { title: "KWH", field: "KWH_ABS" },
    { title: "Region", field: "Region" },
    { title: "Business Hub", field: "BusinessHub" },
    { title: "Transformer", field: "Transformer" },
    { title: "AssetType", field: "AssetType" },
  ]

 

  return (
    <>
      <div className="row profile-page">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                {customerInfo?.FirstName} {customerInfo?.Surname}{" "}
                {customerInfo?.OtherNames} (360 Overview) - {customerInfo?.AccountType}
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
                        <CustomerInfoTable customerInfo={customerInfo} />

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
                                <p>{customerInfo?.SetupDate}</p>
                              </div>
                              <div class="stages border-left pl-5 pb-4">
                                <div class="btn btn-icons btn-rounded stage-badge btn-inverse-danger">
                                  <i class="icon-cloud-download"></i>
                                </div>
                                <div class="d-flex align-items-center mb-2 justify-content-between">
                                  <h5 class="mb-0">Customer Adjustment</h5>
                                </div>
                                <p>
                                  {" "}
                                  <td>
                                     <Link to={`/createcaad/${customerInfo.CustomerSK}`}>
                                      <button class="btn btn-xs btn-info">
                                        <i class="icon-user"></i>Create CAAD
                                      </button>
                                    </Link>
                                  </td>
                                </p>
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

                        {customerInfo?.payments?.length !== 0  &&  customerInfo?.AccountType == 'Postpaid' ? (
                          <DataTable
                            data={customerInfo?.payments}
                            columns={customePaymentsColumns}
                            pagination
                            currentPage={1}
                            totalCount={1}
                            pageSize={1}
                            onActionClick={handleActionClick}
                          />
                        ) : (
                          <p className="text-center">&nbsp;</p>
                        )}

                      {customerInfo?.transactions?.length !== 0  &&  customerInfo?.AccountType == 'Prepaid' ? (
                          <DataTable
                            data={customerInfo?.transactions}
                            columns={customePrepaidColumns}
                            pagination
                            currentPage={1}
                            totalCount={1}
                            pageSize={1}
                            onActionClick={handleActionClick}
                          />
                        ) : (
                          <p className="text-center">&nbsp;</p>
                        )}


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
                       
                        {customerInfo?.bills?.length !== 0 ? (
                          <DataTable
                            data={customerInfo?.bills}
                            columns={customerBillsColumns}
                            pagination
                            currentPage={1}
                            totalCount={1}
                            pageSize={1}
                            onActionClick={handBillClick}
                          />
                        ) : (
                          <p className="text-center">No Bills Found</p>
                        )}

                        </div>
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-asset"
                        role="tabpanel"
                        aria-labelledby="user-profile-asset-tab"
                      >
                       <CustomerInfoTable customerInfo={customerInfo?.distribution} />
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-metering"
                        role="tabpanel"
                        aria-labelledby="user-profile-metering-tab"
                      >
                      
                        <h4>Customer Metering Information (MSMS)</h4><hr/>
                        <CustomerInfoTable customerInfo={customerInfo?.msmsCustomerInfo ?? ''} />
                        <hr/><h4>Customer Metering Information (MSMS)</h4><hr/>
                        <CustomerInfoTable customerInfo={customerInfo?.msmsCustomerInfo?.customer_meters ?? ''} />
                        <hr/><h4>Other Relevant Metering Information (MSMS)</h4><hr/>
                        <CustomerInfoTable customerInfo={customerInfo?.msmsCustomerInfo?.meter_details[0] ?? ''} />
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-ticket"
                        role="tabpanel"
                        aria-labelledby="user-profile-ticket-tab"
                      >
                         {customerInfo?.tickets?.length !== 0 ? (
                          <DataTable
                            data={customerInfo?.tickets}
                            columns={ticketColumns}
                            pagination
                            currentPage={1}
                            totalCount={1}
                            pageSize={1}
                            onActionClick={handleTicketBillClick}
                          />
                        ) : (
                          <p className="text-center">No Tickets Found</p>
                        )}
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-energy"
                        role="tabpanel"
                        aria-labelledby="user-profile-energy-tab"
                      >
                        <h4>Energy Information </h4><hr/>
                        {customerInfo?.amiEvents?.length !== 0 ? (
                          <DataTable
                            data={customerInfo?.amiEvents?.data}
                            columns={EventColumns}
                            pagination
                            currentPage={1}
                            totalCount={1}
                            pageSize={1}
                            onActionClick={hanleEventClick}
                          />
                        ) : (
                          <p className="text-center">No Events Found</p>
                        )}
                      </div>

                      <div
                        class="tab-pane fade"
                        id="user-profile-disconnection"
                        role="tabpanel"
                        aria-labelledby="user-profile-disconnection-tab"
                      >
                         <h4>Disconnection Information </h4><hr/>
                        <CustomerInfoTable customerInfo={customerInfo?.disconnections} />
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
  );
};

export default CustomerWidget;
