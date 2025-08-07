import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginView from './Views/Login/LoginView';
import DashboardView from './Views/Dashboard/DashboardView';
import InventoryView from './Views/Inventory/InventoryView';
import InventoryMutationView from './Views/Inventory/InventoryMutationView';
import NewProductView from './Views/Inventory/NewProductView';
import ClientsView from './Views/Packages/ClientsView';
import PackagesView from './Views/Packages/PackagesView';
import SettingsUserView from './Views/Settings/SettingsUserView';
import SettingsProductView from './Views/Settings/SettingsProductView';

import ProtectedRoute from './Guards/ProtectedRoute';
import AdminRoute from './Guards/AdminRoute';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <LoginView />
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardView /></ProtectedRoute>
        } />

        <Route path="/inventory" element={
          <ProtectedRoute><InventoryView /></ProtectedRoute>
        } />
        <Route path="/inventory/mutate" element={
          <ProtectedRoute><InventoryMutationView /></ProtectedRoute>
        } />
        <Route path="/inventory/new" element={
          <ProtectedRoute><NewProductView /></ProtectedRoute>
        } />

        <Route path="/packages" element={
          <ProtectedRoute><PackagesView /></ProtectedRoute>
        } />
        <Route path="/packages/clients" element={
          <ProtectedRoute><ClientsView /></ProtectedRoute>
        } />

        <Route path="/settings/users" element={
          <AdminRoute><SettingsUserView /></AdminRoute>
        } />
        <Route path="/settings/products" element={
          <AdminRoute><SettingsProductView /></AdminRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
