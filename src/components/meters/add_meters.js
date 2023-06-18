import React, { useState  } from 'react';
import { useForm } from 'react-hook-form';


const  AddMeters = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    const { register, handleSubmit, errors } = useForm();

    const onSelectChangeHandler = (e) => {
        setSelectedType(e.target.value);
    }



    return (
        <div className="row">
            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ADD METERS</h4>
                  <p className="card-description">
                  <hr/>
                   IBEDC METER MANAGEMENT
                   <hr/>
                  </p>

                 
                   <form className="forms-sample">
                    
                      
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">Select Type</label>
                          <div className="col-sm-8">
                            <select   className="form-control"  name="type"  onChange={onSelectChangeHandler} >
                            <option value="">Select Type</option>
                            <option value="DT">DT</option>
                            <option value="FEEDER">FEEDER</option>
                            <option value="MD">MD</option>
                            <option value="NMD">NMD</option>
                            <option value="MDA">MDA</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">REGION</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="region">
                            <option value="">Select Region</option>
                            <option value="OGUN">OGUN</option>
                            <option value="KWARA">KWARA</option>
                            <option value="OYO">OYO</option>
                            <option value="OSUN">OSUN</option>
                            <option value="IBADAN">IBADAN</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">BUSINESS HUB</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="business_hub">
                            <option value="">Select Business Hub</option>
                            <option value="Ota">Ota</option>
                            <option value="Ikirun">Ikirun</option>
                            <option value="Ede">Ede</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>



                   
                   {/* <div className={`row ${selectedType === "DT" ? "" : "hiddenFORMS"}`}> */}
                   {(selectedType === "FEEDER" || selectedType === "NMD" || selectedType === "MD") && (
                   <div className={`row ${selectedType === "DT" ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">TRANSMISSION STATION</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="region">
                            <option value="">Select Station</option>
                            <option value="station">Station One</option>
                            <option value="stationtwo">Station Two</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">33KV FEEDER LINE</label>
                          <div className="col-sm-8">
                          <input type="text" name="33feederline" className="form-control" placeholder="Feeder Line 33"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}


                   {(selectedType === "DT" || selectedType === "FEEDER" || selectedType === "NMD") && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">INJECTION SUBSTATION</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="injection_substation">
                            <option value="">Select Station</option>
                            <option value="station">Station One</option>
                            <option value="stationtwo">Station Two</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">  
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">11KV FEEDER NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="33feederline" className="form-control" placeholder="Feeder Name"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}



                {(selectedType === "DT" || selectedType === "FEEDER" || selectedType === "NMD") && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> XFORMER NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="xformer_name" className="form-control" placeholder="XFORMER NAME"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">DISTRIBUTION XFORMER</label>
                          <div className="col-sm-8">
                          <input type="text" name="distribution_xformer" className="form-control" placeholder="Distribution Xformer"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}


                {(selectedType === "DT" || selectedType === "MD" || selectedType === "NMD") && (
                   <div className={`row ${selectedType === "DT"  ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> DSS NAME</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="dss_name">
                            <option value="">Select DSS</option>
                            <option value="station">Station One</option>
                            <option value="stationtwo">Station Two</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">VOLTAGE RATIO (KV)</label>
                          <div className="col-sm-8">
                          <input type="number" name="voltage_ration" className="form-control" placeholder="Voltage Ratio"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}



                   <div className={`row ${selectedType === "DT" ? "" : "hiddenFORMS"}`}>  
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label"> DSS PUBLIC/PRIVATE</label>
                          <div className="col-sm-10">
                          <select   className="form-control"  name="dss_public_private">
                            <option value="">Select DSS Type</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>


                   {(selectedType === "DT" || selectedType === "MD" || selectedType === "NMD" || selectedType === "MDA") && (
                   <div className="row">  
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label">ADDRESS</label>
                          <div className="col-sm-10">
                          <input type="text" name="address" className="form-control" placeholder="Address"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}



                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> LATITUDE</label>
                          <div className="col-sm-8">
                          <input type="number" step={2} name="latitude" className="form-control" placeholder="Latitude"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">LONGITUDE</label>
                          <div className="col-sm-8">
                          <input type="number" step={2} name="longitude" className="form-control" placeholder="Longitude"/>
                          </div>
                        </div>
                      </div>
                   </div>




                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER NUMBER</label>
                          <div className="col-sm-8">
                          <input type="n\text" name="meter_number" className="form-control" placeholder="Meter Number"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER MODEL</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_model" className="form-control" placeholder="Meter Model"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   <div className={`row ${selectedType === "DT" ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER RATED CAPACITY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_rated_capacity" className="form-control" placeholder="Meter Rated Capacity"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">INSTALLATION CAPACITY</label>
                          <div className="col-sm-8">
                          <input type="text" name="installation_capacity" className="form-control" placeholder="Installation Capacity"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   {(selectedType === "DT" || selectedType === "MD" || selectedType === "NMD" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SIM SERIAL NO</label>
                          <div className="col-sm-8">
                          <input type="text" name="sim_serial_no" className="form-control" placeholder="MSIM Serial No"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">NETWORK PROVIDER</label>
                          <div className="col-sm-8">
                          <input type="text" name="network_provider" className="form-control" placeholder="Network Provider"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}



                {(selectedType === "DT" || selectedType === "MD" || selectedType === "NMD" || selectedType === "FEEDER" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">VENDOR</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="dss_public_private">
                            <option value="">Select Vendor</option>
                            <option value="Mojec">Mojec</option>
                            <option value="Protogy">Protogy</option>
                            <option value="Momas">Momas</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">INSTALLATION DATE</label>
                          <div className="col-sm-8">
                          <input type="date" name="installation_date" className="form-control" placeholder="Installation Date"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}





                {(selectedType === "DT" || selectedType === "MD" || selectedType === "NMD" || selectedType === "FEEDER" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">REMARK</label>
                          <div className="col-sm-8">
                          <input type="text" name="remarks" className="form-control" placeholder="Enter Remarks"/>
                          </div>
                        </div>
                      </div>
                      <div className={`col-md-6 ${selectedType === "FEEDER" ? "" : "hiddenFORMS"}`}>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SUBSTATION</label>
                          <div className="col-sm-8">
                          <input type="text" name="sub_station" className="form-control" placeholder="Enter SubStation"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}
                


                   <div className={`row ${selectedType === "FEEDER" ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER NAME</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="feeder_name">
                            <option value="">Select Feeder</option>
                            <option value="Mojec">Feeder1</option>
                            <option value="Protogy">Feeder2</option>
                            <option value="Momas">Feeder3</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER CATEGORY</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="feeder_category">
                            <option value="">Select Feeder Category</option>
                            <option value="MYTO">MYTO</option>
                            <option value="NON-MYTO">NON-MYTO</option>
                          </select>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className={`row ${selectedType === "FEEDER" ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER BAND</label>
                          <div className="col-sm-8">
                          <input type="text" name="feeder_band" className="form-control" placeholder="FEEDER BAND"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER TYPE</label>
                          <div className="col-sm-8">
                          <input type="text" name="feeder_type" className="form-control" placeholder="Enter FEEDER TYPE"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   {(selectedType === "FEEDER" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER MAKE</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_make" className="form-control" placeholder="METER MAKE"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CT RATIO</label>
                          <div className="col-sm-8">
                          <input type="text" name="ct_ratio" className="form-control" placeholder="Enter CT RATIO"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}



                {(selectedType === "FEEDER" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> PT RATIO</label>
                          <div className="col-sm-8">
                          <input type="text" name="pt_ratio" className="form-control" placeholder="PT RATIO"/>
                          </div>
                        </div>
                      </div>
                      {(selectedType === "MD" || selectedType === "NMD" || selectedType === "MDA" ) && (
                      <div className="col-md-6">  
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCOUNT NUMBER</label>
                          <div className="col-sm-8">
                          <input type="text" name="account_number" className="form-control" placeholder="Enter ACCOUNT NUMBER"/>
                          </div>
                        </div>
                      </div>
                      )}
                   </div>
                )}



                {(selectedType === "MD" || selectedType === "MD"  ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER RATING</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_rating" className="form-control" placeholder="METER RATING"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER TYPE</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_type" className="form-control" placeholder="Enter METER TYPE"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}


                {(selectedType === "MD" || selectedType === "MD" ||  selectedType === "MDA" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CATEGORY</label>
                          <div className="col-sm-8">
                          <input type="text" name="category" className="form-control" placeholder="CATEGORY"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CUSTOMER NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="customer_name" className="form-control" placeholder="Enter CUSTOMER NAME"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}


                {(selectedType === "MD" || selectedType === "MD"  ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NUMBER</label>
                          <div className="col-sm-8">
                          <input type="text" name="phone_number" className="form-control" placeholder="PHONE NUMBER"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">NATURE OF BUSINESS</label>
                          <div className="col-sm-8">
                          <input type="text" name="nature_of_business" className="form-control" placeholder="Enter NATURE OF BUSINESS"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}



                 

                {(selectedType === "MDA"  ) && (

                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">TARIFF</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="Tariff ">
                            <option value="">Select Tarriff</option>
                            <option value="MYTO">R1</option>
                            <option value="NON-MYTO">R2</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SERVICE BAND</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="service_band">
                            <option value="">Select Service Band</option>
                            <option value="AH12">AH12</option>
                            <option value="BD12">BD12</option>
                          </select>
                          </div>
                        </div>
                      </div>
                   </div>
                )}




                {(selectedType === "MDA"  ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CONTACT PERSON</label>
                          <div className="col-sm-8">
                          <input type="text" name="contact_person" className="form-control" placeholder="Contact Person"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCOUNT NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="account_number" className="form-control" placeholder="Enter Account Name"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}



                {(selectedType === "MDA"  ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CONTACT PERSON EMAIL</label>
                          <div className="col-sm-8">
                          <input type="email" name="contact_person_email" className="form-control" placeholder="Contact Person Email"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CONTACT PERSON ADDRESS</label>
                          <div className="col-sm-8">
                          <input type="text" name="contact_person_address" className="form-control" placeholder="Enter Contact Person Address"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}
                


              


                {(selectedType === "MDA"  ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CONTACT PERSON PHONE</label>
                          <div className="col-sm-8">
                          <input type="el" name="contact_person_phone" className="form-control" placeholder="Contact Person Phone"/>
                          </div>
                        </div>
                      </div>

                      {(selectedType === "NMD" || selectedType === "MD"  ) && (
                      <div className="col-md-6">
                        <div className="form-group row">
                        <label className="col-sm-4 col-form-label">INITIAL READING</label>
                          <div className="col-sm-8">
                          <input type="text" name="initial_reading" className="form-control" placeholder="INITIAL READING"/>
                          </div>
                        </div>
                      </div>
                      )}
                   </div>
                )}


                 

                   
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

export default AddMeters;