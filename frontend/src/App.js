import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginView from './Routes/LoginView';
import DashboardView from './Routes/DashboardView';
import SettingsView from './Routes/SettingsView';
import InventoryView from './Routes/InventoryView';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute';


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
