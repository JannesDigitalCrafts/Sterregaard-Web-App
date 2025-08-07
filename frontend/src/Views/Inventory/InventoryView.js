import React, { useEffect, useState } from 'react';
import NavigationView from '../Navigation/NavigationView';
import './InventoryView.css';

function InventoryView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await fetch('https://sterregaard-web-app.onrender.com/api/inventory');
    const data = await res.json();
    setItems(data);
  };

  return (
    <NavigationView>
      <div className="inventory-container">
        <h2>Inventory Overview</h2>

        {items.length === 0 ? (
          <p>No inventory items found.</p>
        ) : (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Type</th>
                <th>Price (€)</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.type}</td>
                  <td>{parseFloat(item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </NavigationView>
  );
}

export default InventoryView;
