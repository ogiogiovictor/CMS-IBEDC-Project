import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransformer = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [values, setValues] = useState({
        DSS_11KV_415V_Name: '',
        DSS_11KV_415V_Address: ''
     });
    const [touched, setTouched] = useState({ 
        DSS_11KV_415V_Name: false,
        DSS_11KV_415V_Address: false
    });

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
    
      const onBlurHandler = (e) => {
        setTouched({...touched, [e.target.name]: true})
      }


    const postCustomer = async (e) => {

    }

    return (
        <div className="row">
        <div className="col-md-10 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">ADD TRANSFOMER</h4>
              <p className="card-description">
              <hr/>
               IBEDC Transformer Management
               <hr/>
              </p>

             
               <form className="forms-sample" onSubmit={postCustomer}>
                
               {/* { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                   */}
               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Select AssetType</label>
                      <div class="col-sm-8">
                        <select  onChange={onChangeHandler} class="form-control"  name="assettype">
                        <option value="">Select Feeder</option>
                        <option value="11KV Feeder">11kv Transfomer</option>
                        <option value="11KV Feeder">33kv Transfomer</option>
                        </select>
                      </div>
                    </div>
                  </div>
                 
               </div>




               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Transformer Name</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Name"
                       value={values.DSS_11KV_415V_Name}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Name.toString()}
                       placeholder='Please enter DSS Name' required
                       />
                       <small>Transformer Cannot be empty</small>
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Address</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Address"
                       value={values.DSS_11KV_415V_Address}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Address.toString()}
                       placeholder='Please enter DSS Address' required
                        />
                        <small>Feeder CB Serial Cannot be empty</small>
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
{/* 
        <CustomerCard cstats={dashboardStats?.customer_by_region} /> */}

    </div>
    );

    
}

export default AddTransformer;