import React, { useState, useEffect  } from 'react';

const AddFeeder = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [values, setValues] = useState({
        latitude: '',
        longtitude: '',
        naccode: '',
        CDateTime: '',
        F11kvFeeder_Name: '',
        Feeder_CBSerial: '',
        F11kvFeeder_parent: '',
        F11kvFeeder_CBYearofManufacture: '',
        F11kvFeeder_CB_Make: '',
        F11kvFeeder_CB_country_of_Manufacture: '',
        F11kvFeeder_Relay_Make: '',
        F11kvFeeder_Relay_Type: '',
        F11kvFeeder_CTRatio: '',
        F11kvFeeder_RMUSerial: '',
        F11kvFeeder_RMUYearofManufacture: '',
        F11kvFeeder_RMU_Make: '',
        F11kvFeeder_RMU_country_of_Manufacture: '',
        F11kvFeeder_RMU_Type : '',
        F11kvFeeder_Route_Length: '',
        F11kvFeeder_Conductor_Size: '',
        F11kvFeeder_Aluminium_Conductor: '',
        F11kvFeeder_UP_Type: '',
        F11kvFeeder_UP_Length: '',
        F11kvFeeder_Manufacture: '',
        F11kvFeeder_Ratedcurrent: '',
        F11kvFeeder_Ratedvoltage: '',
        F11kvFeeder_CB_Type: '',
        assettype: '',
      });

      const [touched, setTouched] = useState({
        F11kvFeeder_Name: false,
        Feeder_CBSerial: false,
        F11kvFeeder_CBYearofManufacture: false,
        F11kvFeeder_CB_Make: false,
        F11kvFeeder_CB_country_of_Manufacture: false,
        F11kvFeeder_Relay_Make: false,
        F11kvFeeder_Relay_Type: false,
        F11kvFeeder_CTRatio: false,
        F11kvFeeder_parent: false,
        F11kvFeeder_RMUSerial: false,
        F11kvFeeder_RMUYearofManufacture: false,
        F11kvFeeder_RMU_Make: false,
        F11kvFeeder_RMU_country_of_Manufacture: false,
        F11kvFeeder_RMU_Type : false,
        F11kvFeeder_Route_Length: false,
        F11kvFeeder_Conductor_Size: false,
        F11kvFeeder_Aluminium_Conductor: false,
        F11kvFeeder_UP_Type: false,
        F11kvFeeder_UP_Length: false,
        F11kvFeeder_Manufacture: false,
        F11kvFeeder_Ratedcurrent: false,
        F11kvFeeder_Ratedvoltage: false,
        F11kvFeeder_CB_Type: false,
        latitude: false,
        longtitude: false,
        naccode: false,
        CDateTime: false,
        assettype: false,
      });
    
      const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
    
      const onBlurHandler = (e) => {
        setTouched({...touched, [e.target.name]: true})
      }

      const postCustomer = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
      };

    return (
        <div className="row">
            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ADD NEW FEEDER</h4>
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
                            <select   onChange={onChangeHandler} class="form-control"  name="assettype">
                            <option value="">Select Feeder</option>
                            <option value="11kv Feeder">11kv Feeder</option>
                            <option value="33kv Feeder">33kv Feeder</option>
                            </select>
                         
                          </div>
                          <small>FeederName Cannot be empty</small>
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
                           />
                          </div>
                          <small>FeederName Cannot be empty</small>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder CB Serial</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="Feeder_CBSerial"
                           value={values.Feeder_CBSerial}
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           touched={touched.Feeder_CBSerial.toString()}
                            />
                            <small>Feeder CB Serial Cannot be empty</small>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder CB Year Of Manufacture</label>
                          <div class="col-sm-8">
                          <input type="text" 
                          name="F11kvFeeder_CBYearofManufacture"
                          class="form-control" 
                          value={values.F11kvFeeder_CBYearofManufacture}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_CBYearofManufacture.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder CB Make</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_CB_Make"
                            value={values.F11kvFeeder_CB_Make}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_CB_Make.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder CB Country of Manufacture</label>
                          <div class="col-sm-8">
                          <input type="text" 
                          class="form-control" 
                          name="F11kvFeeder_CB_country_of_Manufacture"
                          value={values.F11kvFeeder_CB_country_of_Manufacture}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_CB_country_of_Manufacture.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Relay Make</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_Relay_Make"
                            value={values.F11kvFeeder_Relay_Make}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_Relay_Make.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Relay Type</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control" 
                          name="F11kvFeeder_Relay_Type"
                          value={values.F11kvFeeder_Relay_Type}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_Relay_Type.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder CT Ratio</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_CTRatio"
                            value={values.F11kvFeeder_CTRatio}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_CTRatio.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder RMU Serial</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control" 
                          name="F11kvFeeder_RMUSerial"
                           value={values.F11kvFeeder_RMUSerial}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_RMUSerial.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder RMU Year Manufacture</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            name="F11kvFeeder_RMUYearofManufacture"
                            class="form-control"
                            value={values.F11kvFeeder_RMUYearofManufacture}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_RMUYearofManufacture.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feedr RMU Make</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control" 
                          name="F11kvFeeder_RMU_Make"
                          value={values.F11kvFeeder_RMU_Make}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_RMU_Make.toString()}
                          
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder RMU Country of Manufacture</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_RMU_country_of_Manufacture"
                            value={values.F11kvFeeder_RMU_country_of_Manufacture}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_RMU_country_of_Manufacture.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder RMU Type</label>
                          <div class="col-sm-8">
                          <input type="text" class="form-control"
                          name="F11kvFeeder_RMU_Type"
                          value={values.F11kvFeeder_RMU_Type}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_RMU_Type.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Route Length</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_Route_Length"
                            value={values.F11kvFeeder_Route_Length}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_Route_Length.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Conductor Size</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control"
                          name="F11kvFeeder_Conductor_Size" 
                          value={values.F11kvFeeder_Conductor_Size}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_Conductor_Size.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Aluminium Conduction</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_Aluminium_Conductor"
                            value={values.F11kvFeeder_Conductor_Size}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_Conductor_Size.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>


                   
               


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Up Type</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control"
                          name="F11kvFeeder_UP_Type" 
                          value={values.F11kvFeeder_UP_Type}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_UP_Type.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Up Length</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_UP_Length"
                            value={values.F11kvFeeder_UP_Length}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_UP_Length.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>
         





                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Manufacture</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control"
                          name="F11kvFeeder_Manufacture" 
                          value={values.F11kvFeeder_Manufacture}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_Manufacture.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Rated Current</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_Ratedcurrent"
                            value={values.F11kvFeeder_Ratedcurrent}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_Ratedcurrent.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>







                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder Rated Voltage</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control"
                          name="F11kvFeeder_Ratedvoltage" 
                          value={values.F11kvFeeder_Ratedvoltage}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_Ratedvoltage.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Feeder CB Type</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="F11kvFeeder_CB_Type"
                            value={values.F11kvFeeder_CB_Type}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.F11kvFeeder_CB_Type.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Latitude</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control"
                          name="latitude" 
                          value={values.latitude}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.latitude.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Longitude</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="longtitude"
                            value={values.longtitude}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.longtitude.toString()}
                            />
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Naccode</label>
                          <div class="col-sm-8">
                          <input type="text"  class="form-control"
                          name="naccode" 
                          value={values.naccode}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.naccode.toString()}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Captured DateTime</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="CDateTime"
                            readonly
                            value={new Date()}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            touched={touched.CDateTime.toString()}
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

export default AddFeeder;