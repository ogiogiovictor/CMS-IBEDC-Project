import React, { useState, useEffect  } from 'react';
import { useForm } from 'react-hook-form';
import numberToWords from 'number-to-words';
import { notify } from '../../utils/notify';


import { useAddMetersMutation } from '../../redux/services/meter/meterService';


const CAAD = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');
    const [selectedType, setSelectedType] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();
   

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setNumber(inputValue);
        setWords(numberToWords.toWords(inputValue));
      };

    const onSelectChangeHandler = (e) => {
        const selectedValue = e.target.value;
        setSelectedType(selectedValue);
      }


    const [ uploadCAAD ] = useAddMetersMutation();

    const onSubmit = async (data) => {
      notify("info", "Processing please wait...");
      setIsProcessing(true);

      console.log(data);
      
      try{

        // const formData = new FormData();
        // for (let i = 0; i < data.file_upload.length; i++) {
        //   formData.append('file_upload', data.file_upload[i]);
        // }

        // formData.append('accountNo', data.accountNo);
        // formData.append('phoneNo', data.phoneNo);
        // formData.append('surname', data.surname);
        // formData.append('lastname', data.lastname);
        // formData.append('othername', data.othername);
        // formData.append('service_center', data.service_center);
        // formData.append('transtype', data.transtype);
        // formData.append('accountType', data.accountType);
        // formData.append('meterno', data.meterno);
        // formData.append('meter_reading', data.meter_reading);
        // formData.append('transaction_type', data.transaction_type);
        // formData.append('effective_date', data.effective_date);
        // formData.append('amount', data.amount);
        // formData.append('remarks', data.remarks);

        // console.log(formData);
        // console.log(data);

        const result =  await uploadCAAD(data).unwrap();

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

                 
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                    
                  
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> ACCOUNT NO</label>
                          <div className="col-sm-8">
                          <input type="text"  {...register("accountNo")}  className="form-control" placeholder="accountno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NO</label>
                          <div className="col-sm-8">
                          <input type="number" name="phoneNo" {...register("phoneNo")}  className="form-control" placeholder="phoneno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SURNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="surname"  {...register("surname")} className="form-control" placeholder="surname"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">LASTNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="lastname" {...register("lastname")}  className="form-control" placeholder="Enter lastname"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> OTHER NAMES</label>
                          <div className="col-sm-8">
                          <input type="text"  name="othername"  {...register("othername")} className="form-control" placeholder="othername"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SERVICE CENTER</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="service_center" {...register("service_center")}  >
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
                          <select   className="form-control"  name="transtype"  {...register("transtype")} >
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
                          <select   className="form-control"  name="accountType"  {...register("accountType")}  >
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
                          <input type="text" name="meterno"  {...register("meterno")}  className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER READING</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_reading"  {...register("meter_reading")}   className="form-control" placeholder="Enter meter_reading"/>
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
                          <select   className="form-control"  name="transaction_type" {...register("transaction_type")} >
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
                          <input type="date" name="effective_date" {...register("effective_date")} className="form-control" placeholder="effective_date"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">AMOUNT</label>
                          <div className="col-sm-12">
                          <input type="text" name="amount"  {...register("amount")} className="form-control" value={number} onChange={handleInputChange}/>
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
                            <textarea className="form-control"  {...register("remarks")} name="remarks" rows="4" placeholder="Enter remarks"></textarea>
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
                          <input type="file" name="file_upload" multiple {...register("file_upload")} className="form-control"/>
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