import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

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
