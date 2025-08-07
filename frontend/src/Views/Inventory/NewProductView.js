import React, { useState } from 'react';
import NavigationView from '../Navigation/NavigationView';
import './NewProductView.css';

function NewProductView() {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    type: '',
    price: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('https://sterregaard-web-app.onrender.com/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    const data = await res.json();

    if (data.success) {
      setMessage('Product added!');
      setProduct({ name: '', quantity: '', type: '', price: '' });
    } else {
      setMessage('Something went wrong.');
    }
  };

  return (
    <NavigationView>
      <div className="new-product-container">
        <h2>Voeg Nieuw Product Toe</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Naam"
            value={product.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Hoeveelheid"
            value={product.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type (bijv. kg, stuks)"
            value={product.type}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Prijs (€)"
            step="0.01"
            value={product.price}
            onChange={handleChange}
          />
          <button type="submit">Voeg Product Toe</button>
        </form>
      </div>
    </NavigationView>
  );
}

export default NewProductView;
