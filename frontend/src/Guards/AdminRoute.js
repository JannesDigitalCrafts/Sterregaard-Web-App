import React from 'react';
import { Navigate } from 'react-router-dom';
import AccessDeniedView from '../Views/AccessDenied/AccessDeniedView';

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (role !== 'admin') {
    return <AccessDeniedView />;
  }

  return children;
}

export default AdminRoute;
