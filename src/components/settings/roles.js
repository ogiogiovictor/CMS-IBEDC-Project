import React, {Fragment, useState, useEffect} from 'react';
import { notify } from '../../utils/notify';
import { datePicker } from '../../redux/helpers';
import PageLoader from "../spinner/loader";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAccessListQuery } from '../../redux/services/user/userService';
import './role.css'



const Roles = () => {

  const location = useLocation();
  const rowData = location.state.data;
  const [isEditing, setIsEditing] = useState(false);

  const { data, isFetching, error } = useGetAccessListQuery();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckboxChange = (event, submenuId) => {
    // Handle checkbox change logic here
    console.log(event.target.checked, submenuId);
  };

 // console.log(data.data);
   
    
    return (
        <Fragment>
        
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">{ rowData.name.replace(/_/g, ' ').toUpperCase() } ACCESS&nbsp;</h4>

             <div>
                <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
              </div>
             <hr/>


                <div className="table-responsive">
                
                {data?.data?.map((item, index) => (
                  <div key={index}>
                    <div className="main_menu_list">{item.menu_name}</div>
                    <ul className="checkbox-list">
                      {item.submenu.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <input
                              type="checkbox"
                              disabled={!isEditing}
                              checked={submenu.selected}
                              onChange={(event) => handleCheckboxChange(event, submenu.id)}
                            />&nbsp;
                          <span>{submenu.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                </div>



           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default Roles;

