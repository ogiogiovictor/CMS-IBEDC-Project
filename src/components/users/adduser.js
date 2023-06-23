import React, { Fragment, useState, useEffect  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation, useGetRoleQuery, useGetResourceListQuery } from '../../redux/services/user/userService';
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
    role: '',

  });

  const [selectedAuthority, setSelectedAuthority] = useState('');

  const userRole =  useSelector((state) => state.user.roles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isFetching } = useGetRoleQuery();
  const { data: getResource } = useGetResourceListQuery();

    useEffect(() => {
    if (data) {
      dispatch(setRole(data));
    }
 }, [data ]);

//console.log(getResource);

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
      service_center: values.service_center,
      role: values.role,
      level: `${values.region}, ${values.business_hub}, ${values.service_center}`,
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

    if(!idata.role){
      notify("error", "Please Select Role");
      setIsProcessing(false);
      return;
    }


    try {

      const result =  await registerUser(idata).unwrap();
      if(result.data.id){
        notify("error", result.message);
        setIsProcessing(false);
        navigate('/allusers');
      }
      //console.log(result);

    }catch(e) {
      setIsProcessing(false);
      console.log(e);
    }
    
  }

    //console.log(getResource.data.service_unit);

  // Get distinct values of 'name' property from the array
  const iregion = [...new Set(getResource?.data?.service_unit?.map(item => item.Region.toUpperCase()))];
  const biz_hub = [...new Set(getResource?.data?.service_unit?.map(item => item.Biz_Hub))];
  const service_center = [...new Set(getResource?.data?.service_unit?.map(item => item.Name))];

 
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBizHub, setSelectedBizHub] = useState("");
  const [selectedServiceCenter, setSelectedServiceCenter] = useState("");

  const onChangeRegion = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedBizHub("");
    setSelectedServiceCenter("");
  };

  const onChangeBizHub = (event) => {
    setSelectedBizHub(event.target.value);
    setSelectedServiceCenter("");
  };

  const onChangeServiceCenter = (event) => {
    setSelectedServiceCenter(event.target.value);
  };


  const filteredBizHubs = selectedRegion
  ? biz_hub.filter((item) => getResource?.data?.service_unit.find( (unit) => unit.Biz_Hub === item && unit.Region.toUpperCase() === selectedRegion
  )) : biz_hub;


  const filteredServiceCenters = selectedBizHub
    ? service_center.filter((item) => getResource?.data?.service_unit.find((unit) =>
              unit.Name === item &&
              unit.Biz_Hub === selectedBizHub &&
              unit.Region.toUpperCase() === selectedRegion
    )): service_center;



  const region = (
    <div className="form-group">
      <label htmlFor="region">Region</label>
      <select name="region" className="form-control" value={selectedRegion} onChange={onChangeRegion}>
        <option value="">Select Region</option>
        {iregion.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <small>Region Cannot be empty</small>
    </div>
  );


  const businessHub = (
    <div className="form-group">
      <label htmlFor="business_hub">Business Hub</label>
      <select name="business_hub" className="form-control" value={selectedBizHub} onChange={onChangeBizHub} disabled={!selectedRegion}>
        <option value="">Select</option>
        {filteredBizHubs.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <small>Business Hub Cannot be empty</small>
    </div>
  );


  const serviceCenter = (
    <div className="form-group">
      <label htmlFor="service_center">Service Center</label>
      <select name="service_center" className="form-control" value={selectedServiceCenter} onChange={onChangeServiceCenter} disabled={!selectedBizHub}>
        <option value="">Select</option>
        {filteredServiceCenters.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <small>Service Center Cannot be empty</small>
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
                       <label htmlFor="role">Select Role</label>
                        <select required value={values.role} name="role" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                          ))}
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