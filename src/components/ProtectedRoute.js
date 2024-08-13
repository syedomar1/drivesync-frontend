import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, requiredRole }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userRole = localStorage.getItem("userRole");

  // Redirect to login if not authenticated or if role does not match
  if (!isAdmin || (requiredRole && userRole !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
