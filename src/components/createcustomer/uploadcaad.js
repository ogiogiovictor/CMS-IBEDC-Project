import React, { useState, useEffect  } from 'react';
import {  useNavigate } from 'react-router-dom';
import { notify } from '../../utils/notify';

import { useUploadBULKCAADMutation } from '../../redux/services/meter/meterService';

const UPLOADCAAD = () => {
  const [isProcessing, setIsProcessing] = useState(false);


  const [ bulkupload ] = useUploadBULKCAADMutation();


  const uploadCAAD = async (e) => {
    e.preventDefault();

    try {
      notify("info", "Processing please wait...");
      setIsProcessing(true);

      const formData = new FormData(e.target);

      const result = await bulkupload(formData).unwrap();
      console.log(result)
      if(result.data == 200){
        notify("success", "CAAD Upload Successful");
      }
      setIsProcessing(false);
      // navigate('/caad', { replace: true });

    }catch(e) {
      console.log(e);
      setIsProcessing(false);
    }


  }

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
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">BUSINESS HUB</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="business_hub">
                            <option value="">Select HUB</option>
                            <option value="DB">sERVICE cENTER 1</option>
                          </select>
                          </div>
                        </div>
                      </div>
                   </div>

                    <div className="form-group">
                      <label htmlFor="surname">Upload File</label>
                      <input type="file" 
                      className="form-control" 
                      name="file" 
                      multiple
                       required
                      />
                      <small>TICKET ID Cannot be empty</small>
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
                          <h4 className="font-weight-light">Bulk UPLOAD CODES</h4>
                          <h3 className="font-weight-light mb-3">Template</h3>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
           




        </div>
    );
}

export default UPLOADCAAD;