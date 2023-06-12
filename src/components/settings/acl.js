import React, {Fragment, useState, useEffect} from 'react';
import { useGetRoleQuery } from '../../redux/services/user/userService';
import { setRole } from '../../redux/services/user/userSlice';
import { notify } from '../../utils/notify';
import { datePicker } from '../../redux/helpers';
import PageLoader from "../spinner/loader";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const AccessControl = () => {

    const { role } = useSelector((state) => state.user) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isFetching, isLoading, isUninitialized, refetch, error, isError } = useGetRoleQuery();
   
    if (error) {
        notify("error", error?.data);
       // navigate(`/errorpage`);
    }

    useEffect(() => {
        if (!isLoading && !isError && data) {
          dispatch(setRole(data?.data));
        }
      }, [data, dispatch, isLoading, isError]);

      console.log(role);

   
    
    return (
        <Fragment>
             
              {isUninitialized  ? <PageLoader /> : ''}

             
            
        <div className="row">
       <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
         <div className="card">
           <div className="card-body">
             <h4 className="card-title">Access Control List (Settings) &nbsp;</h4>

             { isError ? <div>Error: {error.message}</div> : '' }

           
             { isFetching ? <PageLoader /> : 

                <div className="table-responsive">
                
                <table className="table">
                 <thead>
                   <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>UserCount</th>
                     <th>Date Created</th>
                     <th>Status</th>
                     <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>
                    {
                        role?.map((role) => (
                           

                            <tr key={role?.id}>
                                <td>{role?.id}</td>
                                <td>{role?.name.replace(/_/g, ' ').toUpperCase()}</td>
                                <td><span class="badge badge-primary">{role?.users_count}</span></td>
                                <td>{datePicker(role?.created_at)}</td>
                                <td><label className="badge badge-danger">Active</label></td>
                                <td>
                                    <button className="btn btn-primary btn-sm">View</button>
                                </td>
                            </tr>
                        ))
                    }
                   
                 </tbody>
               </table>

                </div>

            }


           </div>

          
         </div>
       </div>
       
     </div>
   </Fragment>
    );
}

export default AccessControl;