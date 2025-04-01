import { Outlet, Navigate } from "react-router-dom";

import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const PublicRoutes = () => {
  const { user } = useAuthContext();

  //   if user is logged in prevent from accessing nested routes via outlet
  return user ? <Navigate to='/dashboard' replace /> : <Outlet />;
};

export default PublicRoutes;
