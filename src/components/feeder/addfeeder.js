import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddFeederMutation } from '../../redux/services/feeder/feederService';
import { notify  } from '../../utils/notify';
import {  useGetResourceListQuery } from '../../redux/services/user/userService';



const AddFeeder = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [addFeeder, { isLoading }] = useAddFeederMutation();
    const { data: getResource } = useGetResourceListQuery();

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
            Feeder_CBSerial: values.Feeder_CBSerial,
            F11kvFeeder_parent: values.F11kvFeeder_parent,
            F11kvFeeder_CBYearofManufacture: values.F11kvFeeder_CBYearofManufacture,
            F11kvFeeder_CB_Make: values.F11kvFeeder_CB_Make,
            F11kvFeeder_CB_country_of_Manufacture: values.F11kvFeeder_CB_country_of_Manufacture,
            F11kvFeeder_Relay_Make: values.F11kvFeeder_Relay_Make,
            F11kvFeeder_Relay_Type: values.F11kvFeeder_Relay_Type,
            F11kvFeeder_CTRatio: values.F11kvFeeder_CTRatio,
            F11kvFeeder_RMUSerial: values.F11kvFeeder_RMUSerial,
            F11kvFeeder_RMUYearofManufacture: values.F11kvFeeder_RMUYearofManufacture,
            F11kvFeeder_RMU_Make: values.F11kvFeeder_RMU_Make,
            F11kvFeeder_RMU_country_of_Manufacture: values.F11kvFeeder_RMU_country_of_Manufacture,
            F11kvFeeder_RMU_Type: values.F11kvFeeder_RMU_Type,
            F11kvFeeder_Route_Length: values.F11kvFeeder_Route_Length,
            F11kvFeeder_Conductor_Size: values.F11kvFeeder_Conductor_Size,
            F11kvFeeder_Aluminium_Conductor: values.F11kvFeeder_Aluminium_Conductor,
            F11kvFeeder_UP_Type: values.F11kvFeeder_UP_Type,
            F11kvFeeder_UP_Length: values.F11kvFeeder_UP_Length,
            F11kvFeeder_Manufacture: values.F11kvFeeder_Manufacture,
            F11kvFeeder_Ratedcurrent: values.F11kvFeeder_Ratedcurrent,
            F11kvFeeder_Ratedvoltage: values.F11kvFeeder_Ratedvoltage,
            F11kvFeeder_CB_Type: values.F11kvFeeder_CB_Type,
            assettype: values.assettype,
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
                  <h4 className="card-title">ADD NEW 11KV FEEDER</h4>
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
                            <option value="11KV Feeder">11kv Feeder</option>
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
                          <label class="col-sm-4 col-form-label">Feeder CB Serial</label>
                          <div class="col-sm-8">
                            <input type="text" 
                            class="form-control"
                            name="Feeder_CBSerial"
                           value={values.Feeder_CBSerial}
                           onChange={onChangeHandler}
                           onBlur={onBlurHandler}
                           touched={touched.Feeder_CBSerial.toString()}
                           placeholder='Please enter Feeder Serial CB' required
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
                          <input type="number" 
                          name="F11kvFeeder_CBYearofManufacture"
                          class="form-control" 
                          value={values.F11kvFeeder_CBYearofManufacture}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          touched={touched.F11kvFeeder_CBYearofManufacture.toString()}
                          placeholder='Please enter Manufacture Year' required
                          step={1}
                          />
                           <small>Feeder CB Serial Cannot be empty</small>
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
                            <input type="number" 
                            name="F11kvFeeder_RMUYearofManufacture"
                            class="form-control"
                            value={values.F11kvFeeder_RMUYearofManufacture}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            step={1}
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
                          <input type="number"  class="form-control"
                          name="F11kvFeeder_Manufacture" 
                          value={values.F11kvFeeder_Manufacture}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          step={1}
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
                          <input type="number"  class="form-control"
                          name="latitude" 
                          value={values.latitude}
                          onChange={onChangeHandler}
                          onBlur={onBlurHandler}
                          
                          touched={touched.latitude.toString()}
                          placeholder='Please enter Latitude' required
                          />
                          <small>Please enter Latitude</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-4 col-form-label">Longitude</label>
                          <div class="col-sm-8">
                            <input type="number" 
                            class="form-control"
                            name="longtitude"
                            value={values.longtitude}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            
                            touched={touched.longtitude.toString()}
                            placeholder='Please enter Manufacture Year' required
                            />
                            <small>Please enter Longitude</small>
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