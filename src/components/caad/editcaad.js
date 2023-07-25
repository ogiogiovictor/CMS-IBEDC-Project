import React,  {useState} from 'react';
import { notify } from '../../utils/notify';
import { useParams, useLocation } from 'react-router-dom';
import {  useGetResourceListQuery } from '../../redux/services/user/userService';

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
 

    console.log(rowData)
    const updateCAAD = () => {

    }

    return (
        <div className="row">


            <div className="col-md-10 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">EDIT CAAD REQUEST</h4>
                  <p className="card-description">
                  <hr/>
                 SINGLE REQUESTS <hr/>
                  </p>
                 

                  <form className="forms-sample" onSubmit={updateCAAD} encType="multipart/form-data">
                    
                
                       
                  <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> ACCOUNT NO</label>
                          <div className="col-sm-8">
                          <input type="text"  name="accountNo" value={rowData.accountNo}  className="form-control" placeholder="accountno"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">PHONE NO</label>
                          <div className="col-sm-8">
                          <input type="number" name="phoneNo" value={rowData.phoneNo}   className="form-control" placeholder="phoneno"/>
                          </div>
                        </div>
                      </div>
                   </div>

                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">SURNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="surname" value={rowData.surname} className="form-control" placeholder="surname"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">LASTNAME</label>
                          <div className="col-sm-8">
                          <input type="text" name="lastname" value={rowData.lastname} className="form-control" placeholder="Enter lastname"/>
                          </div>
                        </div>
                      </div>
                   </div>


                   <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label"> OTHER NAMES</label>
                          <div className="col-sm-8">
                          <input type="text"  name="othername" value={rowData.othername} className="form-control" placeholder="othername"/>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                         { region }
                      </div>
                   </div>

 
                    
                     <button type="submit" className="btn btn-primary mr-2" disabled={isProcessing}>
                     {/* {isProcessing ? 'Processing...' : 'Proceed'} */}
                     </button> </form> 


                  
                </div>
              </div>
            </div>



           

        </div>
    );
}

export default EDITCAAD;