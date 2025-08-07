import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './NavigationView.css';

function NavigationView({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Sterregaard</h2>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <button onClick={handleLogout} className="logout-button">
          Log out
        </button>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default NavigationView;
