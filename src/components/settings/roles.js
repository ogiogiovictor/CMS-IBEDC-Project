import React, {Fragment, useState, useEffect} from 'react';
import { notify } from '../../utils/notify';
import { datePicker } from '../../redux/helpers';
import PageLoader from "../spinner/loader";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAccessListQuery, useGetAllUserQuery, useGetRoleQuery } from '../../redux/services/user/userService';
import './role.css'



const Roles = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const rowData = location.state.data;
  const [isEditing, setIsEditing] = useState(false);

  const { data } = useGetAccessListQuery();
  const { data: getAllUsers } = useGetAllUserQuery({ pageNo: currentPage  });
  const { data: allRolesUsers } = useGetRoleQuery();
   


  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckboxChange = (event, submenuId) => {
    // Handle checkbox change logic here
    console.log(event.target.checked, submenuId);
  };

 console.log(allRolesUsers?.data);
 console.log(rowData.id);
   
    
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

                <hr/>

                <div className="form-group">
                    <label>Add Users</label>
                    <div class="row">
                      <div class="col-md-11">
                      <select class="form-control">
                      {
                        getAllUsers?.data?.data?.map((item, index) => (
                          <option key={index} value={item.id}>{item.name} ({item.email})</option>
                        ))
                      }
                    </select>
                      </div>
                      <div class="col-md-1">
                      <button className="btn btn-sm btn-primary btn-block">Add</button>
                      </div>

                    </div>

                   
                    
                  </div>

                <hr/>

                <div className="form-group">
                      
                <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Authority</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allRolesUsers?.data?.find((item) => item.id === rowData.id)?.users?.map((user, index) => (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.authority}</td>
                              <td>{user.status}</td>
                              <td>
                                <button className="btn btn-xs btn-primary">View</button>&nbsp;
                                <button className="btn btn-xs btn-info">Edit</button>&nbsp;
                                <button className="btn btn-xs btn-danger">Remove</button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                  </table>


                     {/* {
                        allRolesUsers?.data?.filter((item) => item.id === rowData.id).map((item, index) => (
                          <div key={index}>
                            {
                              item.users.map((user, index) => (
                                <div key={index}>
                                  <span>{user.name} ({user.email})</span>
                                </div>
                              ))
                            }
                          </div>
                        ))
                      }  */}
                </div>



           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default Roles;

