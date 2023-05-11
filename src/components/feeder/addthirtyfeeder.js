import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddFeederMutation } from '../../redux/services/feeder/feederService';
import { notify  } from '../../utils/notify';


const AddThirtyFeeder = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [addFeeder, { isLoading }] = useAddFeederMutation();

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }, []);

    const [values, setValues] = useState({
        latitude: '',
        longtitude: '',
        naccode: '',
        CDateTime: '',
        assettype: '',
        F33kv_Regional_Name: '',
        F33kv_Business_Hub_Name: '',
        F33kv_Feeder_Name: '',
        F33kV_Feeder_Circuit_Breaker_Make: '',
        F33kV_Feeder_Circuit_Breaker_Type: '',
        F33kV_Upriser_Cable_Type: '',
        F33kv_Teeoffs: '',
        F33kv_Tee_offs_Coordinate: '',
        F33kv_Substations_capacity: '',
        F33kv_lineload_coordinate: '',
        F33kv_Conductor_Size: '',
        F33kv_Aluminium_Conductor: '',
        F33kv_Commisioning: '',
      });

      const [touched, setTouched] = useState({
        latitude: false,
        longtitude: false,
        naccode: false,
        CDateTime: false,
        F11kvFeeder_Name: false,
        assettype: false,
        F33kv_Regional_Name: false,
        F33kv_Business_Hub_Name: false,
        F33kv_Feeder_Name: false,
        F33kV_Feeder_Circuit_Breaker_Make: false,
        F33kV_Feeder_Circuit_Breaker_Type: false,
        F33kV_Upriser_Cable_Type: false,
        F33kv_Teeoffs: false,
        F33kv_Tee_offs_Coordinate: false,
        F33kv_Substations_capacity: false,
        F33kv_lineload_coordinate: false,
        F33kv_Conductor_Size: false,
        F33kv_Aluminium_Conductor: false,
        F33kv_Commisioning: false,
      });
    
      const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
    
      const onBlurHandler = (e) => {
        setTouched({...touched, [e.target.name]: true})
      }

      const postCustomer = async (e) => {
        e.preventDefault();
        if(!values.assettype){
          setValues({...values, errorMessage: 'Please select Asset Type'});
          return;
        }else {

           //Collect data from the form
          const idata = { 
            latitude: latitude?? values.latitude,
            longtitude: longitude?? values.longtitude,
            naccode: values.naccode,
            CDateTime: values.CDateTime,
            F11kvFeeder_Name: values.F11kvFeeder_Name,
            assettype: values.assettype,
            F33kv_Regional_Name: values.F33kv_Regional_Name,
            F33kv_Business_Hub_Name: values.F33kv_Regional_Name,
            F33kv_Feeder_Name: values.F33kv_Feeder_Name,
            F33kV_Feeder_Circuit_Breaker_Make: values.F33kV_Feeder_Circuit_Breaker_Make,
            F33kV_Feeder_Circuit_Breaker_Type: values.F33kV_Feeder_Circuit_Breaker_Type,
            F33kV_Upriser_Cable_Type: values.F33kV_Upriser_Cable_Type,
            F33kv_Teeoffs: values.F33kv_Teeoffs,
            F33kv_Tee_offs_Coordinate: values.F33kv_Tee_offs_Coordinate,
            F33kv_Substations_capacity: values.F33kv_Substations_capacity,
            F33kv_lineload_coordinate: values.F33kv_lineload_coordinate,
            F33kv_Conductor_Size: values.F33kv_Conductor_Size,
            F33kv_Aluminium_Conductor: values.F33kv_Aluminium_Conductor,
            F33kv_Commisioning: values.F33kv_Commisioning
          }

          try {
            setIsProcessing(true);
            const result =  await addFeeder(idata).unwrap();
            
            if(result.data){
              notify("success", "Feeder Successfully Added" || "Process Completed Successfully");
             navigate('/feeders');
             }else{
              setIsProcessing(false); // Enable the button back
              setValues({...values, errorMessage: 'Error Added Feeder. Please contact IT'});
              return;
             }

          }catch(error){
           // setIsProcessing(false);
            if (error.status === 500) {
              // Handle error 500 here...
              setIsProcessing(false); // Enable the button back
              setValues({...values, errorMessage: 'Ooh something went wrong, Please contact helpdesk.'});
              return;
            }
            setIsProcessing(false);
            // Handle other errors here...
            setValues({...values, errorMessage: error.message});
            return;
          }
        }
      
        
      };

    return (
        <div className="row">
            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ADD NEW 33KV FEEDER</h4>
                  <p className="card-description">
                  <hr/>
                   IBEDC Feeder Management
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={postCustomer}>
                    
                   { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                      
                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Select AssetType</label>
                          <div class="col-sm-8">
                            <select  onChange={onChangeHandler} class="form-control"  name="assettype">
                            <option value="">Select Feeder</option>
                            <option value="33KV Feeder">33kv Feeder</option>
                            </select>
                          </div>
                        </div>
                      </div>
                     
                   </div>




                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Name</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control" 
                           name="F11kvFeeder_Name"
                           value={values.F11kvFeeder_Name}
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           touched={touched.F11kvFeeder_Name.toString()}
                           placeholder='Please enter Feeder Name' required
                           />
                           <small>Feeder Name Cannot be empty</small>
                          </div>
                          
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Naccode</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="naccode"
                           value={values.naccode}
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           touched={touched.naccode.toString()}
                           placeholder='Please enter naccode' required
                            />
                            <small>Naccode Cannot be empty</small>
                          </div>
                        </div>
                      </div>
                   </div>


        


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Regional_Name</label>
                          <div class="col-sm-8">
                          <input type="text" 
                          name="F33kv_Regional_Name"
                          class="form-control" 
                          value={values.F33kv_Regional_Name}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F33kv_Regional_Name.toString()}
                          placeholder='Please enter F33kv_Regional_Name' required
                          />
                           <small>Feeder F33kv_Regional_Name Cannot be empty</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Business_Hub_Name</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F33kv_Business_Hub_Name"
                            value={values.F33kv_Business_Hub_Name}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_Business_Hub_Name.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kV_Feeder_Circuit_Breaker_Make</label>
                          <div class="col-sm-8">
                          <input type="text" 
                          class="form-control" 
                          name="F33kV_Feeder_Circuit_Breaker_Make"
                          value={values.F33kV_Feeder_Circuit_Breaker_Make}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F33kV_Feeder_Circuit_Breaker_Make.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kV_Feeder_Circuit_Breaker_Type</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F33kV_Feeder_Circuit_Breaker_Type"
                            value={values.F33kV_Feeder_Circuit_Breaker_Type}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kV_Feeder_Circuit_Breaker_Type.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kV_Upriser_Cable_Type</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control" 
                          name="F33kV_Upriser_Cable_Type"
                          value={values.F33kV_Upriser_Cable_Type}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kV_Upriser_Cable_Type.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Teeoffs</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F33kv_Teeoffs"
                            value={values.F33kv_Teeoffs}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_Teeoffs.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>


       


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Tee_offs_Coordinate</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control" 
                          name="F33kv_Tee_offs_Coordinate"
                           value={values.F33kv_Tee_offs_Coordinate}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_Tee_offs_Coordinate.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Substations_capacity</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            name="F33kv_Substations_capacity"
                            class="form-control"
                            value={values.F33kv_Substations_capacity}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_Substations_capacity.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>

     

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_lineload_coordinate</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control" 
                          name="F33kv_lineload_coordinate"
                          value={values.F33kv_lineload_coordinate}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_lineload_coordinate.toString()}
                          
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Conductor_Size</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F33kv_Conductor_Size"
                            value={values.F33kv_Conductor_Size}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_Conductor_Size.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Aluminium_Conductor</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control"
                          name="F33kv_Aluminium_Conductor"
                          value={values.F33kv_Aluminium_Conductor}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F33kv_Aluminium_Conductor.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">F33kv_Commisioning</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F33kv_Commisioning"
                            value={values.F33kv_Commisioning}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F33kv_Commisioning.toString()}
                            />
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

export default AddThirtyFeeder;