import React, { useState } from 'react';

const CustomerRecord = () => {
  


    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
               
              <div class="card-body">
                  <h4 class="card-title">Customer Record Management Document (CRMD)</h4>
                  <form class="form-sample">
                    <p class="card-description">
                      <b>Ticket ID : TK47892000000000238 | Account No: 23/42/43/2839-01</b>
                    </p>

                    <div class="row">
                    <div class="col-md-12">
                        <div class="form-group row">
                          {/* <label class="col-sm-3 col-form-label">Complaint</label> */}
                          <div class="col-sm-12">
                            <textarea  rows="6" disabled class="form-control"></textarea>
                          </div>
                        </div>
                      </div>
                      </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Firstname</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Firstname</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Lastname</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Lastname</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Account No</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Account No</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Address</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" disabled />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Address</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
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
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Type / Rating</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Number</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Multiplier</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Digit</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Reading</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Account Type</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Fixed Demand(Kwh)</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Welding Kwh</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Type / Rating</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">MCB Number</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Tarrif Code</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Consumption</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Rating</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>


                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Status Code</label>
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="Miniature Circuit Breaker" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Read Code</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="" />
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
                          <input class="form-control" placeholder="" /> 
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">New Multiplier</label>
                          
                          <div class="col-sm-9">
                          <input class="form-control" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">No of Digits</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Inital Reading New Meter</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Final Reading</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Old Meter Number</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
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
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Final Meter Reading</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Number</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Final Demand Reading</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" />
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
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Inital Meter Reading(25) </label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>




                  </form>
                </div>



              </div>
            </div>


        </div>
    );
}

export default CustomerRecord;