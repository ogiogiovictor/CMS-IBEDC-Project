import React, { Fragment, useState  } from 'react';

const AddUser = () => {

  const [isProcessing, setIsProcessing] = useState(false);
  const [values, setValues] = useState({
    name: '',
  });

  const onChangeHandler = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const postUser = (e) => {

  }
 
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

                     <div className="form-group">
                       <label htmlFor="surname">Authority</label>
                        <select>
                          <option>Region</option>
                          <option>Business Hub</option>
                          <option>Service Center</option>
                        </select>
                       <small>Authority Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="surname">Region</label>
                        <select>
                          <option>Region</option>
                          <option>Business Hub</option>
                          <option>Service Center</option>
                        </select>
                       <small>Authority Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="surname">Business Hub</label>
                        <select>
                          <option>Region</option>
                          <option>Business Hub</option>
                          <option>Service Center</option>
                        </select>
                       <small>Authority Cannot be empty</small>
                     </div>

                     <div className="form-group">
                       <label htmlFor="surname">Service Centre</label>
                        <select>
                          <option>Region</option>
                          <option>Business Hub</option>
                          <option>Service Center</option>
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