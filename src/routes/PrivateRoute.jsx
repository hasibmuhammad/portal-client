import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuthContext();

  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

export default PrivateRoute;
