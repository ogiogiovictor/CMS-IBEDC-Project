const url = "http://localhost:8000/api/get_dashboard_stats";

const fetchDashboardStats = async () => {
    const response = await fetch(url);
    const mdata = await response.json();
    
    const dashboardData = {
        total_customers: mdata.data.total_customers,
        total_dss: mdata.data.total_dss,
        crm_tickets: mdata.data.crm_tickets,
        feeder_11: mdata.data.feeder_11,
        feeder_33: mdata.data.feeder_33
    };
    
    return dashboardData;
};

export default fetchDashboardStats;
