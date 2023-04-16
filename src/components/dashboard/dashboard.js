import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import Cards from '../cards/cards';
import SecondCard from '../cards/secondcards';
import RecentCustomer from '../customers/recentcustomer';
import { getDashboardStats } from '../../redux/dashboard/dashboardSlice';
import { useGetDashboardStatsQuery } from '../../redux/services/auth/authService';
import { setDashboardStats } from '../../redux/auth/authSlice';


const Dashboard = () => {
    const { data, isFetching } = useGetDashboardStatsQuery("dashboardStats", {
        // perform a refetch every 15mins
        pollingInterval: 900000,
      });

      const { dashboardStats } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   
   
    // useEffect(() => {
    //     if(!dashboardData.length){
    //         dispatch(getDashboardStats());
    //     }
    // }, [dashboardData.length]);

    useEffect(() => {
        if (data) {
          dispatch(setDashboardStats(data?.data));
        }
      }, [data, dispatch]);

    console.log(data);

    return (
       
        <Fragment>
            <Cards stats={dashboardStats} />
            <SecondCard stats={dashboardStats}/>
            <RecentCustomer />
        </Fragment>
    );
}

export default Dashboard;