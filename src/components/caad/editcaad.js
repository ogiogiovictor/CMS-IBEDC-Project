import React,  {useState} from 'react';
import { notify } from '../../utils/notify';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate();

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
        othername: rowData.othername,
        transtype: rowData.transtype,
        accountType: rowData.accountType,
        meterno: rowData.meterno,
        meter_reading: rowData.meter_reading,
        transaction_type: rowData.transaction_type,
        effective_date: rowData.effective_date,
        amount: rowData.amount,
        remarks: rowData.remarks
       
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

    

    const [ addCAAD ] = usePushCAADMutation();

    const processUpdate = async (data) => {
        //e.preventDefault();

        try{

            setIsProcessing(true);
            const idata = {
              "accountNo" : data.accountNo,
              "phoneNo": data.phoneNo,
              "surname": data.surname,
              "lastname" : data.lastname,
              "othername" : data.othername,
              "region" : selectedRegion,
              "business_hub" : selectedBizHub,
              "service_center" : selectedServiceCenter,
              "transtype" : data.transtype,
              "accountType": data.accountType,
              "meterno" : data.meterno,
              "meter_reading": data.meter_reading,
              "transaction_type" : data.transaction_type,
              "effective_date" : rowData.effective_date,
              "amount" : data.amount,
              "remarks" : data.remarks,
              "update_id" : data.update_id
            }


          // Convert formDataObject to a JSON string
         // const jsonData = JSON.stringify(formDataObject);

         

          const result =  await addCAAD(idata).unwrap();
       
          setIsProcessing(false);
          if(result.data.accountNo){
            notify("success", "CAAD Created Upddated");
            setIsProcessing(false);
            //Redirect
            navigate('/caads', { replace: true });
          }



        }catch(e) {

            setIsProcessing(false);
          console.log(e)

            if (e?.data?.errors) {
              Object.keys(e?.data?.errors).forEach((field) => {
                e.data.errors[field].forEach((message) => {
                  console.log(`Error for field '${field}': ${message}`);
                  notify("error", message);
                  // You can handle the error messages as needed (e.g., show them in the UI).
                });
              });
            }
       

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
                        
                          <select className="form-control" name="transtype" value={values.transtype}  {...register("transtype")} onChange={onChangeHandler}>
                            <option value="">Select Type</option>
                            <option value="due_for_billing"  selected={values.transtype === "due_for_billing"}>
                                DUE FOR BILLING
                            </option>
                            <option value="due_for_payment"  selected={values.transtype === "due_for_payment"}>
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
                          <select   className="form-control"  name="accountType" {...register("accountType")} value={values.accountType} onChange={onChangeHandler} >
                            <option value="">Select Type</option>
                            <option value="Prepaid" selected={values.accountType === "Prepaid"}>Prepaid</option>
                            <option value="Postpaid" selected={values.accountType === "Postpaid"}>Postpaid</option>
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
                          <input type="text" name="meterno"  {...register("meterno")} value={values.meterno} onChange={onChangeHandler} className="form-control" placeholder="meterno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">METER READING</label>
                          <div className="col-sm-8">
                          <input type="text" name="meter_reading" {...register("meter_reading")} value={values.meter_reading} onChange={onChangeHandler} className="form-control" placeholder="Enter meter_reading"/>
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
                          <select   className="form-control"  name="transaction_type" {...register("transaction_type")}  onChange={onChangeHandler}  value={values.transaction_type} >
                            <option value="">Select Type</option>
                            <option value="DB" selected={values.transaction_type === "DB"}>Debit (DB)</option>
                            <option value="CR" selected={values.transaction_type === "CR"}>Credit (CR)</option>
                            <option value="PR" selected={values.transaction_type === "PR"}>Payment Reversal</option>
                            <option value="UN" selected={values.transaction_type === "UN"}>Uncollectables</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">EFFECTIVE DATE</label>
                          <div className="col-sm-8">
                          <input type="text" disabled name="effective_date" {...register("effective_date")} value={values.effective_date}  className="form-control" />
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
                            <textarea className="form-control" value={values.remarks} name="remarks" {...register("remarks")} onChange={onChangeHandler}  rows="4" placeholder="Enter remarks"></textarea>
                          </div>
                        </div>
                      </div>
                      <input type="text" hidden name="update_id" {...register("update_id")}  value={rowData.id}/>
                   </div>

                   

                   {/* <p className="card-description">
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
                    */}





 
                    
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