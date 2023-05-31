import React, { Fragment, useState  } from 'react';
import { useRegisterUserMutation } from '../../redux/services/user/userService';
import AuthorityDropdown from '../../redux/services/user/authorityDropdown';

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

  const onSelectChangeAuthorityHandler = (event) => {
    setSelectedAuthority(event.target.value);
  };

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const postUser = (e) => {

  }

  const region = (<div className="form-group">
  <label htmlFor="surname">Region</label>
   <select value={values.region} className="form-control" onChange={onChangeHandler}>
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
    <select value={values.business_hub} className="form-control" onChange={onChangeHandler}>
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
   <select value={values.service_center} className="form-control" onChange={onChangeHandler}>
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
                       value={values.name}
                       onChange={onChangeHandler}
                       placeholder="Enter Fullname" required
                       />
                       <small>User Name Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="surname">Email</label>
                       <input type="email" 
                       className="form-control" 
                       name="email"
                       value={values.email}
                       onChange={onChangeHandler}
                       placeholder="Enter Email" required
                       />
                       <small>User Email Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="surname">Password</label>
                       <input type="password" 
                       className="form-control" 
                       name="password"
                       value={values.password}
                       onChange={onChangeHandler}
                       placeholder="Enter Password" required
                       />
                       <small>User Password Cannot be empty</small>
                     </div>

                     <AuthorityDropdown onChange={onSelectChangeAuthorityHandler} value={selectedAuthority} />


                     {/* <div className="form-group">
                       <label htmlFor="surname">Authority</label>
                        <select  className="form-control" onChange={onSelectChangeAuthorityHandler} value={selectedAuthority}>
                          <option value="region">Region</option>
                          <option value="business_hub">Business Hub</option>
                          <option value="service_center">Service Center</option>
                        </select>
                       <small>Authority Cannot be empty</small>
                     </div> */}

                     {selectedAuthority === 'region' && (
                      <Fragment>
                      {region}
                    </Fragment>
                    //  <div className="form-group">
                    //    <label htmlFor="surname">Region</label>
                    //     <select value={values.region} className="form-control" onChange={onChangeHandler}>
                    //       <option value="">Select Region</option>
                    //       <option value="business_hub">Region</option>
                    //       <option value="business_hub">Business Hub</option>
                    //       <option value="business_hub">Service Center</option>
                    //     </select>
                    //    <small>Authority Cannot be empty</small>
                    //  </div>
                     )}

                     {selectedAuthority === 'business_hub' && (
                       <Fragment>
                       {region}
                       {businessHub}
                     </Fragment>
                    //  <div className="form-group">
                    //    <label htmlFor="surname">Business Hub</label>
                    //     <select value={values.business_hub} className="form-control" onChange={onChangeHandler}>
                    //       <option value="business_hub">Region</option>
                    //       <option value="business_hub">Business Hub</option>
                    //       <option value="business_hub">Service Center</option>
                    //     </select>
                    //    <small>Authority Cannot be empty</small>
                    //  </div>
                     )}

                  {selectedAuthority === 'service_center' && (
                    <Fragment>
                       {region}
                       {businessHub}
                      {serviceCenter}
                    </Fragment>
                    //  <div className="form-group">
                    //    <label htmlFor="surname">Service Centre</label>
                    //     <select value={values.service_center} className="form-control" onChange={onChangeHandler}>
                    //       <option value="business_hub">Region</option>
                    //       <option value="business_hub">Business Hub</option>
                    //       <option value="business_hub">Service Center</option>
                    //     </select>
                    //    <small>Authority Cannot be empty</small>
                    //  </div>
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