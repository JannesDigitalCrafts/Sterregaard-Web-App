import React from 'react';
import NavigationView from '../Layout/NavigationView';
import './InventoryView.css';

function InventoryView() {
  return (
    <NavigationView>
      <h1 className="title">Inventory</h1>
      <p>Manage your inventory here.</p>
    </NavigationView>
  );
}

export default InventoryView;
