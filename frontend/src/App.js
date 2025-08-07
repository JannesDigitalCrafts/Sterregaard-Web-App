import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginView from './Views/Login/LoginView';
import DashboardView from './Views/Dashboard/DashboardView';
import SettingsView from './Views/Settings/SettingsView';
import InventoryView from './Views/Inventory/InventoryView';
import ProtectedRoute from './Guards/ProtectedRoute';
import AdminRoute from './Guards/AdminRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
            localStorage.getItem('loggedIn') === 'true'
              ? <Navigate to="/dashboard" />
              : <LoginView />
          }
        />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardView /></ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute><InventoryView /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <AdminRoute><SettingsView /></AdminRoute>
        } />
        <Route path="*" element={
          <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
