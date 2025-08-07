import React from 'react';
import { Navigate } from 'react-router-dom';
import AccessDenied from '../Routes/AccessDenied';

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (role !== 'admin') {
    return <AccessDenied />;
  }

  return children;
}

export default AdminRoute;
