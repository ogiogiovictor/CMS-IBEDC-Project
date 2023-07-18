import React, { useState, useEffect  } from 'react';
import { useForm } from 'react-hook-form';
import numberToWords from 'number-to-words';


const CAAD = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setNumber(inputValue);
        setWords(numberToWords.toWords(inputValue));
      };


    const onSubmit = async (data) => {

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

                 
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                    
                  
                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> ACCOUNT NO</label>
                          <div className="col-sm-8">
                          <input type="number"  name="accountno"  className="form-control" placeholder="accountno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NO</label>
                          <div className="col-sm-8">
                          <input type="number" name="phoneno" className="form-control" placeholder="phoneno"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SURNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="surname" className="form-control" placeholder="surname"/>
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
                          <select   className="form-control"  name="transtype" >
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
                          <input type="date" name="effective_date" className="form-control" placeholder="effective_date"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-12">
                        <div className="form-group row">
                          <label className="col-sm-12 col-form-label">AMOUNT</label>
                          <div className="col-sm-12">
                          <input type="text" name="amount" className="form-control" value={number} onChange={handleInputChange}/>
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
                            <textarea className="form-control" name="remarks" rows="4" placeholder="Enter remarks"></textarea>
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
        
            
            {/* <CustomerCard cstats={dashboardStats?.customer_by_region} /> */}

        </div>
    );


}

export default CAAD;