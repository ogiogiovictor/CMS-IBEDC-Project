import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import Cards from '../cards/cards';
import SecondCard from '../cards/secondcards';
import RecentCustomer from '../customers/recentcustomer';
import { getDashboardStats } from '../../redux/dashboard/dashboardSlice';


const Dashboard = () => {

    const dashboardData = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();
   
   
    useEffect(() => {
        if(!dashboardData.length){
            dispatch(getDashboardStats());
        }
    }, [dashboardData.length]);

    return (
       
        <Fragment>
            <Cards stats={dashboardData} />
            <SecondCard />
            <RecentCustomer />
        </Fragment>
    );
}

export default Dashboard;