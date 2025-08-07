// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './Routes/LoginView';
import DashboardView from './Routes/DashboardView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </Router>
  );
}

export default App;
