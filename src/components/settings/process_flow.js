import React, { Fragment, useState, useEffect  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useGetRoleQuery, useGetCaadFlowQuery } from '../../redux/services/user/userService';
import { setRole } from '../../redux/auth/authSlice';



const PROCESSFLOW = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');


    //Set Approval Values

    const userRole =  useSelector((state) => state.user.roles);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const { data, isFetching } = useGetRoleQuery();
    const { data: caadflow } = useGetCaadFlowQuery();

    console.log(caadflow?.data)
  
    useEffect(() => {
        if (data) {
          dispatch(setRole(data));
        }
     }, [data ]);

     const [values, setValues] = useState({
        create_by: '',

        start_limit_4: '',
        end_limit_4: ''
    
    
      });

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }

    const onSubmit = async (data) => {

    }
  

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
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
                          <label className="col-sm-4 col-form-label">CREATED BY</label>
                          <div className="col-sm-8">
                            <select required value={values.role} name="create_by" className="form-control" onChange={onChangeHandler}>
                            <option value="">Select</option>
                            {data?.data?.map((role) => {
                              const isSelected = role.name === 'credit_control';
                              return (
                                <option selected={isSelected} key={role.id} value={role.name}>
                                  {role?.name?.replace(/_/g, ' ').toUpperCase()}
                                </option>
                              );
                            })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                         <div className="form-group row">
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="Credit Control" disabled className="form-control"/>
                          </div>
                        </div>
                      </div>
                   </div>



                  <p>
                   <hr/>
                   APPROVALS
                   <hr/>
                  </p>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">1ST APPROVAL</label>
                          <div className="col-sm-4">
                          <select required value={values.checked_by} name="checked_by" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => {
                              const isSelected = role.name === 'district_accountant';
                              return (
                                <option selected={isSelected} key={role.id} value={role.name}>
                                  {role?.name?.replace(/_/g, ' ').toUpperCase()}
                                </option>
                              );
                            })}
                        </select>
                          </div>
                          <label className="col-sm-4">
                          <input type="text" name="start_limit"  className="form-control" disabled />
                          </label>

                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4">
                          <input type="text" name="start_limit"  className="form-control" disabled/>
                          </label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="District Accountant(DA)" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">2ND APPROVAL</label>
                          <div className="col-sm-4">
                          <select required value={values.checked_by} name="checked_by" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => {
                              const isSelected = role.name === 'businesshub_manager';
                              return (
                                <option selected={isSelected} key={role.id} value={role.name}>
                                  {role?.name?.replace(/_/g, ' ').toUpperCase()}
                                </option>
                              );
                            })}
                        </select>
                          </div>
                          <label className="col-sm-4">
                        
                          <input type="text" name="start_limit"  className="form-control" disabled  onChange={onChangeHandler}/>
                          </label>

                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4">
                          <input type="text" name="start_limit"  className="form-control" disabled />
                          </label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="Business Hub Manager" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">3RD APPROVAL</label>
                          <div className="col-sm-4">
                          <select required value={values.checked_by} name="checked_by" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => {
                              const isSelected = role.name === 'audit';
                              return (
                                <option selected={isSelected} key={role.id} value={role.name}>
                                  {role?.name?.replace(/_/g, ' ').toUpperCase()}
                                </option>
                              );
                            })}
                        </select>
                          </div>
                          <label className="col-sm-4">
                          <input type="text" name="start_limit"  className="form-control" disabled />
                          </label>

                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4">
                          <input type="text" name="start_limit"  className="form-control"  disabled/>
                          </label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="Audit" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   <p>
                   <hr/>
                   APPROVALS WITH LIMITS
                   <hr/>
                  </p>


                   {/* <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">4TH APPROVAL</label>
                          <div className="col-sm-4">
                          <select required value={values.checked_by} name="checked_by" className="form-control" onChange={onChangeHandler}>
                          <option value="">Select</option>
                          {data?.data?.map((role) => {
                              const isSelected = role.name === 'regional_manager';
                              return (
                                <option selected={isSelected} key={role.id} value={role.name}>
                                  {role?.name?.replace(/_/g, ' ').toUpperCase()}
                                </option>
                              );
                            })}
                        </select>
                          </div>
                          <label className="col-sm-4">
                          <input type="text" name="start_limit_4"  className="form-control" value={values.start_limit_4} onChange={onChangeHandler} />
                          </label>

                        </div>
                      </div>
                      <div className="col-md-6">
                      <div className="form-group row">
                          <label className="col-sm-4">
                          <input type="text" name="end_limit_4"  className="form-control" value={values.end_limit_4}  onChange={onChangeHandler}/>
                          </label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno" value="Regional Head" disabled className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                   </div> */}




                             {
                               caadflow?.data.filter((urole) => urole.approvals === '1').map((urole) => {
                                  return (
                                    <div className="row" key={urole.id}>
                                      <div className="col-md-6">
                                        <div className="form-group row">
                                          <label className="col-sm-4 col-form-label">APPROVAL</label>
                                          <div className="col-sm-4">
                                            <select required value={values.checked_by} name="checked_by" className="form-control" onChange={onChangeHandler}>
                                              <option value="">Select</option>
                                              {data?.data?.map((role) => {
                                                const checkExist = urole.role === role.name ? role.name : '';
                                                return (
                                                  <option selected={checkExist === role.name} key={role.id} value={role.name}>
                                                    {checkExist.replace(/_/g, ' ').toUpperCase()}
                                                  </option>
                                                );
                                              })}
                                            </select>
                                          </div>
                                          <div className="col-sm-4">
                                            <input type="text" name="start_limit" value={urole.start_limit} className="form-control" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group row">
                                          <div className="col-sm-4">
                                            <input type="text" name="start_limit" value={urole.end_limit}  className="form-control" />
                                          </div>
                                          <div className="col-sm-8">
                                            <input type="text" name="meterno" value={urole.role} disabled className="form-control" placeholder="meterno" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              }


                   

                  







                


                   
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