import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavigationView.css';

function NavigationView({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>Sterregaard</h2>
        <ul>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li className="nav-section">Inventory</li>
          <ul className="submenu">
            <li className={location.pathname === '/inventory/new' ? 'active' : ''}>
              <Link to="/inventory/new">New Product</Link>
            </li>
            <li className={location.pathname === '/inventory/mutate' ? 'active' : ''}>
              <Link to="/inventory/mutate">Mutate</Link>
            </li>
            <li className={location.pathname === '/inventory' ? 'active' : ''}>
              <Link to="/inventory">Product Info</Link>
            </li>
          </ul>

          <li className="nav-section">Settings</li>
          <ul className="submenu">
            <li className={location.pathname === '/settings/users' ? 'active' : ''}>
              <Link to="/settings/users">Users</Link>
            </li>
            <li className={location.pathname === '/settings/products' ? 'active' : ''}>
              <Link to="/settings/products">Products</Link>
            </li>
          </ul>
        </ul>

        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </nav>

      <main className="main-content">{children}</main>
    </div>
  );
}

export default NavigationView;