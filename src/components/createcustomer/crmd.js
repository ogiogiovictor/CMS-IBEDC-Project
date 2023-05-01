import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePostCRMDMutation } from "../../redux/services/customer/customerService";
import { notify } from '../../utils/notify';

const CustomerRecord = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [values, setValues] = useState({
    new_firstname: '',
    new_lastname: '',
    new_phone: '',
    new_address: '',
    new_mcb_number: '',
    type_rating: '',
    meter_number: '',
    multiplier: '',
    new_digit: '',
    new_meter_reading: '',
    new_account_type: '',
    new_fixed_demand: '',
    new_type_rating: '',
    new_welding: '',
    new_tarrif_code: '',
    new_consumption: '',
    new_mcb_number: '',
    new_read_code: '',
    new_status_code: '',
    new_rating: '',
  });

  const navigate = useNavigate();

   // Get the data from the store
   const customerData = useSelector(state => state.customer.ticketInfo);
   const [postCRMD, { isLoading }] = usePostCRMDMutation();
 
    // Redirect the user back to the NewCustomer component if there's no data in the store
  useEffect(() => {
    if (!customerData.data) {
      navigate('/createcustomer');
    }
  }, [customerData, navigate]);

  
  // If customerData is null or undefined, return null to prevent errors
  if (!customerData) {
    return null;
  }

  // If customerData.data is not defined, redirect to /createcustomer
  if (!customerData.data) {
    navigate('/createcustomer');
    return null;
  }

    const{ content, ticket_no } = customerData.data.ticket;
    const consInfo = customerData.data.customer;

   

    const onChangeHandler = (e) => {
      setValues({...values, [e.target.name]: e.target.value})
    }
  
    const processCRMD = async (e) => {
      e.preventDefault();
      //setIsProcessing(true);

      //Collect data from the form
      const idata = { 
        ticketid : ticket_no ?? '',
        phone: values.phone,
        accountNo: consInfo.AccountNo  ?? '',
        address: consInfo.address ?? '',
        BUID: consInfo.BUID ?? '',
        meterno: consInfo.meterno ?? '',
        created_at: new Date(),
        new_firstname: values.new_firstname,
        new_lastname: values.new_lastname,
        new_phone: values.new_phone,
        new_address: values.new_address,
        new_mcb_number: values.new_mcb_number,
        type_rating: values.type_rating,
        meter_number: values.meter_number,
        meter_info: {
          multiplier: values.multiplier,
          new_digit: values.new_digit,
          new_meter_reading: values.new_meter_reading,
          new_account_type: values.new_account_type,
          new_fixed_demand: values.new_fixed_demand,
          new_type_rating: values.new_type_rating,
          new_welding: values.new_welding,
          new_tarrif_code: values.new_tarrif_code,
          new_consumption: values.new_consumption,
          new_mcb_number: values.new_mcb_number,
          new_read_code: values.new_read_code,
          new_status_code: values.new_status_code,
          new_rating: values.new_rating,
          new_status_code: values.new_status_code,
          new_read_code: values.new_read_code,
        },
        meter_change_info: {
          new_meter_number: values.new_meter_number,
          new_multiplier: values.new_multiplier,
          new_no_of_digit: values.new_no_of_digit,
          new_initial_reading: values.new_initial_reading,
          new_final_reading: values.new_final_reading,
          new_old_meter_number: values.new_old_meter_number,
        },
        meter_disconnection_section: {
          dis_meter_number: values.dis_meter_number,
          dis_final_meter_reading: values.dis_final_meter_reading,
        },
        meter_reconnection: {
          re_meter_number: values.re_meter_number,
          re_initial_meter_reading: values.re_initial_meter_reading,
        }
      }


      if(!idata.new_firstname) {
        notify("error", "Please fill all fields");
        setIsProcessing(false);
        return;
      }


      try{
       // console.log(idata);

        const result =  await postCRMD(idata).unwrap();
       console.log(result.data.message);

        if(result.data.data === 201){
          notify("success", result.data.data.message || "CRMD Completed Successfully");
          setIsProcessing(false);
         navigate('/crmdetails');
        }
       
      }catch(err){
        console.log(err);
      }


    }

  
    return (
      
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
               
              <div class="card-body">
                  <h4 class="card-title">Customer Record Management Document (CRMD)</h4>
                  <form class="form-sample" onSubmit={processCRMD}>
                  
                    <p class="card-description">
                      <b>Ticket ID : { ticket_no ?? '' } | Account No: { consInfo.AccountNo ?? ''}</b>
                    </p>

                    <div class="row">
                    <div class="col-md-12">
                        <div class="form-group row">
                          {/* <label class="col-sm-3 col-form-label">Complaint</label> */}
                          <div class="col-sm-12">
                        
                            <textarea  rows="6" disabled class="form-control">
                              { content }
                            </textarea>
                          </div>
                        </div>
                      </div>
                      </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Firstname</label>
                          <div class="col-sm-9">
                          <input type="text" value={consInfo.FirstName ?? ''} class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Firstname</label>
                          <div class="col-sm-9">
                            <input type="text" 
                            class="form-control"
                            name="new_firstname"
                            value={values.new_firstname}
                            onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Lastname</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled value={consInfo.OtherNames ?? ''} />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Lastname</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                             name="new_lastname"
                             value={values.new_lastname}
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Account No</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled value={consInfo.AccountNo ?? ''} />
                          <input type="text" class="form-control"  
                          name="accountNo"
                           hidden 
                           value={consInfo.AccountNo ?? ''}
                            />

                        <input type="text" class="form-control"  
                          name="BUID"
                           hidden 
                           value={consInfo.BUID ?? ''}
                            />


                          
                          
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Mobile No</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                             name="phone"
                             value={values.phone}
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Address</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled value={consInfo.Address} />
                          <input type="text" class="form-control" hidden
                          name="address"
                          value={consInfo.Address} />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Address</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                            name="new_address"
                            value={values.new_address}
                            onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <h4 class="card-title">Meter Information Section</h4><hr/>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">MCB Number</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                           name="new_mcb_number"
                           value={values.new_mcb_number}
                           onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Type / Rating</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder=""
                             name="type_rating"
                             value={values.type_rating}
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Number</label>
                          <div class="col-sm-9">
                          <input class="form-control" value={consInfo.MeterNo ?? ''} 
                          placeholder="Miniature Circuit Breaker"
                          name="meter_number"
                          onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Multiplier</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder=""
                             name="multiplier"
                             value={values.multiplier}
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Digit</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                           name="new_digit"
                           value={values.new_digit}
                           onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Reading</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder=""
                             name="new_meter_reading"
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Account Type</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                          name="new_account_type"
                          onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Fixed Demand(Kwh)</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder=""
                            name="new_fixed_demand"
                            onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Welding Kwh</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                          name="new_welding"
                          onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Type / Rating</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" 
                            name="new_type_rating"
                            onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">MCB Number</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                           name="new_mcb_number"
                           onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Tarrif Code</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" 
                             name="new_tarrif_code"
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Consumption</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                           name="new_consumption"
                           onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Rating</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder=""
                           name="new_rating"
                           onChange={onChangeHandler}  
                          />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Status Code</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker"
                           name="new_status_code"
                           onChange={onChangeHandler}  
                          />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Read Code</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder=""
                             name="new_read_code"
                             onChange={onChangeHandler}  
                             />
                          </div>
                        </div>
                      </div>
                    </div>


                    <h4 class="card-title">Meter Change Information Section</h4><hr/>




                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Meter Number</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder=""
                           name="new_meter_number"
                           onChange={onChangeHandler}
                          /> 
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Multiplier</label>
                          
                          <div class="col-sm-9">
                          <input class="form-control" placeholder=""
                          name="new_multiplier"
                          onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">No of Digits</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" 
                            name="new_no_of_digit"
                            onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Inital Reading New Meter</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                             name="new_initial_reading"
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Final Reading</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                            name="new_final_reading"
                            onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Old Meter Number</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                             name="new_old_meter_number"
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>


                    <h4 class="card-title">Meter Disconnection Section</h4><hr/>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Number</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                             name="dis_meter_number"
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Final Meter Reading</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" 
                           name="dis_final_meter_reading"
                           onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                    </div>

                 


                    <h4 class="card-title">Meter Reconnetion</h4><hr/>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Number</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control"
                             name="re_meter_number"
                             onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Inital Meter Reading(25) </label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control"
                           name="re_initial_meter_reading"
                           onChange={onChangeHandler}
                          />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary mr-2">
                    {isProcessing ? 'Processing...' : 'Submit'}
                    </button>


                  </form>
                </div>



              </div>
            </div>


        </div>
    );
}

export default CustomerRecord;