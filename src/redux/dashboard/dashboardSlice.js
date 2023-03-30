import fetchDashboardStats from "./dashboard_data";

const initialState = [];

//Create action constants - Theses are called action types
const GET_DASHBOARD_STATS = 'dash/GET_DASHBOARD_STATS';


//Action creators for the action constant
const getDashboardStats = () => async (dispatch) => {
    const dashboard_data = await fetchDashboardStats();
    dispatch({
        type: GET_DASHBOARD_STATS,
        payload: dashboard_data,
    });
}

//Reducers that recievees the actions and updates the states
const DashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DASHBOARD_STATS:
            return action.payload
        default:
            return state;
    }
}

export { getDashboardStats }
export default DashboardReducer;