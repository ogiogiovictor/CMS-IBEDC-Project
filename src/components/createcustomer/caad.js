import React, { useState, useEffect  } from 'react';
import numberToWords from 'number-to-words';
import { notify } from '../../utils/notify';


import { useAddCAADMutation } from '../../redux/services/meter/meterService';


const CAAD = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');
    const [selectedType, setSelectedType] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setNumber(inputValue);
        setWords(numberToWords.toWords(inputValue));
      };

    const onSelectChangeHandler = (e) => {
        const selectedValue = e.target.value;
        setSelectedType(selectedValue);
      }


    const [ uploadCAAD ] = useAddCAADMutation();

    const handleOnSubmit = async (e) => {
      e.preventDefault();

      

      notify("info", "Processing please wait...");
      setIsProcessing(true);
      
      try{
        
        const formData = new FormData(e.target);

      // Append each file to the formData object with a unique key
      if (formData.get('file_upload') !== null) {
        const fileUploads = formData.getAll('file_upload'); // Get all the files in an array
        for (let i = 0; i < fileUploads.length; i++) {
          formData.append(`file_upload[${i}]`, fileUploads[i]);
        }
      }

      const formEntry = Object.fromEntries(formData);

      console.log(formEntry);

      const result =  await uploadCAAD(formEntry).unwrap();

      }catch(e){

        setIsProcessing(false);
      }

    }

   
  

    return (
        <div className="row">
            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">CREATE CAAD</h4>
                  <p className="card-description">
                  <hr/>
                   CUSTOMER ACCOUNT ADJUSTMENT DOCUMENT
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={handleOnSubmit} encType="multipart/form-data">
                    
                  
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> ACCOUNT NO</label>
                          <div className="col-sm-8">
                          <input type="text"  name="accountNo"  className="form-control" placeholder="accountno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NO</label>
                          <div className="col-sm-8">
                          <input type="number" name="phoneNo"   className="form-control" placeholder="phoneno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SURNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="surname"  className="form-control" placeholder="surname"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">LASTNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="lastname" className="form-control" placeholder="Enter lastname"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> OTHER NAMES</label>
                          <div className="col-sm-8">
                          <input type="text"  name="othername" className="form-control" placeholder="othername"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SERVICE CENTER</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="service_center">
                            <option value="">Select Type</option>
                            <option value="DB">sERVICE cENTER 1</option>
                          </select>
                          </div>
                        </div>
                      </div>
                   </div>



                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> DUE BILL</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="transtype" >
                            <option value="">Select Type</option>
                            <option value="due_for_billing">DUE FOR BILLING</option>
                            <option value="due_for_payment">DUE FOR PAYMENT</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCOUNT TYPE</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="accountType" >
                            <option value="">Select Type</option>
                            <option value="Prepaid">Prepaid</option>
                            <option value="Postpaid">Postpaid</option>
                          </select>
                          </div>
                        </div>
                      </div>
                   </div>
                

                 <p className="card-description">
                  <hr/>
                  METER READING ADJUSTMENT
                   <hr/>
                  </p>


                  <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER NO</label>
                          <div className="col-sm-8">
                          <input type="text" name="meterno"  className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER READING</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_reading" className="form-control" placeholder="Enter meter_reading"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <p className="card-description">
                  <hr/>
                  REVENUE ADJUSTMENT 
                   <hr/>
                  </p>


       
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">TRANSACTION TYPE</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="transaction_type" >
                            <option value="">Select Type</option>
                            <option value="DB">Debit (DB)</option>
                            <option value="CR">Credit (CR)</option>
                            <option value="PR">Payment Reversal</option>
                            <option value="UN">Uncollectables</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">EFFECTIVE DATE</label>
                          <div className="col-sm-8">
                          <input type="date" name="effective_date"  className="form-control" placeholder="effective_date"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">AMOUNT</label>
                          <div className="col-sm-12">
                          <input type="text" name="amount"  className="form-control" value={number} onChange={handleInputChange}/>
                          <span className="text-danger">{words}</span>
                          </div>
                        </div>
                      </div>
                     
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">REMARKS</label>
                          <div className="col-sm-12">
                            <textarea className="form-control"  name="remarks" rows="4" placeholder="Enter remarks"></textarea>
                          </div>
                        </div>
                      </div>
                     
                   </div>




                   <p className="card-description">
                  <hr/>
                  FILE UPLOAD
                   <hr/>
                  </p>


       
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">UPLOAD FILE</label>
                          <div className="col-sm-8">
                          <input type="file" name="file_upload" multiple className="form-control"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6"></div>
                   </div>





                   
            


                   
                    <button type="submit" className="btn btn-primary mr-2">
                    {/* {isProcessing ? 'Processing...' : 'Save'} */} Save
                    </button>
                  
                  </form> 
                </div>
              </div>
            </div>
        
            
            {/* <CustomerCard cstats={dashboardStats?.customer_by_region} /> */}

        </div>
    );


}

export default CAAD;