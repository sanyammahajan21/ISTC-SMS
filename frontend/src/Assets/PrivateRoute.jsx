import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole, userRole, isLoggedIn, redirectPath = '/' }) => {
  if (!isLoggedIn || userRole !== requiredRole) {
    // User is not logged in or does not have the required role, redirect them
    return <Navigate to={redirectPath} replace />;
  }

  // User is authorized, return the desired element
  return element;
};

export default PrivateRoute;
