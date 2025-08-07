import React, { useEffect, useState } from 'react';
import NavigationView from '../Layout/NavigationView';
import './InventoryView.css';

function InventoryView() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', type: '', price: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await fetch('https://sterregaard-web-app.onrender.com/api/inventory');
    const data = await res.json();
    setInventory(data);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('https://sterregaard-web-app.onrender.com/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    const data = await res.json();

    if (data.success) {
      setNewItem({ name: '', quantity: '', type: '', price: '' });
      fetchInventory();
    }

    setMessage(data.message);
  };

  return (
    <NavigationView>
      <div className="inventory-container">
        <h1 className="title">Inventory</h1>

        <div className="section">
          <h3>Add New Item</h3>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleAddItem}>
            <input
              type="text"
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
              required
            />
            <input
              type="text"
              placeholder="Type (e.g. kg)"
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            />
            <button type="submit">Add Item</button>
          </form>
        </div>

        <div className="section">
          <h3>Current Inventory</h3>
          <ul className="inventory-list">
            {inventory.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> – {item.quantity} {item.type} – €{item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NavigationView>
  );
}

export default InventoryView;
