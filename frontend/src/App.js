import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginView from './Routes/LoginView';
import DashboardView from './Routes/DashboardView';
import SettingsView from './Routes/SettingsView';
import InventoryView from './Routes/InventoryView';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><DashboardView /></ProtectedRoute>
        } />
        <Route path="/inventory" element={
          <ProtectedRoute><InventoryView /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><SettingsView /></ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
