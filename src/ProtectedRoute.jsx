import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // If user has a role but tries to access unauthorized route, redirect to their home
    if (userRole === "admin") return <Navigate to="/admin" replace />;
    if (userRole === "tendor") return <Navigate to="/tendor" replace />;
    if (userRole === "coordinator") return <Navigate to="/coordinator" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
