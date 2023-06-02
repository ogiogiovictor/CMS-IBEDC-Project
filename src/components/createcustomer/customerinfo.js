import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCustomerInfoQuery } from "../../redux/services/customer/customerService";
import { setCustomerInfo } from "../../redux/customer/customerSlice";
import PageLoader from "../spinner/loader";
import CustomerWidget from "./customerwidget";

const CustomerInfo = () => {
  const dispatch = useDispatch();
  const { FAccount, DistributionID, AccountType, MeterNo } = useParams();
  const { customerInfo } = useSelector((state) => state.customer) || {};

  const { data, isFetching } = useGetCustomerInfoQuery(
    { FAccount, DistributionID, AccountType, MeterNo },
    "",
    { pollingInterval: 900000 }
  );

  useEffect(() => {
    if (data) {
      dispatch(setCustomerInfo(data?.data));
    }
  }, [data, dispatch]);

  return isFetching ? (
    <PageLoader />
  ) : (
    <>
      <CustomerWidget customerInfo={customerInfo} />
    </>
  );
};

export default CustomerInfo;
