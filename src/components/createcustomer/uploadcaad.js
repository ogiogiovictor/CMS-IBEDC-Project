import React, { useState, useEffect  } from 'react';
import {  useNavigate,  } from 'react-router-dom';
import { notify } from '../../utils/notify';
import {  useGetResourceListQuery } from '../../redux/services/user/userService';
import { useUploadBULKCAADMutation } from '../../redux/services/caad/caadService';

const UPLOADCAAD = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();


  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBizHub, setSelectedBizHub] = useState("");

  const { data: getResource } = useGetResourceListQuery();

  const onChangeRegion = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedBizHub("");
  };

  const onChangeBizHub = (event) => {
    setSelectedBizHub(event.target.value);
  };


    // Get distinct values of 'name' property from the array
    const iregion = [...new Set(getResource?.data?.service_unit?.map(item => item.Region?.toUpperCase()))];
    const biz_hub = [...new Set(getResource?.data?.service_unit?.map(item => item.Biz_Hub))];

    const filteredBizHubs = selectedRegion
    ? biz_hub.filter((item) => getResource?.data?.service_unit.find( (unit) => unit.Biz_Hub === item && unit.Region?.toUpperCase() === selectedRegion
    )) : biz_hub;



  const [ bulkupload ] = useUploadBULKCAADMutation();
  
  const uploadCAAD = async (e) => {
    e.preventDefault();

    try {
    
      const formData = new FormData(e.target);
      const { region, business_hub, batch_name } = Object.fromEntries(formData);;

      if(!region || !business_hub || !batch_name){
        notify("error", "All fields are required.");
        setIsProcessing(false);
        return;
      }

      notify("info", "Processing please wait...");
      setIsProcessing(true);

      const result = await bulkupload(formData).unwrap();
      
      console.log(result.data)
      if(result){
        notify("success", "CAAD Upload Successful");
      }
      setIsProcessing(false);
     navigate('/caads', { replace: true });

    }catch(e) {
      console.log(e);
      setIsProcessing(false);
    }


  }


  
  const region = (
    <div className="form-group row">
        <label className="col-sm-4 col-form-label">REGION</label>
            <div className="col-sm-8">
            <select name="region" className="form-control" value={selectedRegion} onChange={onChangeRegion}>
                  <option value="">Select Region</option>
                  {iregion.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                </select>
                <small>Region Cannot be empty</small>
              </div>
    </div>
  );


  const businessHub = (
    <div className="form-group row">
        <label className="col-sm-4 col-form-label">BUSINESS HUB</label>
            <div className="col-sm-8">
            <select name="business_hub" className="form-control" value={selectedBizHub} onChange={onChangeBizHub} disabled={!selectedRegion}>
            <option value="">Select</option>
            {filteredBizHubs.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
              ))}
            </select>
      <small>Business Hub Cannot be empty</small>
        </div>
    </div>
  );



    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">UPLOAD CAAD - BULK UPLOAD</h4>
                  <p className="card-description">
                  <hr/>
                  CAAD BULK UPLOAD FORMAT <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={uploadCAAD}  encType="multipart/form-data">
                    
                      
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> BATCH NAME</label>
                          <div className="col-sm-8">
                          <input type="text"  name="batch_name" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                      { region }
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        { businessHub }
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">UPLOAD DOCUMENT</label>
                          <div className="col-sm-8">
                          <input type="file" 
                            className="form-control" 
                            name="file" 
                            multiple
                            required
                            />
                            <span className="bg bg-red">Allowed File Type (csv, xslx)</span>
                          </div>
                        </div>
                      </div>
                   </div>

                  
                    

                   
                    <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Upload'}
                    </button>
                  </form> 
                  
                </div>
              </div>
            </div>

           




                <div className="col-md-6 col-lg-3 grid-margin stretch-card">
                  <div className="card bg-dark text-white border-0">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="ml-4">
                          <h4 className="font-weight-light">BULK UPLOAD CODES</h4>
                          <h3 className="font-weight-light mb-3">&nbsp;</h3>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
           




        </div>
    );
}

export default UPLOADCAAD;