import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddAssetsMutation } from '../../redux/services/dss/dtService';
import { useGetResourceListQuery } from '../../redux/services/user/userService';
import { notify } from '../../utils/notify';


const AddTransformer = () => {

   const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);

    const { data: getResource } = useGetResourceListQuery();

    

        // Get distinct values of 'name' property from the array
    const iregion = [...new Set(getResource?.data?.service_unit?.map(item => item.Region?.toUpperCase()))];
    const biz_hub = [...new Set(getResource?.data?.service_unit?.map(item => item.Biz_Hub))];
    const service_center = [...new Set(getResource?.data?.service_unit?.map(item => item.Name))];

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedBizHub, setSelectedBizHub] = useState("");
    const [selectedServiceCenter, setSelectedServiceCenter] = useState("");

    const onChangeRegion = (event) => {
      setSelectedRegion(event.target.value);
      console.log(selectedRegion);
      setSelectedBizHub("");
      setSelectedServiceCenter("");
    };


    const onChangeBizHub = (event) => {
      setSelectedBizHub(event.target.value);
      setSelectedServiceCenter("");
    };

    const onChangeServiceCenter = (event) => {
      setSelectedServiceCenter(event.target.value);
    };

    const filteredBizHubs = selectedRegion
    ? biz_hub.filter((item) => getResource?.data?.service_unit.find( (unit) => unit.Biz_Hub === item && unit.Region?.toUpperCase() === selectedRegion
    )) : biz_hub;
  
  
    const filteredServiceCenters = selectedBizHub
      ? service_center.filter((item) => getResource?.data?.service_unit.find((unit) =>
                unit.Name === item &&
                unit.Biz_Hub === selectedBizHub &&
                unit.Region.toUpperCase() === selectedRegion
      )): service_center;
  
      const region = (
          <select name="region" className="form-control" value={selectedRegion} onChange={onChangeRegion} >
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
  
    const serviceCenter = (
        <select name="service_center" className="form-control" value={selectedServiceCenter} onChange={onChangeServiceCenter} disabled={!selectedBizHub} >
          <option value="">Select</option>
          {filteredServiceCenters.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
    );
 


    const [values, setValues] = useState({
        DSS_11KV_415V_Name: '',
        DSS_11KV_415V_Address: '',
        DSS_11KV_415V_Rating: '',
        DSS_11KV_415V_Make: '',
        DSS_11KV_415V_Feederpillarr_Type: '',
        DSS_11KV_415V_FP_Catridge: '',
        DSS_11KV_415V_HV_Fuse: '',
        DSS_11KV_415V_HV_Fus_Condition: '',
        DSS_11KV_415V_Lightning_Arrester: '',
        DSS_11KV_415V_Serial_No: '',
        DSS_11KV_415V_Voltage_Ratio: '',
        DSS_11KV_415V_Oil_Temp: '',
        DSS_11KV_415V_Winding_Temp: '',
        DSS_11KV_415V_Manufacture_Year: '',
        DSS_11KV_415V_Installation_Year: '',
        DSS_11KV_415V_country_of_Manufacture: '',
        DSS_11KV_415V_Percentage_Loading: '',
        DSS_11KV_415V_No_Load_Loss: '',
        DSS_11KV_415V_Load_Loss: '',
        DSS_11KV_415V_Impedence: '',
        DSS_11KV_415V_Upriser_Number: '',
        DSS_11KV_415V_Oil_Level: '',
        DSS_11KV_415V_Silica_Condition: '',
        DSS_11KV_415V_Security: '',
        DSS_11KV_415V_substation_gravelled: '',
        DSS_11KV_415V_substation_vegetation: '',
        DSS_11KV_415V_Low_Voltage_Cable_Size: '',
        DSS_11KV_415V_Is_Tranformer_leaking_Oil: '',
        DSS_11KV_415V_Number_of_HV_Fuse: '',
        DSS_11KV_415V_Feederpillarr_Available: '',
        DSS_11KV_415V_Placement: '',
        DSS_11KV_415V_cus_profile: '',
        DSS_11KV_415V_red_line: '',
        DSS_11KV_415V_Yellow_line: '',
        DSS_11KV_415V_Blue_line: '',
        DSS_11KV_415V_Neutral_line: '',
        DSS_11KV_415V_percent: '',
        DSS_11KV_415V_No_Load_Loss: '',
        DSS_11KV_415V_Load_Loss: '',
        DSS_11KV_415V_Impedence: '',
        DSS_11KV_415V_Upriser_Number: '',
        DSS_11KV_415V_Oil_Level: '',
        DSS_11KV_415V_Silica_Condition: '',
        DSS_11KV_415V_Security: '',
        DSS_11KV_415V_substation_gravelled: '',
        DSS_11KV_415V_substation_vegetation: '',
        DSS_11KV_415V_Low_Voltage_Cable_Size: '',
        DSS_11KV_415V_Is_Tranformer_leaking_Oil: '',
        DSS_11KV_415V_Number_of_HV_Fuse: '',
        DSS_11KV_415V_Feederpillarr_Available: '',
        DSS_11KV_415V_Placement: '',
        DSS_11KV_415V_cus_profile: '',
        DSS_11KV_415V_red_line: '',
        DSS_11KV_415V_Yellow_line: '',
        DSS_11KV_415V_Blue_line: '',
        DSS_11KV_415V_Neutral_line: '',
        DSS_11KV_415V_omage: '',
        DSS_11KV_415V_mounting: '',
        DSS_11KV_415V_fp_with_meter: '',
        DSS_11KV_415V_cooling_type: '',
        DSS_11KV_415V_terminal_arrangement: '',
        DSS_11KV_415V_Trenches_available: '',
        DSS_11KV_415V_Trenches_with_granite: '',
        DSS_11KV_415V_fence_type: '',
        DSS_11KV_415V_FP_Condition: '',
        assettype:'',
     });
    const [touched, setTouched] = useState({ 
        DSS_11KV_415V_Name: false,
        DSS_11KV_415V_Address: false,
        DSS_11KV_415V_Rating: false,
        DSS_11KV_415V_Make: false,
        DSS_11KV_415V_Feederpillarr_Type: false,
        DSS_11KV_415V_FP_Catridge: false,
        DSS_11KV_415V_HV_Fuse: false,
        DSS_11KV_415V_HV_Fus_Condition: false,
        DSS_11KV_415V_Lightning_Arrester: false,
        DSS_11KV_415V_Serial_No: false,
        DSS_11KV_415V_Voltage_Ratio: false,
        DSS_11KV_415V_Oil_Temp: false,
        DSS_11KV_415V_Winding_Temp: false,
        DSS_11KV_415V_Manufacture_Year: false,
        DSS_11KV_415V_Installation_Year: false,
        DSS_11KV_415V_country_of_Manufacture: false,
        DSS_11KV_415V_Percentage_Loading: false,
        DSS_11KV_415V_No_Load_Loss: false,
        DSS_11KV_415V_Load_Loss: false,
        DSS_11KV_415V_Impedence: false,
        DSS_11KV_415V_Upriser_Number: false,
        DSS_11KV_415V_Oil_Level: false,
        DSS_11KV_415V_Silica_Condition: false,
        DSS_11KV_415V_Security: false,
        DSS_11KV_415V_substation_gravelled: false,
        DSS_11KV_415V_substation_vegetation: false,
        DSS_11KV_415V_Low_Voltage_Cable_Size: false,
        DSS_11KV_415V_Is_Tranformer_leaking_Oil: false,
        DSS_11KV_415V_Number_of_HV_Fuse: false,
        DSS_11KV_415V_Feederpillarr_Available: false,
        DSS_11KV_415V_Placement: false,
        DSS_11KV_415V_cus_profile: false,
        DSS_11KV_415V_red_line: false,
        DSS_11KV_415V_Yellow_line: false,
        DSS_11KV_415V_Blue_line: false,
        DSS_11KV_415V_Neutral_line: false,
        DSS_11KV_415V_percent: false,
        DSS_11KV_415V_No_Load_Loss: false,
        DSS_11KV_415V_Load_Loss: false,
        DSS_11KV_415V_Impedence: false,
        DSS_11KV_415V_Upriser_Number: false,
        DSS_11KV_415V_Oil_Level: false,
        DSS_11KV_415V_Silica_Condition: false,
        DSS_11KV_415V_Security: false,
        DSS_11KV_415V_substation_gravelled: false,
        DSS_11KV_415V_substation_vegetation: false,
        DSS_11KV_415V_Low_Voltage_Cable_Size: false,
        DSS_11KV_415V_Is_Tranformer_leaking_Oil: false,
        DSS_11KV_415V_Number_of_HV_Fuse: false,
        DSS_11KV_415V_Feederpillarr_Available: false,
        DSS_11KV_415V_Placement: false,
        DSS_11KV_415V_cus_profile: false,
        DSS_11KV_415V_red_line: false,
        DSS_11KV_415V_Yellow_line: false,
        DSS_11KV_415V_Blue_line: false,
        DSS_11KV_415V_Neutral_line: false,
        DSS_11KV_415V_omage: false,
        DSS_11KV_415V_mounting: false,
        DSS_11KV_415V_fp_with_meter: false,
        DSS_11KV_415V_cooling_type: false,
        DSS_11KV_415V_terminal_arrangement: false,
        DSS_11KV_415V_Trenches_available: false,
        DSS_11KV_415V_Trenches_with_granite: false,
        DSS_11KV_415V_fence_type: false,
        DSS_11KV_415V_FP_Condition: false,
        assettype: false,
    });

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
    
      const onBlurHandler = (e) => {
        setTouched({...touched, [e.target.name]: true})
      }



  const [ registerAsset ] = useAddAssetsMutation();

    const postTransformer = async (e) => {
      e.preventDefault();
      setIsProcessing(true);
      if(!values.assettype){
        notify("error", "Please enter you fill out all fields");
        setIsProcessing(false);
        return;
      }

      try {
        console.log(values);

        const result =  await registerAsset(values).unwrap();
        if(result.data){
          notify("success", result.message);
          setIsProcessing(false);
          navigate('/transformers');
        }
        
      } catch (error) {
        if(error.data.error){
          notify("error", error.data.error);
        }
        setIsProcessing(false);
       
        console.log(error)
      }

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

             
               <form className="forms-sample" onSubmit={postTransformer}>
                
               {/* { values.errorMessage && <div className="alert alert-danger" role="alert"> {values.errorMessage} </div> }
                   */}
               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Select AssetType</label>
                      <div class="col-sm-8">
                        <select  onChange={onChangeHandler} class="form-control"  name="assettype">
                        <option value="">Select Asset Type</option>
                        <option value="11KV Feeder">11kv Transfomer</option>
                        <option value="11KV Feeder">33kv Transfomer</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Region</label>
                      <div class="col-sm-8">
                      {region}
                      </div>
                      
                    </div>
                  </div>
                 
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Business Hub</label>
                      <div class="col-sm-8">
                      {businessHub}
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Address</label>
                      <div class="col-sm-8">
                      {serviceCenter}
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

               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">Transformer Rating</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Rating"
                       value={values.DSS_11KV_415V_Rating}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Rating.toString()}
                       placeholder='Please enter Rating' required
                       />
                       <small>Transformer Rating Cannot be empty</small>
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Make</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Make"
                       value={values.DSS_11KV_415V_Make}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Make.toString()}
                       placeholder='Please enter DSS Make' required
                        />
                        <small>DSS Make Cannot be empty</small>
                      </div>
                    </div>
                  </div>
               </div>

               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS FeederPillar Type</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Feederpillarr_Type"
                       value={values.DSS_11KV_415V_Feederpillarr_Type}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Feederpillarr_Type.toString()}
                       placeholder='Please enter DSS FeederPillar Type' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS FP Condition</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_FP_Condition"
                       value={values.DSS_11KV_415V_FP_Condition}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_FP_Condition.toString()}
                       placeholder='Please enter DSS_11KV_415V_FP_Condition' required
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS FP_Catridge</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_FP_Catridge"
                       value={values.DSS_11KV_415V_FP_Catridge}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_FP_Catridge.toString()}
                       placeholder='Please enter DSS_11KV_415V_FP_Catridge' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS HV_Fuse</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_HV_Fuse"
                       value={values.DSS_11KV_415V_HV_Fuse}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_HV_Fuse.toString()}
                       placeholder='Please enter DSS_11KV_415V_HV_Fuse' required
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS HV_Fus_Condition</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_HV_Fus_Condition"
                       value={values.DSS_11KV_415V_HV_Fus_Condition}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_HV_Fus_Condition.toString()}
                       placeholder='Please enter DSS_11KV_415V_HV_Fus_Condition' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Lightning_Arrester</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Lightning_Arrester"
                       value={values.DSS_11KV_415V_Lightning_Arrester}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Lightning_Arrester.toString()}
                       placeholder='Please enter DSS_11KV_415V_Lightning_Arrester'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Serial_No</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Serial_No"
                       value={values.DSS_11KV_415V_Serial_No}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Serial_No.toString()}
                       placeholder='Please enter DSS_11KV_415V_Serial_No' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Voltage_Ratio</label>
                      <div class="col-sm-8">
                        <input type="number" 
                        class="form-control"
                        name="DSS_11KV_415V_Voltage_Ratio"
                       value={values.DSS_11KV_415V_Voltage_Ratio}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Voltage_Ratio.toString()}
                       placeholder='Please enter DSS_11KV_415V_Voltage_Ratio'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Oil_Temp</label>
                      <div class="col-sm-8">
                      <input type="number"  class="form-control" 
                       name="DSS_11KV_415V_Oil_Temp"
                       value={values.DSS_11KV_415V_Oil_Temp}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Oil_Temp.toString()}
                       placeholder='Please enter DSS_11KV_415V_Oil_Temp' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Winding_Temp</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Winding_Temp"
                       value={values.DSS_11KV_415V_Winding_Temp}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Winding_Temp.toString()}
                       placeholder='Please enter DSS_11KV_415V_Winding_Temp'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Manufacture_Year</label>
                      <div class="col-sm-8">
                      <input type="number"  class="form-control" 
                       name="DSS_11KV_415V_Manufacture_Year"
                       value={values.DSS_11KV_415V_Manufacture_Year}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Manufacture_Year.toString()}
                       placeholder='Please enter DSS_11KV_415V_Manufacture_Year' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Installation_Year</label>
                      <div class="col-sm-8">
                        <input type="number" 
                        class="form-control"
                        name="DSS_11KV_415V_Installation_Year"
                       value={values.DSS_11KV_415V_Installation_Year}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Installation_Year.toString()}
                       placeholder='Please enter DSS_11KV_415V_Installation_Year'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Country_of_Manufacture</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_country_of_Manufacture"
                       value={values.DSS_11KV_415V_country_of_Manufacture}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_country_of_Manufacture.toString()}
                       placeholder='Please enter DSS_11KV_415V_country_of_Manufacture' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Percentage_Loading</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Percentage_Loading"
                       value={values.DSS_11KV_415V_Percentage_Loading}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Percentage_Loading.toString()}
                       placeholder='Please enter DSS_11KV_415V_Percentage_Loading'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS No_Load_Loss</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_No_Load_Loss"
                       value={values.DSS_11KV_415V_No_Load_Loss}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_No_Load_Loss.toString()}
                       placeholder='Please enter DSS_11KV_415V_No_Load_Loss' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Load_Loss</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Load_Loss"
                       value={values.DSS_11KV_415V_Load_Loss}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Load_Loss.toString()}
                       placeholder='Please enter DSS_11KV_415V_Load_Loss'
                        />
                      </div>
                    </div>
                  </div>
               </div>



               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Impedence</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Impedence"
                       value={values.DSS_11KV_415V_Impedence}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Impedence.toString()}
                       placeholder='Please enter DSS_11KV_415V_Impedence' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Upriser_Number</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Upriser_Number"
                       value={values.DSS_11KV_415V_Upriser_Number}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Upriser_Number.toString()}
                       placeholder='Please enter DSS_11KV_415V_Upriser_Number'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Oil_Level</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Oil_Level"
                       value={values.DSS_11KV_415V_Oil_Level}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Oil_Level.toString()}
                       placeholder='Please enter DSS_11KV_415V_Oil_Level' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Silica_Condition</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Silica_Condition"
                       value={values.DSS_11KV_415V_Silica_Condition}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Silica_Condition.toString()}
                       placeholder='Please enter DSS_11KV_415V_Silica_Condition'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Security</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Security"
                       value={values.DSS_11KV_415V_Security}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Security.toString()}
                       placeholder='Please enter DSS_11KV_415V_Security' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Substation_gravelled</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_substation_gravelled"
                       value={values.DSS_11KV_415V_substation_gravelled}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_substation_gravelled.toString()}
                       placeholder='Please enter DSS_11KV_415V_substation_gravelled'
                        />
                      </div>
                    </div>
                  </div>
               </div>



               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Substation_vegetation</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_substation_vegetation"
                       value={values.DSS_11KV_415V_substation_vegetation}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_substation_vegetation.toString()}
                       placeholder='Please enter DSS_11KV_415V_substation_vegetation' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Low_Voltage_Cable_Size</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Low_Voltage_Cable_Size"
                       value={values.DSS_11KV_415V_Low_Voltage_Cable_Size}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Low_Voltage_Cable_Size.toString()}
                       placeholder='Please enter DSS_11KV_415V_Low_Voltage_Cable_Size'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Tranformer_leaking_Oil</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Is_Tranformer_leaking_Oil"
                       value={values.DSS_11KV_415V_Is_Tranformer_leaking_Oil}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Is_Tranformer_leaking_Oil.toString()}
                       placeholder='Please enter DSS_11KV_415V_Is_Tranformer_leaking_Oil' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Number_of_HV_Fuse</label>
                      <div class="col-sm-8">
                        <input type="number" 
                        class="form-control"
                        name="DSS_11KV_415V_Number_of_HV_Fuse"
                       value={values.DSS_11KV_415V_Number_of_HV_Fuse}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Number_of_HV_Fuse.toString()}
                       placeholder='Please enter DSS_11KV_415V_Number_of_HV_Fuse'
                        />
                      </div>
                    </div>
                  </div>
               </div>



               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Feederpillarr_Available</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Feederpillarr_Available"
                       value={values.DSS_11KV_415V_Feederpillarr_Available}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Feederpillarr_Available.toString()}
                       placeholder='Please enter DSS_11KV_415V_Feederpillarr_Available' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Placement</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Placement"
                       value={values.DSS_11KV_415V_Placement}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Placement.toString()}
                       placeholder='Please enter DSS_11KV_415V_Placement'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Cus_profile</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_cus_profile"
                       value={values.DSS_11KV_415V_cus_profile}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_cus_profile.toString()}
                       placeholder='Please enter DSS_11KV_415V_cus_profile' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS red_line</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_red_line"
                       value={values.DSS_11KV_415V_red_line}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_red_line.toString()}
                       placeholder='Please enter DSS_11KV_415V_red_line'
                        />
                      </div>
                    </div>
                  </div>
               </div>

               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Yellow_line</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Yellow_line"
                       value={values.DSS_11KV_415V_Yellow_line}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Yellow_line.toString()}
                       placeholder='Please enter DSS_11KV_415V_Yellow_line' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Blue_line</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_Blue_line"
                       value={values.DSS_11KV_415V_Blue_line}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Blue_line.toString()}
                       placeholder='Please enter DSS_11KV_415V_Blue_line'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Neutral_line</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Neutral_line"
                       value={values.DSS_11KV_415V_Neutral_line}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Neutral_line.toString()}
                       placeholder='Please enter DSS_11KV_415V_Neutral_line' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Percent</label>
                      <div class="col-sm-8">
                        <input type="number" 
                        class="form-control"
                        name="DSS_11KV_415V_percent"
                       value={values.DSS_11KV_415V_percent}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_percent.toString()}
                       placeholder='Please enter DSS_11KV_415V_percent'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Omage</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_omage"
                       value={values.DSS_11KV_415V_omage}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_omage.toString()}
                       placeholder='Please enter DSS_11KV_415V_omage' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Mounting</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_mounting"
                       value={values.DSS_11KV_415V_mounting}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_mounting.toString()}
                       placeholder='Please enter DSS_11KV_415V_mounting'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS fp_with_meter</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_fp_with_meter"
                       value={values.DSS_11KV_415V_fp_with_meter}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_fp_with_meter.toString()}
                       placeholder='Please enter DSS_11KV_415V_fp_with_meter' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Cooling_type</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_cooling_type"
                       value={values.DSS_11KV_415V_cooling_type}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_cooling_type.toString()}
                       placeholder='Please enter DSS_11KV_415V_cooling_type'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Terminal_arrangement</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_terminal_arrangement"
                       value={values.DSS_11KV_415V_terminal_arrangement}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_terminal_arrangement.toString()}
                       placeholder='Please enter DSS_11KV_415V_terminal_arrangement' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Trenches_available</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="	DSS_11KV_415V_Trenches_available"
                       value={values.	DSS_11KV_415V_Trenches_available}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.	DSS_11KV_415V_Trenches_available.toString()}
                       placeholder='Please enter 	DSS_11KV_415V_Trenches_available'
                        />
                      </div>
                    </div>
                  </div>
               </div>


               <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Trenches_with_granite</label>
                      <div class="col-sm-8">
                      <input type="text"  class="form-control" 
                       name="DSS_11KV_415V_Trenches_with_granite"
                       value={values.DSS_11KV_415V_Trenches_with_granite}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_Trenches_with_granite.toString()}
                       placeholder='Please enter DSS_11KV_415V_Trenches_with_granite' 
                       />
                      </div>
                      
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-sm-4 col-form-label">DSS Fence_type</label>
                      <div class="col-sm-8">
                        <input type="text" 
                        class="form-control"
                        name="DSS_11KV_415V_fence_type"
                       value={values.DSS_11KV_415V_fence_type}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       touched={touched.DSS_11KV_415V_fence_type.toString()}
                       placeholder='Please enter DSS_11KV_415V_fence_type'
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

export default AddTransformer;