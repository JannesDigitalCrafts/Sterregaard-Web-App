import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginView from './Routes/LoginView';
import DashboardView from './Routes/DashboardView';
import InventoryView from './Routes/InventoryView';
import SettingsView from './Routes/SettingsView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/inventory" element={<InventoryView />} />
        <Route path="/settings" element={<SettingsView />} />
      </Routes>
    </Router>
  );
}

export default App;
