import React, { useEffect, useState } from 'react';
import NavigationView from '../Navigation/NavigationView';
import './InventoryMutationView.css';

function InventoryMutationView() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('Sell');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await fetch('https://sterregaard-web-app.onrender.com/api/inventory');
    const data = await res.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!selectedId || !quantity) return;

    const res = await fetch(`https://sterregaard-web-app.onrender.com/api/inventory/${selectedId}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantityChange: -Math.abs(parseInt(quantity)),
        note: `${reason}${note ? ` - ${note}` : ''}`
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('Inventory updated successfully.');
      setQuantity('');
      setNote('');
      setReason('Sell');
    } else {
      setMessage('Error updating inventory.');
    }
  };

  return (
    <NavigationView>
      <div className="mutation-container">
        <h2>Inventory Mutation</h2>

        {message && <p className="mutation-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Product</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
            <option value="">Select product</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.quantity})
              </option>
            ))}
          </select>

          <label>Quantity to remove</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <label>Reason</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="Sell">Sell</option>
            <option value="Overdue">Overdue</option>
            <option value="Damage">Damage</option>
          </select>

          <label>Note (optional)</label>
          <input
            type="text"
            placeholder="Add a note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button type="submit">Apply Mutation</button>
        </form>
      </div>
    </NavigationView>
  );
}

export default InventoryMutationView;
