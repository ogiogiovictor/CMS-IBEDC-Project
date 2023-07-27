import React,  {useState} from 'react';
import { notify } from '../../utils/notify';
import { useParams, useLocation } from 'react-router-dom';
import { usePushCAADMutation  } from '../../redux/services/caad/caadService';
import {  useGetResourceListQuery } from '../../redux/services/user/userService';
import { useForm } from 'react-hook-form';

import numberToWords from 'number-to-words';
import { formatNumbers } from '../../redux/helpers';


const EDITCAAD = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const { id } = useParams(); // Get the id from the URL parameters
    const location = useLocation();
    // Access the rowData and userInfo from the location state
    const rowData = location.state?.erowData || {};
    const userInfo = location.state?.euserInfo || {};

    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedBizHub, setSelectedBizHub] = useState("");
    const [selectedServiceCenter, setSelectedServiceCenter] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');
    const [values, setValues] = useState({
        accountNo: rowData.accountNo,
        phoneNo: rowData.phoneNo,
        surname: rowData.surname,
        lastname: rowData.lastname,
        othername: rowData.othername
       
      });


      const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
      }
    

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

    
   
    const ALLOWED_FILE_TYPES = ["application/pdf", "image/png", "text/csv", "application/vnd.ms-excel", "image/jpeg", 
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

    const [ addCAAD ] = usePushCAADMutation();

    const processUpdate = async (data) => {
        //e.preventDefault();

        try{

            setIsProcessing(true);

            const formData = new FormData();
            formData.append("accountNo", data.accountNo);
            formData.append("phoneNo", data.phoneNo);
            formData.append("surname", data.surname);
            formData.append("lastname", data.lastname);
            formData.append("othername", data.othername);
            formData.append("region", selectedRegion);
            formData.append("business_hub", selectedBizHub);
            formData.append("service_center", selectedServiceCenter);
            formData.append("transtype", data.transtype);
            formData.append("accountType", data.accountType);
            formData.append("meterno", data.meterno);
            formData.append("meter_reading", data.meter_reading);
            formData.append("transaction_type", data.transaction_type);
            formData.append("effective_date", data.effective_date);
            formData.append("amount", data.amount);
            formData.append("remarks", data.remarks);
            formData.append("update_id", data.update_id);
            formData.append("file_upload", data.file_upload[0]);
         
            // Convert formData to a regular JavaScript object
          const formDataObject = Object.fromEntries(formData);

          // Convert formDataObject to a JSON string
          const jsonData = JSON.stringify(formDataObject);

          console.log(formDataObject);



          const result =  await addCAAD(formData).unwrap();
          console.log(result.data.accountNo);

          setIsProcessing(false);
          if(result.data.accountNo){
            notify("success", "CAAD Created Upddated");
            setIsProcessing(false);
            //Redirect
           // navigate('/caads', { replace: true });
          }



        }catch(e) {

            setIsProcessing(false);
            if(e?.data?.data?.file_upload){
              notify("error", e?.data?.data?.file_upload[0]);
            }
            console.log(e?.data.errors);

            if (e?.data?.errors) {
              Object.keys(e?.data?.errors).forEach((field) => {
                e.data.errors[field].forEach((message) => {
                  console.log(`Error for field '${field}': ${message}`);
                  notify("error", message);
                  // You can handle the error messages as needed (e.g., show them in the UI).
                });
              });
            }
            console.log(e);

              // e?.data?.errors?.map((item, index) => (
              //   notify("error", item)
              // ));
            }

        
    }

    return (
        <div className="row">


            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">EDIT CAAD REQUEST FOR {rowData.id}</h4>
                  <p className="card-description">
                  <hr/>
                 SINGLE REQUESTS <hr/>
                  </p>
                 

                  <form className="forms-sample" onSubmit={handleSubmit(processUpdate)} encType="multipart/form-data">
                    
                
                       
                  <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> ACCOUNT NO</label>
                          <div className="col-sm-8">
                          <input type="text"  name="accountNo"  {...register('accountNo', { required: 'AccountNo is required' })} value={values.accountNo}  onChange={onChangeHandler} className="form-control" placeholder="accountno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NO</label>
                          <div className="col-sm-8">
                          <input type="number" name="phoneNo" {...register('phoneNo' )} value={values.phoneNo}  onChange={onChangeHandler} className="form-control" placeholder="phoneno"/>
                          </div>
                        </div>
                      </div>
                   </div>

                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SURNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="surname" {...register("surname")} value={values.surname} onChange={onChangeHandler} className="form-control" placeholder="surname"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">LASTNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="lastname"  {...register("lastname")} value={values.lastname} onChange={onChangeHandler} className="form-control" placeholder="Enter lastname"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> OTHER NAMES</label>
                          <div className="col-sm-8">
                          <input type="text"  name="othername" {...register("othername")} value={values.othername} onChange={onChangeHandler} className="form-control" placeholder="othername"/>
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
                        
                          <select className="form-control" name="transtype" value={rowData.transtype}>
                            <option value="">Select Type</option>
                            <option value="due_for_billing" {...register("due_for_billing")} selected={rowData.transtype === "due_for_billing"}>
                                DUE FOR BILLING
                            </option>
                            <option value="due_for_payment" {...register("due_for_payment")}  selected={rowData.transtype === "due_for_payment"}>
                                DUE FOR PAYMENT
                            </option>
                        </select>


                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">ACCOUNT TYPE</label>
                          <div className="col-sm-8">
                          <select   className="form-control"  name="accountType" {...register("accountType")} value={rowData.accountType} >
                            <option value="">Select Type</option>
                            <option value="Prepaid" selected={rowData.accountType === "Prepaid"}>Prepaid</option>
                            <option value="Postpaid" selected={rowData.accountType === "Postpaid"}>Postpaid</option>
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
                          <input type="text" name="meterno" {...register("meterno")} value={rowData.meterno}  className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER READING</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_reading" {...register("meter_reading")} value={rowData.meter_reading} className="form-control" placeholder="Enter meter_reading"/>
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
                          <select   className="form-control"  name="transaction_type" {...register("transaction_type")}  value={rowData.transaction_type} >
                            <option value="">Select Type</option>
                            <option value="DB" selected={rowData.transaction_type === "DB"}>Debit (DB)</option>
                            <option value="CR" selected={rowData.transaction_type === "CR"}>Credit (CR)</option>
                            <option value="PR" selected={rowData.transaction_type === "PR"}>Payment Reversal</option>
                            <option value="UN" selected={rowData.transaction_type === "UN"}>Uncollectables</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">EFFECTIVE DATE</label>
                          <div className="col-sm-8">
                          <input type="text" disabled name="effective_date" {...register("effective_date")} value={rowData.effective_date}  className="form-control" />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">AMOUNT - <b>{formatNumbers(rowData.amount)}</b></label>
                          <div className="col-sm-12">
                          <input type="text" name="amount" {...register("amount")}  className="form-control" value={number} onChange={handleInputChange} placeholder={rowData.amount}/>
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
                            <textarea className="form-control" value={rowData.remarks} name="remarks" {...register("remarks")}  rows="4" placeholder="Enter remarks"></textarea>
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
                          <input type="file" name="file_upload" {...register("file_upload")} multiple className="form-control"/>
                          <input type="text" hidden name="update_id" {...register("update_id")}  value={rowData.id}/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6"></div>
                   </div>





 
                    
                     <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                     {isProcessing ? 'Processing...' : 'Proceed'}
                     </button> </form> 


                  
                </div>
              </div>
            </div>



           

        </div>
    );
}

export default EDITCAAD;