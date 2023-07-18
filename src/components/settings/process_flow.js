import React, { Fragment, useState, useEffect  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useGetRoleQuery } from '../../redux/services/user/userService';
import { setRole } from '../../redux/auth/authSlice';



const PROCESSFLOW = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');

    const userRole =  useSelector((state) => state.user.roles);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const { data, isFetching } = useGetRoleQuery();
  
    useEffect(() => {
        if (data) {
          dispatch(setRole(data));
        }
     }, [data ]);

     const [values, setValues] = useState({
        role: '',
        checked_by: '',
        first_approval: '',
        second_approval: '',
        third_approval: '',
    
      });

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }

    const onSubmit = async (data) => {

    }
  

    return (
        <div className="row">
            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">PROCESS FLOW CAAD</h4>
                  <p className="card-description">
                  <hr/>
                   CUSTOMER ACCOUNT ADJUSTMENT DOCUMENT PROCESS FLOW
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                    

                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">APPROVAL LEVEL</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value={4} disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      </div>
                   </div>

                        
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCESS BY</label>
                          <div className="col-sm-8">
                          <select required value={values.role} name="role" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => (
                            <option key={role.id} value={role.name}>{role?.name?.replace(/_/g, ' ').toUpperCase()}</option>
                          ))}
                        </select>
                         
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                         <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCESS BY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="Customer Care" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CHECKED BY</label>
                          <div className="col-sm-8">
                          <select required value={values.checked_by} name="checked_by" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => (
                            <option key={role.id} value={role.name}>{role?.name?.replace(/_/g, ' ').toUpperCase()}</option>
                          ))}
                        </select>
                         
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CHECKED BY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="BHM" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">1ST APPROVAL</label>
                          <div className="col-sm-8">
                          <select required value={values.first_approval} name="first_approval" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => (
                            <option key={role.id} value={role.name}>{role?.name?.replace(/_/g, ' ').toUpperCase()}</option>
                          ))}
                        </select>
                         
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4 col-form-label">1ST APPROVAL BY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="CCO" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>




                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">2ND APPROVAL</label>
                          <div className="col-sm-8">
                          <select required value={values.second_approval} name="second_approval" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => (
                            <option key={role.id} value={role.name}>{role?.name?.replace(/_/g, ' ').toUpperCase()}</option>
                          ))}
                        </select>
                         
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4 col-form-label">2ND APPROVAL BY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="MD" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">3RD APPROVAL</label>
                          <div className="col-sm-8">
                          <select required value={values.third_approval} name="third_approval" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => (
                            <option key={role.id} value={role.name}>{role?.name?.replace(/_/g, ' ').toUpperCase()}</option>
                          ))}
                        </select>
                         
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4 col-form-label">3RD APPROVAL BY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="MD Care" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>



                


                   
                    <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Save'}
                    </button>
                  
                  </form> 
                </div>
              </div>
            </div>



        </div>
    );


}

export default PROCESSFLOW;