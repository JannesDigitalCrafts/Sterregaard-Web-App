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

          <li className="nav-section">Voorraad</li>
          <ul className="submenu">
            <li className={location.pathname === '/inventory/new' ? 'active' : ''}>
              <Link to="/inventory/new">Nieuw Product</Link>
            </li>
            <li className={location.pathname === '/inventory/mutate' ? 'active' : ''}>
              <Link to="/inventory/mutate">Muteren</Link>
            </li>
            <li className={location.pathname === '/inventory' ? 'active' : ''}>
              <Link to="/inventory">Product Informatie</Link>
            </li>
          </ul>

          <li className="nav-section">Instellingen</li>
          <ul className="submenu">
            <li className={location.pathname === '/settings/users' ? 'active' : ''}>
              <Link to="/settings/users">Gebruikers</Link>
            </li>
            <li className={location.pathname === '/settings/products' ? 'active' : ''}>
              <Link to="/settings/products">Producten</Link>
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