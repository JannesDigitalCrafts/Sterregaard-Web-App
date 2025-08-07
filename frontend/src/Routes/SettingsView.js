import React from 'react';
import NavigationView from '../Layout/NavigationView';
import './SettingsView.css';

function SettingsView() {
  return (
    <NavigationView>
      <h1 className="title">Settings</h1>
      <p>Here you can change app settings.</p>
    </NavigationView>
  );
}

export default SettingsView;
