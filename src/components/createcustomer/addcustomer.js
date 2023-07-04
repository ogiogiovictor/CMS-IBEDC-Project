import React, { useState } from 'react';
import CustomerCard from '../cards/customercard';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { notify } from '../../utils/notify';
import { useAddNewCustomerMutation } from '../../redux/services/customer/customerService';
import { useGetResourceListQuery } from '../../redux/services/user/userService';


const AddCustomer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [isProcessing, setIsProcessing] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const [addCustomer] = useAddNewCustomerMutation();
  const { data: getResource } = useGetResourceListQuery();

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(userInfo);
    setIsProcessing(true);

    const formData = {
      ...data,
      captured_by_name: userInfo.name ?? '0',
      captured_by: userInfo.id ?? '0',
      created_at: data.created_at ?? new Date(),
      customer_type: data.customer_type.toLowerCase(),
      building_description: data.building_description.toLowerCase(),
      status: "pending",
      region: selectedRegion,
      business_hub: selectedBizHub,
      service_center: selectedServiceCenter,
      contact_details:{
        ctitle: data.ctitle,
        cphone: data.cphone,
        csurname: data.csurname,
        cfirstname: data.cfirstname,
        cemail: data.cemail,
        clandlord_name: data.clandlord_name,
        clandlord_phone: data.clandlord_phone,
        cislandlord: data.cislandlord,
        
      },

      wiring: {
        account_type: data.m_account_type,
        is_customer_metered: data.is_customer_metered,
        meter_type: data.meter_type,
        meter_number: data.meter_number,
        book_number: data.book_number,
        meter_maker: data.meter_maker,
        meter_rating: data.meter_rating,
        meter_ct_rating: data.meter_ct_rating,
        account_number: data.account_number,
        tarrif: data.tarrif,
        tarrif_category:  data.tarrif_category,
        service_band: data.service_band,
        transformer_cap:  data.transformer_cap,
        installed_load: data.installed_load,
    }

    }

    try {
      console.log(formData);

      const result =  await addCustomer(formData).unwrap();
      console.log(result.data == 201);
      if(result.data ==  201){
        notify('success', "Customer Successfully Created");
        setIsProcessing(false);
      }else {
        notify('error', "Please Try Again! Something went wrong" );
        setIsProcessing(false);
      }

    }catch(e){
      console.log(e);
      if(e.data){
        notify('info', e.data);
      }
      notify('error', e);
      setIsProcessing(false);
    }

  };

  console.log(getResource);

  
  // Get distinct values of 'name' property from the array
  const iregion = [...new Set(getResource?.data?.service_unit?.map(item => item.Region))];
  const biz_hub = [...new Set(getResource?.data?.service_unit?.map(item => item.Biz_Hub))];
  const service_center = [...new Set(getResource?.data?.service_unit?.map(item => item.Name))];

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedBizHub, setSelectedBizHub] = useState("");
  const [selectedServiceCenter, setSelectedServiceCenter] = useState("");

  const onChangeRegion = (event) => {
    setSelectedRegion(event.target.value);
    console.log(selectedRegion);
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

  const filteredBizHubs = selectedRegion
  ? biz_hub.filter((item) => getResource?.data?.service_unit.find( (unit) => unit.Biz_Hub === item && unit.Region && unit.Region.toUpperCase() === selectedRegion.toUpperCase()
  )) : biz_hub;


  const filteredServiceCenters = selectedBizHub
    ? service_center.filter((item) => getResource?.data?.service_unit.find((unit) =>
              unit.Name === item &&
              unit.Biz_Hub === selectedBizHub &&
              unit.Region.toUpperCase() === selectedRegion.toUpperCase()
    )): service_center;

    const region = (
        <select name="region" className="form-control" value={selectedRegion} onChange={onChangeRegion} >
          <option value="">Select Region</option>
          {iregion.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
    );


    const businessHub = (
        <select name="business_hub" className="form-control" value={selectedBizHub} onChange={onChangeBizHub} disabled={!selectedRegion}  >
          <option value="">Select</option>
          {filteredBizHubs.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
    );
  
    const serviceCenter = (
        <select name="service_center" className="form-control" value={selectedServiceCenter} onChange={onChangeServiceCenter} disabled={!selectedBizHub} >
          <option value="">Select</option>
          {filteredServiceCenters.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
    );
 


    return (
        <div className="row">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ADD NEW CUSTOMER</h4>
                  <p className="card-description">
                  <hr/>
                  Create New Customer Records
                   <hr/>
                  </p>

                 
                   <form className="forms-sample" onSubmit={handleSubmit(onSubmit)}>
                 
                  {Object.keys(errors).length > 0 && (
                          <div className="alert alert-danger" role="alert">
                            {Object.entries(errors).map(([field, { message }]) => (
                              <div key={field}>{message}</div>
                            ))}
                          </div>
                        )}

                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Type</label>
                          <div class="col-sm-9">
                           <select  {...register('customer_type', { required: 'Account Type is required' })} name="customer_type" className="form-control">
                              <option value="">Select Account Type</option>
                              <option value="prepaid">Prepaid</option>
                              <option value="postpaid">Postpaid</option>
                           </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Title</label>
                          <div class="col-sm-9">
                            <input type="text"  {...register('customer_title', { required: 'Title is required' })} class="form-control" name="customer_title" placeholder="Enter Customer Title"
                            />
                            <input type="hidden"  {...register('status')}  name="status" value="pending"/>
                            <input type="hidden" {...register('created_at')}   value={new Date()}  name="created_at" />
                           
                          </div>
                        </div>
                      </div>
                  </div>


                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Gender</label>
                          <div class="col-sm-9">
                           <select  {...register('customer_gender', { required: 'Gender is required' })} name="customer_gender" className="form-control">
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="N/A">N/A</option>
                           </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Phone</label>
                          <div class="col-sm-9">
                            <input type="number" {...register('phone', { required: 'Phone is required' })}  class="form-control" name="phone" placeholder="Enter Customer Phone"
                            />
                          </div>
                        </div>
                      </div>
                  </div>


                  
                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">FirstName</label>
                          <div class="col-sm-9">
                          <input type="text"  {...register('firstname', { required: 'Firstname is required' })}  className="form-control"  name="firstname" placeholder="Enter Firstname" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Othername</label>
                          <div class="col-sm-9">
                            <input type="text"  {...register('othername')} class="form-control" name="othername" placeholder="Enter Othername"
                            />
                          </div>
                        </div>
                      </div>
                  </div>


                    <div class="row">
                      <div class="col-md-12">
                       <div className="form-group">
                          <label for="surname">Surname</label>
                          <input type="text" {...register('surname', { required: 'Surname is required' })}  className="form-control"  name="surname" placeholder="Enter Account No"
                          />
                      </div>
                     </div>
                    </div>

                   


                  <div class="row">
                      <div class="col-md-12">
                       <div className="form-group">
                          <label for="surname">Email </label>
                          <input type="text"  {...register('email')} className="form-control"  name="email" placeholder="Enter email"
                          />
                      </div>
                     </div>
                    </div>

                    <div class="row">
                      <div class="col-md-12">
                       <div className="form-group">
                          <label for="Address">Full Address </label>
                          <input type="text"  {...register('full_address', { required: 'Address is required' })}  className="form-control"  name="full_address" placeholder="Enter Address"
                          />
                      </div>
                     </div>
                    </div>



                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Building</label>
                          <div class="col-sm-9">
                           <select  {...register('building_description', { required: 'Building Description is required' })} name="building_description" className="form-control">
                              <option value="">Select Building Description</option>
                              <option value="bungalow">Bungalow</option>
                              <option value="duplex">Duplex</option>
                              <option value="flat">Flat</option>
                              <option value="church">Church</option>
                              <option value="mosque">Mosque</option>
                              <option value="factory">Factory</option>
                              <option value="shop">Shop</option>
                              <option value="others">Others</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Region</label>
                         

                          <div class="col-sm-9">
                          {region}
                             {/* <select {...register('region', { required: 'Region is required' })}  name="region" className="form-control">
                              <option value="">Select Region</option>
                              <option value="Ogun">Ogun</option>
                              <option value="Oyo">Oyo</option>
                              <option value="Ibadan">Ibadan</option>
                              <option value="Ota">Ota</option>
                              <option value="Kwara">Kwara</option>
                              <option value="Osun">Osun</option>
                            </select> */}
                          </div>
                        </div>
                      </div>
                    </div>




                  <div class="row">
                      <div class="col-md-12">
                       <div className="form-group">
                          <label for="surname">LGA </label>
                          <input type="text"  {...register('lga')}  className="form-control"  name="lga" placeholder="Enter LGA"
                          />
                      </div>
                     </div>
                  </div>



                  <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Business Hub</label>
                          <div class="col-sm-9">
                            {businessHub}
                           {/* <select {...register('business_hub', { required: 'Business Hub is required' })}  name="business_hub" className="form-control">
                              <option value="">Select Business Hub</option>
                              <option value="Ota">Ota</option>
                              <option value="Ilesha">Ilesha</option>
                              <option value="Apata">Apata</option>
                              <option value="Soka">Soka</option>
                            </select> */}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Service Centre</label>

                          <div class="col-sm-9">
                            {serviceCenter}
                             {/* <select {...register('service_center', { required: 'Service Centre is required' })}  name="service_center" className="form-control">
                              <option value="">Select Service Center</option>
                              <option value="Ikirun">Ikirun</option>
                              <option value="Opute">Opute</option>
                            </select> */}
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Customer Status</label>
                          <div class="col-sm-9">
                           <select  {...register('customer_status', { required: 'Status is required' })}  name="customer_status" className="form-control">
                              <option value="">Select Status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Suspended">Suspended</option>
                              <option value="New">New</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">State</label>

                          <div class="col-sm-9">
                             <select {...register('state')}  name="state" className="form-control">
                              <option value="">Select State</option>
                              <option value="Kwara">Kwara</option>
                              <option value="Ota">Ota</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>

                  
                       <h4 className="card-title">CONTACT DETAILS</h4>
                   <hr/>

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Contact Title</label>
                          <div class="col-sm-9">
                           <input {...register('ctitle')}  name="ctitle" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Contact Phone</label>
                          <div class="col-sm-9">
                          <input name="cphone" {...register('cphone')}  className="form-control" />
                          </div>
                        </div>
                      </div>
                   </div>



                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Contact Surname</label>
                          <div class="col-sm-9">
                           <input name="csurname" {...register('csurname')}  className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Contact Firstname</label>
                          <div class="col-sm-9">
                          <input name="cfirstname" {...register('cfirstname')}  className="form-control" />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Contact Email</label>
                          <div class="col-sm-9">
                           <input name="csurname" {...register('csurname')}  className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Landlord Name</label>
                          <div class="col-sm-9">
                          <input name="landlord_name" {...register('landlord_name')}  className="form-control" />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Landlord Phone</label>
                          <div class="col-sm-9">
                           <input name="landlord_phone" {...register('landlord_phone')}  className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Is Landlord</label>
                          <div class="col-sm-9">
                            <select {...register('cislandlord')} name="cislandlord"  className="form-control">
                              <option>Select option</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>


                   <h4 className="card-title">WIRING</h4>
                   <hr/>

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Account Type</label>
                          <div class="col-sm-9">
                          <select {...register('m_account_type')} name="m_account_type"  className="form-control">
                            <option value="metered_postpaid">metered_postpaid</option>
                            <option value="new_connection">new_connection</option>
                            <option value="unmetered_postpaid">unmetered_postpaid</option>
                            <option value="ppm_sts">ppm_sts</option>
                            <option value="ppm_nonsts">ppm_nonsts</option>
                          </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Is Customer Metered</label>
                          <div class="col-sm-9">
                            <select className="form-control" {...register('is_customer_metered')}  name="is_customer_metered">
                              <option>Select option</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                   </div>

                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Type</label>
                          <div class="col-sm-9">
                         <input type="text"  {...register('meter_type')} class="form-control" name="meter_type" placeholder='Enter Meter Type' />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Number</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control"  {...register('meter_number')} name="meter_number" placeholder='Enter meter_number' />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Book Number</label>
                          <div class="col-sm-9">
                         <input type="text" class="form-control"  {...register('book_number')} name="book_number" placeholder='Enter Book Number' />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Maker</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control"  {...register('meter_maker')} name="meter_maker" placeholder='Enter Meter Maker' />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter Rating</label>
                          <div class="col-sm-9">
                         <input type="text" class="form-control"  {...register('meter_rating')} name="meter_rating" placeholder='Enter Meter Rating' />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Meter CT Rating</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control"  {...register('meter_ct_rating')} name="meter_ct_rating" placeholder='Enter Meter CT Rating' />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Tarrif</label>
                          <div class="col-sm-9">
                         <input type="text" class="form-control"  {...register('tarrif')} name="tarrif" placeholder='Enter Tarrif' />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Tarrif Category</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control"  {...register('tarrif_category')} name="tarrif_category" placeholder='Enter Tarrif Category' />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Service Band</label>
                          <div class="col-sm-9">
                         <input type="text" class="form-control"  {...register('service_band')} name="service_band" placeholder='Enter Service Bankd' />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Transformer Cap</label>
                          <div class="col-sm-9">
                          <input type="text" class="form-control"  {...register('transformer_cap')} name="transformer_cap" placeholder='Enter Transformer Cap' />
                          </div>
                        </div>
                      </div>
                   </div>


                   <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Installed Load</label>
                          <div class="col-sm-9">
                         <input type="text" class="form-control"  {...register('installed_load')} name="installed_load" placeholder='Enter Installed Load' />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          {/* <label class="col-sm-3 col-form-label">Upload Images</label> */}
                          <div class="col-sm-9">
                          {/* <input type="file" class="form-control" name="house_image" /> */}
                          </div>
                        </div>
                      </div>
                   </div>



                   <h4 className="card-title">UPLOAD HOUSE IMAGES</h4>
                   <hr/>

                   <div class="row">
                      <div class="col-md-12">
                       <div className="form-group">
                          <label for="surname">Upload Image </label>
                          <input type="file" className="form-control"  name="upload"
                          />
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

            <CustomerCard />

        </div>
    );
}

export default AddCustomer;