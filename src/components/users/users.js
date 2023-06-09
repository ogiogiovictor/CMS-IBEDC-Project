import React, {Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useGetAllUserQuery } from "../../redux/services/user/userService";
import { setUser } from "../../redux/services/user/userSlice";
import { useSearchAssetDTMutation } from '../../redux/services/dss/dtService';
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";
import { notify } from '../../utils/notify';
import { useNavigate } from 'react-router-dom';

const Users = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isFetching, isUninitialized, isError, error } = useGetAllUserQuery({ pageNo: currentPage  });

    if (error) {
      console.log(error);
      notify("error", error.data.data);
      navigate(`/errorpage`);
    }


    useEffect(() => {
        if (data) {
            dispatch(setUser(data?.data?.data));
        }
    }, [data, dispatch]);

    
    const { users } = useSelector((state) => state.user) || [];

    console.log(users);

    const columns = [
        { title: "ID", field: "id" },
        { title: "Full Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Authority", field: "authority" },
        { title: "Level", field: "level" },
        { title: "Date Created", field: "created_at" },
        { title: "Status", field: "status" },
      ];

      const handleActionClick = () => {

      }

      const handleEditClick = () => {

      }


    //Searching implementation for Feeder
    const [searchQuery, setSearchQuery] = useState('');
    const [hiddenFieldValue, setHiddenFieldValue] = useState('search_user');

      //Searching...
    const [postSearch ] = useSearchAssetDTMutation();
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      performSearch(searchQuery);
    }

    const performSearch = async (searchQuery) => {
      try {
        const response = await postSearch({searchQuery, hiddenFieldValue});
        if (response.data.status === "success") {
          notify("success", response.data.message);
          dispatch(setUser(response.data.data.feeders.data));
        } else {
          notify("info", response.data.message);
        }
      } catch (e) {
        notify("error", "Error occured while searching " + e?.message);
      }
    }



     
  return (
    <Fragment>
         
         {isUninitialized ? <PageLoader /> : ''}

         {isFetching ? <PageLoader /> : 

      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
           
              <h4 className="card-title">
             
                All Users &nbsp;&nbsp;
                <NavLink to="/adduser"> 
                <button className="btn btn-xs btn-dark"><span className="icon-user-follow"></span> Add User</button>
                </NavLink>
               
              </h4>
              
              <form onSubmit={handleSearchSubmit}>
              <div class="form-group d-flex">
                        
                        <input type="text" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        name="searching"
                        class="form-control" placeholder="Search User(s)..." />

                        <input type="hidden"  value={hiddenFieldValue} 
                        onChange={(e) => setHiddenFieldValue(e.target.value)}
                        class="form-control" />
                        <button type="submit" class="btn btn-danger ml-3">Search</button>
                    </div>
              </form>


              <div className="table-responsive">
              <DataTable 
                    data={users}
                    columns={columns}
                    pagination
                    currentPage={currentPage}
                    totalCount={data?.data?.total || 1}
                    pageSize={data?.data?.per_page || 1}
                    onPageChange={(page) => setCurrentPage(page)}
                    onActionClick={handleActionClick}
                    Edit
                    onEditClick={handleEditClick}
                    />
              </div>
            </div>

          
          </div>
        </div>
      </div>
       }
    </Fragment>
  );
};

export default Users;
