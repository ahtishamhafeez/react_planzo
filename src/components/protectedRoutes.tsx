import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated, redirect_to } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={'/'} replace />
  }
  if (redirect_to) {
    return <Navigate to={redirect_to} replace />
  }
  return <Outlet />;
};

export default ProtectedRoute;
