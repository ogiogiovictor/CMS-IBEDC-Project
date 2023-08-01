import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import Cards from "../cards/cards";
import SecondCard from "../cards/secondcards";
import RecentCustomer from "../customers/recentcustomer";
import { useGetDashboardStatsQuery } from "../../redux/services/auth/authService";
import { setDashboardStats } from "../../redux/auth/authSlice";
import PageLoader from "../spinner/loader";
import { notify } from '../../utils/notify';
import { useNavigate, useParams } from "react-router-dom";
import { logout, logoutAndDeleteTokens } from "../../redux/auth/authSlice";


const Dashboard = () => {

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetDashboardStatsQuery("dashboardStats", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });


  console.log(error);
  if(error){
    notify('Error', error);
    dispatch(logout());
    navigate(`/errorpage`);

  }

  const { dashboardStats } = useSelector((state) => state.auth);
  


  useEffect(() => {
    if (data) {
      dispatch(setDashboardStats(data?.data));
    }
  }, [data, dispatch]);

  console.log(data);

  return isFetching ? (
    <PageLoader />
  ) : (
    <Fragment>
      <Cards stats={dashboardStats} />
      <SecondCard stats={dashboardStats} />
      <RecentCustomer recentCustomer={dashboardStats?.recent_customers} />
    </Fragment>
  );
};

export default Dashboard;
