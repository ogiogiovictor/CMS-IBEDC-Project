import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { notify  } from '../../utils/notify';
import { usePushCRMDCustomerMutation } from '../../redux/services/crmd/crmdservice';
import { useForm } from 'react-hook-form';


const EDITCUSTOMERSCRMD = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { dashboardStats } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch(); //This is the hook that allows us to dispatch actions to the store
  const navigate = useNavigate();
  const location = useLocation();

  

  const rowData = location.state.rowData;
  const rowTitle = location.state.rowTitle;
  const rowSubTitle = location.state.rowSubTitle;
  const routeName = location.state.routeName;
  const [values, setValues] = useState({});

  const [dss, setDSS] = useState(rowData.DistributionID);
  const [surname, setSurname] = useState(rowData.new_surname);
  const [firstname, setFirstname] = useState(rowData.new_firstname);
  const [mobile, setMobile] = useState(rowData.mobile);
  const [address, setAddress] = useState(rowData.new_address);


  

const handleDSSChange = (e) => {
    setDSS(e.target.value);
};

const handleSurnameChange = (e) => {
  setSurname(e.target.value);
};

const handleFirstNameChange = (e) => {
  setFirstname(e.target.value);
};


const handleMobileChange = (e) => {
  setMobile(e.target.value);
};

const handleAddressChange = (e) => {
  setAddress(e.target.value);
};


  const [ postMyCustomers ] = usePushCRMDCustomerMutation();

  
  
  const onChangeHandler = (e) => {
    console.log(e.target.value)
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onSubmit = async (fdata) => {

    
console.log(fdata)

    try{
   
      setIsProcessing(true);
      const result =  await postMyCustomers(...fdata).unwrap();
      console.log(result)
      if(result.data.id){
        notify('success', "CRMD Successfully Updated");
        setIsProcessing(false);
        navigate('/viewcustomers');
      }
    

    }catch(e){
      console.log(e)
      setIsProcessing(false);
    }
  
    

  }


    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">EDIT CUSTOMERS - CRMD</h4>
                  <p className="card-description">
                  <hr/>
                   Customer Record Management Document - { rowSubTitle } &nbsp;&nbsp;&nbsp; <button className="btn btn-xs btn-danger">{rowData.approval_type}</button>
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                    
                
                    <div className="form-group">

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="surname">Enter AccountNo</label>
                                <input type="text" 
                                className="form-control" 
                                name="account_no"
                                value={rowData.AccountNo}
                                {...register('account_no')}
                                />
                            </div>


                            <div className="col-md-6">
                                <label htmlFor="surname">MeterNo</label>
                                <input type="text" 
                                className="form-control" 
                                name="meterNo"
                                value={rowData.MeterNo}
                                {...register('meterNo')}
                                readOnly
                                />
                                  <br/>
                            </div>


                            <div className="col-md-6">
                                <label htmlFor="surname">DSS ID</label>
                                <input type="text" 
                                className="form-control" 
                                name="dss"
                                onChange={handleDSSChange}
                                value={dss}
                                {...register('dss')}
                                />
                            </div>


                            <div className="col-md-6">
                                <label htmlFor="surname">Account Type</label>
                                <input type="text" 
                                className="form-control" 
                                name="accountType"
                                value={rowData.AcountType}
                                readOnly
                                {...register('accountType')}
                                />
                                  <br/>
                            </div>

                          

                            <div className="col-md-6">
                                <label htmlFor="surname">Customer Name</label>
                                <input type="text" 
                                className="form-control" 
                                name="first_name"
                                value={rowData.Old_FullName}
                                readOnly
                                {...register('first_name')}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">New Surname</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_surname"
                                value={surname}
                                onChange={handleSurnameChange}
                                {...register('new_surname')}
                                />
                                 <br/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">New Firstname</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_firstname"
                                value={firstname}
                                onChange={handleFirstNameChange}
                                {...register('new_firstname')}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">Mobile</label>
                                <input type="text" 
                                className="form-control" 
                                name="mobile"
                                value={mobile}
                                onChange={handleMobileChange}
                                {...register('mobile')}
                                />
                                 <br/>
                            </div>


                            <div className="col-md-12">
                                <label htmlFor="surname">Address</label>
                                <input type="text" 
                                className="form-control" 
                                name="address"
                                value={rowData.Address}
                                readOnly
                                {...register('address')}
                                />
                                 <br/>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="surname">New Address</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_address"
                                value={address}
                                onChange={handleAddressChange}
                                {...register('new_address')}
                                />
                                 <br/>

                                 <input type="hidden" name="id" value={rowData.id} {...register('id')} />
                            </div>


                           

                            {/* <div className="col-md-6">

                                <label htmlFor="surname">Account Type</label>
                                <select name="account_type" className="form-control" >
                                    <option value="">Select Account Type</option>
                                    <option value="Prepaid">Prepaid</option>
                                    <option value="Postpaid">Postpaid</option>
                                </select>
                                <small>Account Type Cannot be empty</small>
                            </div> */}

                        </div>

                    </div>

                  
                    <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Submit'}
                    </button>
                  </form> 



                  
                </div>
              </div>
            </div>


        </div>
    );
}

export default EDITCUSTOMERSCRMD;