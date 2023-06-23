import React, { useState, useEffect  } from 'react';
import { useForm } from 'react-hook-form';
import { useAddMetersMutation } from '../../redux/services/meter/meterService';
import { notify } from '../../utils/notify';
import { useNavigate } from 'react-router-dom';
import { useGetResourceListQuery } from '../../redux/services/user/userService';


const  AddMeters = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedType, setSelectedType] = useState("");

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSelectChangeHandler = (e) => {
        const selectedValue = e.target.value;
        setSelectedType(selectedValue);
      }
    

    const handleSelectChange = (e) => {
        setSelectedType({[e.target.name]: e.target.value})
    }

    const [ addMeter ] = useAddMetersMutation();
    const { data: getResource } = useGetResourceListQuery();

    // Form submission handler
  const onSubmit = async (data) => {
    //console.log(selectedType);
   // console.log(data);
    notify("success", "Meter Successfully Added.");
    setIsProcessing(true);
    const idata = {
        mdata: data,
        type: selectedType
    }

    try {

      const result =  await addMeter(idata).unwrap();
     console.log(result);
      if(result){
        notify("success", result.message);
        setIsProcessing(false);
        navigate('/all_meters');
      }

    }catch(error){
      navigate('/all_meters');
      //notify("error", error.message);
        setIsProcessing(false);
    }

  };


      // Get distinct values of 'name' property from the array
      const iregion = [...new Set(getResource?.data?.service_unit?.map(item => item.Region.toUpperCase()))];
      const biz_hub = [...new Set(getResource?.data?.service_unit?.map(item => item.Biz_Hub))];
    
      const [selectedRegion, setSelectedRegion] = useState("");
      const [selectedBizHub, setSelectedBizHub] = useState("");
    
      const onChangeRegion = (event) => {
        setSelectedRegion(event.target.value);
        console.log(selectedRegion);
        setSelectedBizHub("");
      };
      
    
      const onChangeBizHub = (event) => {
        setSelectedBizHub(event.target.value);
      };
    
      const filteredBizHubs = selectedRegion
      ? biz_hub.filter((item) => getResource?.data?.service_unit.find( (unit) => unit.Biz_Hub === item && unit.Region.toUpperCase() === selectedRegion
      )) : biz_hub;
    
    
      const region = (
        <select name="F33kv_Regional_Name" className="form-control" value={selectedRegion} onChange={onChangeRegion} >
          <option value="">Select Region</option>
          {iregion.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
    );


    const businessHub = (
      <select name="business_hub" className="form-control" value={selectedBizHub} onChange={onChangeBizHub} disabled={!selectedRegion}  >
        <option value="">Select</option>
        {filteredBizHubs.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
  );
    



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

                 
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                    
                    
                   <div className="row">
                        <div className="col-md-6">
                            <div className="form-group row">
                            <label className="col-sm-4 col-form-label">Select Type</label>
                            <div className="col-sm-8">
                                <select className="form-control" name="type" onChange={onSelectChangeHandler} required >
                                <option value="">Select Type</option>
                                <option value="Distribution Sub Station 11KV_415V">Distribution Sub Station 11KV_415V</option>
                                <option value="Distribution Sub Station 33KV_415V">Distribution Sub Station 33KV_415V</option>
                                <option value="11KV Feeder">11KV Feeder</option>
                                <option value="33KV Feeder">33KV Feeder</option>
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
                            {region}
                          {/* <select   className="form-control"  name="region" onChange={handleSelectChange} {...register("region", { required: "Please select region." })} >
                            <option value="">Select Region</option>
                            <option value="OGUN">OGUN</option>
                            <option value="KWARA">KWARA</option>
                            <option value="OYO">OYO</option>
                            <option value="OSUN">OSUN</option>
                            <option value="IBADAN">IBADAN</option>
                            </select>
                            {errors.region && <span className="errors">{errors.region.message}</span>} */}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">BUSINESS HUB</label>
                          <div className="col-sm-8">
                            {businessHub}
                          {/* <select  className="form-control"  name="business_hub" {...register("business_hub", { required: "Please select hub." })}>
                            <option value="">Select Business Hub</option>
                            <option value="Ota">Ota</option>
                            <option value="Ikirun">Ikirun</option>
                            <option value="Ede">Ede</option>
                            </select>
                            {errors.business_hub && <span className="errors">{errors.business_hub.message}</span>} */}
                          </div>
                        </div>
                      </div>
                   </div>



                   
                   {/* <div className={`row ${selectedType === "DT" ? "" : "hiddenFORMS"}`}> */}
                   {(selectedType === "11KV Feeder" ||  selectedType === "33KV Feeder" ||  selectedType === "NMD" || selectedType === "MD") && (
                   <div className={`row ${selectedType === "DT" ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">TRANSMISSION STATION</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="transmission_station"  {...register("transmission_station")} >
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
                          <input type="text" name="33feederline"  {...register("33feederline")}  className="form-control" placeholder="Feeder Line 33"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}


                   {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V" || selectedType === "11KV Feeder" ||  selectedType === "33KV Feeder"  || selectedType === "NMD") && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">INJECTION SUBSTATION</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="injection_substation"  {...register("injection_substation")}>
                            <option value="">Select Station</option>
                            <option value="station">Station One</option>
                            <option value="stationtwo">Station Two</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {(selectedType === "Distribution Sub Station 11KV_415V" || selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "MD" || selectedType === "NMD" || selectedType === "MDA") && (
                      <div className="col-md-6">  
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ADDRESS</label>
                          <div className="col-sm-8">
                          <input type="text" name="address"  {...register("address")} className="form-control" placeholder="Address"/>
                          </div>
                        </div>
                      </div>
                     )}
                   </div>
                   )}




                {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V" || selectedType === "33KV Feeder" || selectedType === "11KV Feeder" ||  selectedType === "NMD") && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> XFORMER NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="xformer_name" className="form-control" placeholder="XFORMER NAME" {...register("xformer_name")}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">DISTRIBUTION XFORMER</label>
                          <div className="col-sm-8">
                          <input type="text" name="distribution_xformer"  {...register("distribution_xformer")} className="form-control" placeholder="Distribution Xformer"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}


                {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V"  || selectedType === "MD" || selectedType === "NMD") && (
                   <div className={`row ${selectedType === "DT"  ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> DSS NAME</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="dss_name" {...register("dss_name", { required: "Please select DSS." })}>
                            <option value="">Select DSS</option>
                            <option value="station">Station One</option>
                            <option value="stationtwo">Station Two</option>
                            </select>
                            {errors.dss_name && <span className="errors">{errors.dss_name.message}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">VOLTAGE RATIO (KV)</label>
                          <div className="col-sm-8">
                          <input type="number" name="voltage_ratio"  {...register("voltage_ratio")} className="form-control" placeholder="Voltage Ratio"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}



        {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V" ) && (

                   <div className="row">  
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label"> DSS PUBLIC/PRIVATE</label>
                          <div className="col-sm-10">
                          <select   className="form-control"  name="dss_public_private" {...register("dss_public_private")}>
                            <option value="">Select DSS Type</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            </select>
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
                          <input type="number"  name="latitude" {...register("latitude")}  className="form-control" placeholder="Latitude"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">LONGITUDE</label>
                          <div className="col-sm-8">
                          <input type="number" name="longitude" {...register("longitude")}  className="form-control" placeholder="Longitude"/>
                          </div>
                        </div>
                      </div>
                   </div>




                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER NUMBER</label>
                          <div className="col-sm-8">
                          <input type="number" name="meter_number" {...register("meter_number")} className="form-control" placeholder="Meter Number"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER MODEL</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_model" {...register("meter_model")} className="form-control" placeholder="Meter Model"/>
                          </div>
                        </div>
                      </div>
                   </div>



               {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V" ) && (
                  
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER RATED CAPACITY</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_rated_capacity"  {...register("meter_rated_capacity")} className="form-control" placeholder="Meter Rated Capacity"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">INSTALLATION CAPACITY</label>
                          <div className="col-sm-8">
                          <input type="text" name="installation_capacity"  {...register("installation_capacity")} className="form-control" placeholder="Installation Capacity"/>
                          </div>
                        </div>
                      </div>
                   </div>
               )}



                   {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V"  || selectedType === "MD" || selectedType === "NMD" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SIM SERIAL NO</label>
                          <div className="col-sm-8">
                          <input type="text" name="sim_serial_no"  {...register("sim_serial_no")}  className="form-control" placeholder="MSIM Serial No"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">NETWORK PROVIDER</label>
                          <div className="col-sm-8">
                          <input type="text" name="network_provider" {...register("network_provider")} className="form-control" placeholder="Network Provider"/>
                          </div>
                        </div>
                      </div>
                   </div>
                   )}



                {(selectedType === "Distribution Sub Station 33KV_415V" || selectedType === "Distribution Sub Station 11KV_415V"  || selectedType === "MD" || selectedType === "NMD" || selectedType === "FEEDER" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">VENDOR</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="vendor"   {...register("vendor")} >
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
                          <input type="date" name="installation_date"  {...register("installation_date")} className="form-control" placeholder="Installation Date"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}





                {(selectedType === "DT" || selectedType === "MD" || selectedType === "NMD" || selectedType === "33KV Feeder"  || selectedType === "11KV Feeder" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">REMARK</label>
                          <div className="col-sm-8">
                          <input type="text" name="remarks"  {...register("remarks")}  className="form-control" placeholder="Enter Remarks"/>
                          </div>
                        </div>
                      </div>
                      <div className={`col-md-6 ${selectedType === "FEEDER" ? "" : "hiddenFORMS"}`}>
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SUBSTATION</label>
                          <div className="col-sm-8">
                          <input type="text" name="sub_station"  {...register("sub_station")}  className="form-control" placeholder="Enter SubStation"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}
                


                {(selectedType === "33KV Feeder"  || selectedType === "11KV Feeder" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER NAME</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="feeder_name"  {...register("feeder_name")}>
                            <option value="">Select Feeder</option>
                            <option value="feeder1">Feeder1</option>
                            <option value="feeder2">Feeder2</option>
                            <option value="feeder3">Feeder3</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER CATEGORY</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="feeder_category"  {...register("feeder_category")}>
                            <option value="">Select Feeder Category</option>
                            <option value="MYTO">MYTO</option>
                            <option value="NON-MYTO">NON-MYTO</option>
                          </select>
                          </div>
                        </div>
                      </div>
                   </div>
                )}


                   <div className={`row ${selectedType === "11KV Feeder" ? "" : "hiddenFORMS"}`}>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER BAND</label>
                          <div className="col-sm-8">
                          <input type="text" name="feeder_band"  {...register("feeder_band")}  className="form-control" placeholder="FEEDER BAND"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FEEDER TYPE</label>
                          <div className="col-sm-8">
                          <input type="text" name="feeder_type"  {...register("feeder_type")}  className="form-control" placeholder="Enter FEEDER TYPE"/>
                          </div>
                        </div>
                      </div>
                   </div>



                   {(selectedType === "33KV Feeder"  || selectedType === "11KV Feeder" ) && (
                  
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER MAKE</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_make" {...register("meter_make")} className="form-control" placeholder="METER MAKE"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CT RATIO</label>
                          <div className="col-sm-8">
                          <input type="text" name="ct_ratio" {...register("ct_ratio")} className="form-control" placeholder="Enter CT RATIO"/>
                          </div>
                        </div>
                      </div>
                   </div>
                )}



              {(selectedType === "33KV Feeder"  || selectedType === "11KV Feeder" ) && (
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> PT RATIO</label>
                          <div className="col-sm-8">
                          <input type="text" name="pt_ratio" {...register("pt_ratio")} className="form-control" placeholder="PT RATIO"/>
                          </div>
                        </div>
                      </div>
                      {(selectedType === "MD" || selectedType === "NMD" || selectedType === "MDA" ) && (
                      <div className="col-md-6">  
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCOUNT NUMBER</label>
                          <div className="col-sm-8">
                          <input type="text" name="account_number" {...register("account_number")} className="form-control" placeholder="Enter ACCOUNT NUMBER"/>
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
                          <input type="text" name="meter_rating" {...register("meter_rating")} className="form-control" placeholder="METER RATING"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER TYPE</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_type" {...register("meter_type")} className="form-control" placeholder="Enter METER TYPE"/>
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
                          <input type="text" name="category" {...register("category")} className="form-control" placeholder="CATEGORY"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CUSTOMER NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="customer_name" {...register("customer_name")} className="form-control" placeholder="Enter CUSTOMER NAME"/>
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
                          <input type="text" name="phone_number" {...register("phone_number")} className="form-control" placeholder="PHONE NUMBER"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">NATURE OF BUSINESS</label>
                          <div className="col-sm-8">
                          <input type="text" name="nature_of_business"  {...register("nature_of_business")} className="form-control" placeholder="Enter NATURE OF BUSINESS"/>
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
                          <select   className="form-control"  name="tariff" {...register("tariff")}>
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
                          <select   className="form-control"  name="service_band" {...register("service_band")}>
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
                          <input type="text" name="contact_person" {...register("contact_person")} className="form-control" placeholder="Contact Person"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCOUNT NAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="account_name" {...register("account_name")} className="form-control" placeholder="Enter Account Name"/>
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
                          <input type="email" name="contact_person_email" {...register("contact_person_email")} className="form-control" placeholder="Contact Person Email"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">CONTACT PERSON ADDRESS</label>
                          <div className="col-sm-8">
                          <input type="text" name="contact_person_address" {...register("contact_person_address")}  className="form-control" placeholder="Enter Contact Person Address"/>
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