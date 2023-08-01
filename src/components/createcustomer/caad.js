import React, { useState, useEffect  } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import numberToWords from 'number-to-words';
import { notify } from '../../utils/notify';
import { usePushCAADMutation } from '../../redux/services/caad/caadService';
import {  useGetResourceListQuery } from '../../redux/services/user/userService';

const CAAD = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const customer = location.state.custData;


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


    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileChange = (event) => {
      setSelectedFiles([...event.target.files]);
    };


  
    const region = (
      <div className="form-group row">
          <label className="col-sm-4 col-form-label">REGION</label>
              <div className="col-sm-8">
              <select name="region" className="form-control" value={selectedRegion} onChange={onChangeRegion} required>
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
              <select name="business_hub" className="form-control" value={selectedBizHub} onChange={onChangeBizHub} disabled={!selectedRegion} required>
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
      <label className="col-sm-4 col-form-label">SERVICE CENTER</label>
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




     const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'text/csv',  "application/vnd.ms-excel", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];


    const [ addCAADProcess ] = usePushCAADMutation();

    const submitCAAD = async (e) => {
      e.preventDefault();
     
      try {

        setIsProcessing(true);

        const formData = new FormData(e.target);

        const { accountNo, phoneNo, surname, lastname, region, business_hub, accountType, transaction_type, effective_date, amount, remarks  } = Object.fromEntries(formData);

              // Check if any of the required fields are empty
        if (!accountNo || !surname || !region || !business_hub || !accountType || !transaction_type || !effective_date || !amount  || !remarks) {
          notify("error", "The Following fields are required. AccountNo, Surname, Lastname, Region, Business Hub, AccountType, TransactionType, Effective Date, Amount and Remark.");
          setIsProcessing(false);
          return; // Exit the function if any required fields are empty
        }

  
        selectedFiles.forEach((file, index) => {
          formData.append('file_upload[]', file); // Ensure the key is in the format 'file_upload[]'
        });
    
        

      const formEntry = Object.fromEntries(formData);
      const result =  await addCAADProcess(formData).unwrap();
      if(result){
        notify("success", "CAAD Created Successfully");
        //Redirect
        navigate('/caads', { replace: true });
      }
      

      } catch (e) {
        setIsProcessing(false);
        if(e?.data?.data?.file_upload){
          notify("error", e?.data?.data?.file_upload[1]);
        }
        console.log(e?.data);
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
                          <input type="text"  name="accountNo" value={customer.AccountNo}  className="form-control" placeholder="accountno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NO</label>
                          <div className="col-sm-8">
                          <input type="number" name="phoneNo" value={customer.Mobile}  className="form-control" placeholder="phoneno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SURNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="surname" value={customer.Surname}  className="form-control" placeholder="surname"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">FIRSTNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="lastname" value={customer.Firstname} className="form-control" placeholder="Enter lastname"/>
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
                          <select   className="form-control"  name="transtype" required >
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
                          <select   className="form-control"  name="accountType" required>
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
                          <input type="text" name="meterno" className="form-control" placeholder="meterno"/>
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
                          <select   className="form-control"  name="transaction_type" required >
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
                          <input type="date" name="effective_date" required className="form-control" placeholder="effective_date"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">AMOUNT</label>
                          <div className="col-sm-12">
                          <input type="text" name="amount" required step={.2} className="form-control" value={number} onChange={handleInputChange}/>
                          <span className="text-danger">{words}</span>
                          </div>
                        </div>
                      </div>
                     
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">REMARKS (Reason for Adjustment)</label>
                          <div className="col-sm-12">
                            <textarea className="form-control"  name="remarks" required rows="4" placeholder="Enter remarks"></textarea>
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
                          <input type="file" name="file_upload[]" onChange={handleFileChange} multiple className="form-control" />
                          {/* <input type="file" name="file_upload" multiple className="form-control"/> */}
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