import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../redux/services/auth/authService";
import LoadingSpinner from "../spinner";
import { logout } from "../../redux/auth/authSlice";

const ProtectedRoute = () => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { isFetching } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    } else if (!isFetching && userInfo == null) {
      dispatch(logout());
      navigate("/");
    } else if (userInfo == undefined) {
      dispatch(logout());
      navigate("/");
    } else if (!isFetching && !userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  console.log(userInfo);

  // returns child route elements
  return isFetching ? <LoadingSpinner /> : <Outlet />;
};
export default ProtectedRoute;
