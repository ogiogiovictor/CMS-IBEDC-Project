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
        F11kvFeeder_CB_Type: ''
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
        F11kvFeeder_CB_Type: false
      });
    
      const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
    
      const onBlurHandler = (e) => {
        setTouched({...touched, [e.target.name]: true})
      }

      const postCustomer = async (e) => {
        e.preventDefault();

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
                          <label class="col-sm-4 col-form-label">Firstname</label>
                          <div class="col-sm-8">
                          <input type="text" value="" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">New Firstname</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="new_firstname"
                            value=""
                            />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Firstname</label>
                          <div class="col-sm-8">
                          <input type="text" value="" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">New Firstname</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="new_firstname"
                            value=""
                            />
                          </div>
                        </div>
                      </div>
                   </div>

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Firstname</label>
                          <div class="col-sm-8">
                          <input type="text" value="" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">New Firstname</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="new_firstname"
                            value=""
                            />
                          </div>
                        </div>
                      </div>
                   </div>
                    
                    
                    {/* <div className="form-group">
                      <label htmlFor="surname">Feeder Name</label>
                      <input type="text" 
                      className="form-control" 
                      name="feederName"
                      value={values.F11kvFeeder_Name}
                      onChange={onChangeHandler}
                      onBlur={onBlurHandler}
                      touched={touched.F11kvFeeder_Name.toString()}
                      placeholder="Enter Feeder" required
                      />
                      <small>TICKET ID Cannot be empty</small>
                    </div> */}
                    

                   
                    <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Proceed'}
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