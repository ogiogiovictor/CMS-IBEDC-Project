import React, { Fragment, useState, useEffect  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation, useGetRoleQuery } from '../../redux/services/user/userService';
import { setRole } from '../../redux/auth/authSlice';
import AuthorityDropdown from '../../redux/services/user/authorityDropdown';
import { notify } from '../../utils/notify';
//import { useForm } from 'react-hook-form';

const AddUser = () => {

  const [isProcessing, setIsProcessing] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    authority: '',
    region: '',
    business_hub: '',
    service_center: '',

  });

  const [selectedAuthority, setSelectedAuthority] = useState('');

  const userRole =  useSelector((state) => state.user.roles);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetRoleQuery();

    useEffect(() => {
    if (data) {
     // refetch();
      dispatch(setRole(data));
    }
 }, [data, dispatch ]);


 console.log(data);

  const onSelectChangeAuthorityHandler = (e) => {
    setSelectedAuthority(e.target.value);
  };

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  //const { register, handleSubmit, errors } = useForm();
  const [ registerUser ] = useRegisterUserMutation();

  const postUser = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
   // const { name, email, password, authority, region, business_hub, service_center } = values;
    const idata = { 
      authority: selectedAuthority,
      business_hub: values.business_hub,
      email: values.email,
      name: values.name,
      password: values.password,
      region: values.region,
      service_center: values.service_center
    }

    if(!idata.authority){
      notify("error", "Please Select Authority");
      setIsProcessing(false);
      return;
    }

    if(!idata.email || !idata.name){
      notify("error", "Please enter email and name");
      setIsProcessing(false);
      return;
    }


    try {

      const result =  await registerUser(idata).unwrap();
      console.log(result);

    }catch(e) {
      setIsProcessing(false);
      console.log(e);
    }

    
    
  }

  const region = (<div className="form-group">
  <label htmlFor="region">Region</label>
   <select value={values.region} name="region" className="form-control"  onChange={onChangeHandler}>
     <option value="">Select Region</option>
     <option value="business_hub">Region</option>
     <option value="business_hub">Ogun</option>
     <option value="business_hub">Oyo</option>
     <option value="business_hub">Kwara</option>
     <option value="business_hub">Osun</option>
   </select>
  <small>Authority Cannot be empty</small>
</div>);

const businessHub = (
  <div className="form-group">
    <label htmlFor="surname">Business Hub</label>
    <select value={values.business_hub} name="business_hub" className="form-control" onChange={onChangeHandler}>
      <option value="business_hub">Edd</option>
      <option value="business_hub">Ijeun</option>
      <option value="business_hub">Apata</option>
    </select>
    <small>Authority Cannot be empty</small>
  </div>
);

const serviceCenter = (
  <div className="form-group">
  <label htmlFor="surname">Service Centre</label>
   <select value={values.service_center} name="service_center" className="form-control" onChange={onChangeHandler}>
     <option value="business_hub">Region</option>
     <option value="business_hub">Business Hub</option>
     <option value="business_hub">Service Center</option>
   </select>
  <small>Authority Cannot be empty</small>
</div>
);

 
    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ADD USERS</h4> 
                  <p className="card-description">
                  <hr/>
                   All Users
                   <hr/>
                  </p>

                 
                  <form className="forms-sample" onSubmit={postUser}>
                    
                    { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                       
                     <div className="form-group">
                       <label htmlFor="surname">Full Name</label>
                       <input type="text" 
                       className="form-control" 
                       name="name"
                       //{...register('name', { required: true })}
                       value={values.name}
                       onChange={onChangeHandler}
                       placeholder="Enter Fullname"
                       />
                       <small>User Name Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="email">Email</label>
                       <input type="email" 
                       className="form-control" 
                       //{...register('email', { required: true })}
                       name="email"
                       value={values.email}
                       onChange={onChangeHandler}
                       placeholder="Enter Email"
                       />
                       <small>User Email Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="password">Password</label>
                       <input type="password" 
                       className="form-control" 
                       //{...register('password', { required: true })}
                       name="password"
                       value={values.password}
                       onChange={onChangeHandler}
                       placeholder="Enter Password" required
                       />
                       <small>User Password Cannot be empty</small>
                     </div>

                     <AuthorityDropdown onChange={onSelectChangeAuthorityHandler} value={selectedAuthority} />

                     {selectedAuthority === 'region' && (
                      <Fragment>
                      {region}
                    </Fragment>
                     )}

                     {selectedAuthority === 'business_hub' && (
                       <Fragment>
                       {region}
                       {businessHub}
                     </Fragment>
                     )}

                  {selectedAuthority === 'service_center' && (
                    <Fragment>
                       {region}
                       {businessHub}
                      {serviceCenter}
                    </Fragment>
                  )}



                  <div className="form-group">
                       <label htmlFor="surname">Select Role</label>
                        <select value={values.service_center} className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          <option value="business_hub">User</option>
                          <option value="business_hub">Teamlead</option>
                          <option value="business_hub">Admin</option>
                        </select>
                       <small>Authority Cannot be empty</small>
                     </div>
                     
 
                    
                     <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                     {isProcessing ? 'Processing...' : 'Proceed'}
                     </button> </form> 
                  
                </div>
              </div>
            </div>

        </div>
    );
}

export default AddUser;