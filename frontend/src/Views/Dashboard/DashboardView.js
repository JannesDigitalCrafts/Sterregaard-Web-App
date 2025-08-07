import React from 'react';
import NavigationView from '../Navigation/NavigationView';
import './DashboardView.css';

function DashboardView() {
  return (
    <NavigationView>
      <h1 className="title">Dashboard</h1>
      <p>Welkom op het dashboard.</p>
    </NavigationView>
  );
}

export default DashboardView;
