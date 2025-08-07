import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isLoggedIn || role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
