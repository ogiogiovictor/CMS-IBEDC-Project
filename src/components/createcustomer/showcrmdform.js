import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { notify  } from '../../utils/notify';
import { usePushCRMDCustomerMutation } from '../../redux/services/crmd/crmdservice';
import { useForm } from 'react-hook-form';


const SHOWCRMFORM = ({data}) => {

  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    account_no: data?.AccountNo,
    meter_no: data?.MeterNo,
    surname: data?.Surname,
    first_name: data?.FirstName,
    other_names: data?.OtherNames,
    accountType: data?.AccountType,
    address: data?.Address,
    mobile: data?.Mobile,
    dss: data?.DistributionID,
    new_firstname: '',
    new_surname: '',
    new_address: '',
    new_mobile: '',

  });

  const onChangeHandler = (e) => {
    console.log(e.target.value)
    setValues({...values, [e.target.name]: e.target.value})
  }

  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // }
  
  const [ postMyCustomers ] = usePushCRMDCustomerMutation();


  const onSubmit = async (fdata) => {

  
    const idata = {  
      AccountNo: values?.account_no,
      MeterNo : values?.meter_no,
      AcountType : data?.AccountType,
      Old_FullName : data?.Surname,
      New_FullName: data?.Surname,
      Address:  data?.Address,
      DistributionID : values?.dss,
      mobile: fdata.new_mobile ?? data?.Mobile,
      new_firstname: fdata.new_firstname,
      new_surname: fdata.new_surname,
      new_address: fdata.new_address,
    }
    // const ndata = {
    //   ...fdata
    // }

    console.log("Type of idata:", typeof idata);
    console.log('Request Data:', idata);

    try{
     
      setIsProcessing(true);
      const result =  await postMyCustomers(idata).unwrap();
      console.log(result)
      if(result.data.id){
        notify('success', "CRMD Successfully Created");
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
            <div className="col-md-12 grid-margin stretch-card">
              
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                      
                    <div className="form-group">

                        <div className="row">
                          

                           <div className="col-md-6">
                                <label htmlFor="surname">AccountNo</label>
                                <input type="text" 
                                className="form-control" 
                                name="account_no"
                                 value={values?.account_no}
                                {...register('account_no')}
                                readOnly
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">MeterNo</label>
                                <input type="text" 
                                className="form-control" 
                                name="meterNo"
                                 value={values?.meter_no}
                                {...register('meterNo')}
                                readOnly
                                />
                                <hr/>
                            </div>


                            <div className="col-md-6">
                                <label htmlFor="surname">Surname</label>
                                <input type="text" 
                                className="form-control" 
                                name="surname"
                                 value={values?.surname}
                                // onChange={onChangeHandler}
                                 {...register('surname')}
                                readOnly
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">FirstName</label>
                                <input type="text" 
                                className="form-control" 
                                name="first_name"
                                 value={values?.first_name}
                                {...register('first_name')}
                                readOnly
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">New Surname</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_surname"
                                 onChange={onChangeHandler}
                                // value={values?.other_names}
                                {...register('new_surname')}
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">New Firstname</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_firstname"
                                 onChange={onChangeHandler}
                                // value={values?.other_names}
                                {...register('new_firstname')}
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">AccountType</label>
                                <input type="text" 
                                className="form-control" 
                                name="accountType"
                                value={values?.accountType}
                                readOnly
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">DistributionID</label>
                                <input type="text" 
                                className="form-control" 
                                name="dss"
                                 value={values?.DistributionID}
                                {...register('dss')}
                                /> <hr/>
                            </div>


                            <div className="col-md-12">
                                <label htmlFor="surname">Address</label>
                                <input type="text" 
                                className="form-control" 
                                name="address"
                                value={values?.address}
                                readOnly
                                /> <hr/>
                            </div>

                            <div className="col-md-12">
                                <label htmlFor="surname">New Address</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_address"
                                // onChange={onChangeHandler}
                                {...register('new_address')}
                                /> <hr/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="surname">Mobile</label>
                                <input type="text" 
                                className="form-control" 
                                name="mobile"
                                 value={values?.mobile}
                                {...register('mobile')}
                                /> <hr/>
                            </div>


                            
                            <div className="col-md-6">
                                <label htmlFor="surname">New Mobile</label>
                                <input type="text" 
                                className="form-control" 
                                name="new_mobile"
                                {...register('new_mobile')}
                                /> <hr/>
                            </div>


                          <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                          {isProcessing ? 'Processing...' : 'SUBMIT'}
                          </button>

                        </div>

                    </div>
                    
                  </form> 
              
                  
                </div>
              </div>
          

    );
}

export default SHOWCRMFORM;