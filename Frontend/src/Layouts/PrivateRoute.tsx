import jwtDecode from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import { getToken } from "../Pages/Auth/Login/AuthSlice/authSlice";

interface IProp {
    roles: string[];
  }
  export const PrivateRoute: React.FC<IProp> = ({ roles }) => {
    const location = useLocation();
    const token = useAppSelector(getToken);
  
    if (!token) {
      return <Navigate to={'/login'} state={{ from: location }} replace />;
    }
  
    const decode = jwtDecode<{ Role: string }>(token || '');
  
    const { Role } = decode;
  
    if (roles?.includes(Role)) {
      return <Outlet />;
    }
  
    return <Navigate to={'/not-auth'} state={{ from: location }} replace />;
  };