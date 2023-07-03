import React, {Fragment, useState, useEffect} from 'react';
import { notify } from '../../utils/notify';
import { datePicker } from '../../redux/helpers';
import PageLoader from "../spinner/loader";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGetAccessListQuery, useGetAllUserQuery, useGetRoleQuery, useGetControListQuery } from '../../redux/services/user/userService';
import './role.css'
import { useForm } from 'react-hook-form';


const Roles = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const rowData = location.state.data;
  const [isEditing, setIsEditing] = useState(false);
  const [getControList, setGetControList] = useState(null);

  const { data } = useGetAccessListQuery();
  const { data: getAllUsers } = useGetAllUserQuery({ pageNo: currentPage  });
  const { data: allRolesUsers } = useGetRoleQuery();
  const { data: initialControListData  } = useGetControListQuery({ role_id: rowData.id });
   
  const { register, handleSubmit, formState: { errors } } = useForm();


  useEffect(() => {
    setGetControList(initialControListData?.data);
  }, [initialControListData]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckboxChange = (event, submenuId) => {
    const isChecked = event.target.checked;

    // Update the getControList data based on the checkbox state
    const updatedControList = isChecked
      ? [...getControList, { id: submenuId }]
      : getControList.filter(control => control.id !== submenuId);

    // Set the updated control list in the state
    setGetControList(updatedControList);
  };


  const onSubmit = async (data) => {

    const menuIds = getControList.map(item => item.menu_id);
    const formData = { 
      ...data,
      list: [...new Set(menuIds)],
      role: rowData.name
    }

    console.log(formData);
   console.log(getControList);
  
  };



// console.log(allRolesUsers?.data);
// console.log(rowData.id);
//console.log(getControList);
   
    
    return (
        <Fragment>
        
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">{ rowData.name.replace(/_/g, ' ').toUpperCase() } ACCESS&nbsp;</h4>

             <div>
                <button className="btn btn-sm btn-primary" onClick={handleEditClick}>{isEditing ? 'Disable' : 'Enable'}</button>
              </div>
             <hr/>


              <form onSubmit={handleSubmit(onSubmit)} className="forms-sample">
              <div className="table-responsive">
                
                {data?.data?.map((item, index) => (
                  <div key={index}>
                    <div className="main_menu_list">{item.menu_name} </div>
                    <ul className="checkbox-list">

                    {item.submenu.map((submenu, subIndex) => {
                      const foundControl = getControList?.find(control => control.id === submenu.id);
                      const isChecked = foundControl !== undefined;

                      return (
                        <li key={subIndex}>
                          <input
                            type="checkbox"
                            disabled={!isEditing}
                            checked={isChecked}
                            onChange={(event) => handleCheckboxChange(event, submenu.id)}
                          />&nbsp;
                          <span>{submenu.name} </span>
                        </li>
                      );
                    })}

                      {/* {
                      
                      item.submenu.map((submenu, subIndex) => (
                        <li key={subIndex}>
                           <input
                              type="checkbox"
                              disabled={!isEditing}
                              checked={isChecked}
                              onChange={(event) => handleCheckboxChange(event, submenu.id)}
                            />&nbsp;
                          <span>{submenu.name}</span>
                        </li>
                      ))
                    } */}


                    </ul>
                  </div>
                ))}

              </div>

                <hr/>

                  <div className="form-group">
                      <label>Add Users</label>
                      <div class="row">
                        <div class="col-md-11">
                        <select class="form-control" name="semail"  {...register('semail', { required: 'Please select an email' })}>
                        {
                          getAllUsers?.data?.data?.map((item, index) => (
                            <option key={index} value={item.email}>{item.name} ({item.email})</option>
                          ))
                        }
                      </select>
                        </div>
                        <div class="col-md-1">
                        <button type="submit" className="btn btn-sm btn-primary btn-block">Save</button>
                        </div>

                      </div>

                    
                      
                    </div>

              </form>


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
                                <button className="btn btn-xs btn-danger">Disable</button>
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

