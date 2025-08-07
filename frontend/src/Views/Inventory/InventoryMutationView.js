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
      setMessage('Voorraad succesvol bijgewerkt.');
      setQuantity('');
      setNote('');
      setReason('Verkopen');
    } else {
      setMessage('Fout bij het bijwerken van de voorraad.');
    }
  };

  return (
    <NavigationView>
      <div className="mutation-container">
        <h2>Voorraad Mutatie</h2>

        {message && <p className="mutation-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Product</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
            <option value="">Selecteer product</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.quantity})
              </option>
            ))}
          </select>

          <label>Hoeveelheid te verwijderen</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <label>Reden</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="Sell">Verkopen</option>
            <option value="Overdue">Te laat</option>
            <option value="Damage">Schade</option>
          </select>

          <label>Notitie (optioneel)</label>
          <input
            type="text"
            placeholder="Voeg een notitie toe"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button type="submit">Pas Mutatie Toe</button>
        </form>
      </div>
    </NavigationView>
  );
}

export default InventoryMutationView;
