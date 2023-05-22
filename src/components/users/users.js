import React, {Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllUserQuery } from "../../redux/services/user/userService";
import { setUser } from "../../redux/services/user/userSlice";
import PageLoader from "../spinner/loader";
import DataTable from "../datatable";

const Users = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { data, isFetching, isUninitialized, isError } = useGetAllUserQuery({ pageNo: currentPage  });

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

     
  return (
    <Fragment>
         
         {isUninitialized ? <PageLoader /> : ''}

         {isFetching ? <PageLoader /> : 

      <div className="row">
        <div className="col-md-12 grid-margin grid-margin-md-0 stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                All Users
              </h4>
              <div class="form-group d-flex">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Customer(s)..."
                />
                <button type="submit" class="btn btn-primary ml-3">
                  Search
                </button>
              </div>
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
