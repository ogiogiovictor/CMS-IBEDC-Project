import { customerActions } from "./customerSlice";


export const fetchCustomers = () => {

    return async (dispatch) => {

        const LoadCustomers = async () => {

        const response = await fetch('https://apiengine.ibedc.com:7443/api/get_customers');
        if(!response.ok){
            throw new Error('Error Fetching Data');
        };
        const data = await response.json();
        return data;

        }

        try {
            const catchCustomer =  await LoadCustomers();
            dispatch(customerActions.allcustomers({
                customer: catchCustomer.data ||  []
            }));
            } catch(error) {
                console.log(error);
               /* dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Error Sending Card',
                }));
                */
            }
     }
}