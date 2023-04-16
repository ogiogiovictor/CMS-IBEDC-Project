import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../redux/services/auth/authService";
import LoadingSpinner from "../spinner";
import { logout } from "../../redux/auth/authSlice";

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
