import React from 'react';
import NavigationView from '../Navigation/NavigationView';
import './DashboardView.css';

function DashboardView() {
  return (
    <NavigationView>
      <h1 className="title">Dashboard</h1>
      <p>Welcome to the dashboard.</p>
    </NavigationView>
  );
}

export default DashboardView;
