import React, { useState, useEffect  } from 'react';
import {  useNavigate } from 'react-router-dom';
import numberToWords from 'number-to-words';
import { notify } from '../../utils/notify';
import { usePushCAADMutation } from '../../redux/services/meter/meterService';
import {  useGetResourceListQuery } from '../../redux/services/user/userService';

const CAAD = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');

    const navigate = useNavigate();

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedBizHub, setSelectedBizHub] = useState("");
    const [selectedServiceCenter, setSelectedServiceCenter] = useState("");

    const { data: getResource } = useGetResourceListQuery();

    const onChangeRegion = (event) => {
      setSelectedRegion(event.target.value);
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



     // Get distinct values of 'name' property from the array
  const iregion = [...new Set(getResource?.data?.service_unit?.map(item => item.Region?.toUpperCase()))];
  const biz_hub = [...new Set(getResource?.data?.service_unit?.map(item => item.Biz_Hub))];
  const service_center = [...new Set(getResource?.data?.service_unit?.map(item => item.Name))];


  const filteredBizHubs = selectedRegion
  ? biz_hub.filter((item) => getResource?.data?.service_unit.find( (unit) => unit.Biz_Hub === item && unit.Region?.toUpperCase() === selectedRegion
  )) : biz_hub;


  const filteredServiceCenters = selectedBizHub
    ? service_center.filter((item) => getResource?.data?.service_unit.find((unit) =>
              unit.Name === item &&
              unit.Biz_Hub === selectedBizHub &&
              unit.Region?.toUpperCase() === selectedRegion
    )): service_center;



  
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
  
  
    const serviceCenter = (
      <div className="form-group row">
      <label className="col-sm-4 col-form-label">BUSINESS HUB</label>
          <div className="col-sm-8">
          <select name="service_center" className="form-control" value={selectedServiceCenter} onChange={onChangeServiceCenter} disabled={!selectedBizHub}>
          <option value="">Select</option>
          {filteredServiceCenters.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
            </select>
            <small>Service Center Cannot be empty</small>
          </div>
      </div>

    );
  
    



    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setNumber(inputValue);
        setWords(numberToWords.toWords(inputValue));
    };




    const ALLOWED_FILE_TYPES = ["application/pdf", "image/png", "text/csv", "application/vnd.ms-excel", "image/jpeg", 
     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

    const [ addCAADProcess ] = usePushCAADMutation();

    const submitCAAD = async (e) => {
      e.preventDefault();
     
      try {

        setIsProcessing(true);

        const formData = new FormData(e.target);

        const { accountNo, phoneNo, surname, lastname, service_center, accountType, transaction_type, effective_date, amount  } = Object.fromEntries(formData);

              // Check if any of the required fields are empty
        if (!accountNo || !phoneNo || !surname || !lastname || !service_center || !accountType || !transaction_type || !effective_date || !amount) {
          notify("error", "Please fill in all required fields.");
          return; // Exit the function if any required fields are empty
        }

       
         // Validate and append each file to the formData object with a unique key
          if (formData.getAll('file_upload') !== null) {
            const fileUploads = formData.getAll('file_upload');
            for (let i = 0; i < fileUploads.length; i++) {
              const file = fileUploads[i];
              if (ALLOWED_FILE_TYPES.includes(file.type)) {
                formData.append(`file_upload[${i}]`, file);
              } else {
                notify("error", `File ${file.name} has an unsupported type and will not be uploaded.`);
                console.log(`File ${file.name} has an unsupported type and will not be uploaded.`);
                return;
              }
            }
          }
         
      // Append each file to the formData object with a unique key
        //  if (formData.getAll('file_upload') !== null) {
        //   const fileUploads = formData.getAll('file_upload'); // Get all the files in an array
        //   for (let i = 0; i < fileUploads.length; i++) {
        //     formData.append(`file_upload[${i}]`, fileUploads[i]);
        //   }
        // }

      const formEntry = Object.fromEntries(formData);
      const result =  await addCAADProcess(formData).unwrap();
      if(result){
        notify("success", "CAAD Created Successfully");
        //Redirect
        navigate('/allcaad', { replace: true });
      }
      

      } catch (e) {
        setIsProcessing(false);
        navigate('/allcaad', { replace: true });
        console.log(e);
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

                 
                   <form className="forms-sample" onSubmit={submitCAAD} encType="multipart/form-data">
                    
                  
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
                         { region }
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        { businessHub }
                      </div>
                      <div className="col-md-6">
                       { serviceCenter }
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
                    {isProcessing ? 'Processing...' : 'Save'} 
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