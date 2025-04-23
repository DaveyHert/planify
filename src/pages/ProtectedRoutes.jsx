import {  Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// wrapper to only allow signed in users access nested routes via outlet
const ProtectedRoutes = () => {
  const { user } = useAuthContext();

  //   redirect user if not sign in
  return user ? <Outlet /> : <Navigate to='/sign-in' replace />;
};

export default ProtectedRoutes;
