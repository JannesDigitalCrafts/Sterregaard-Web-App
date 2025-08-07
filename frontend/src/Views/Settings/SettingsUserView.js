import React, { useEffect, useState } from 'react';
import NavigationView from '../Navigation/NavigationView';
import './SettingsUserView.css';

function SettingsUserView() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'staff' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('https://sterregaard-web-app.onrender.com/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('https://sterregaard-web-app.onrender.com/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (data.success) {
      setNewUser({ username: '', password: '', role: 'staff' });
      fetchUsers();
    }

    setMessage(data.message);
  };

  return (
    <NavigationView>
      <div className="settings-users-container">
        <h2>Gebruikersbeheer</h2>

        <div className="user-list-section">
          <h3>Alle Gebruikers</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <strong>{user.username}</strong> – {user.role}
              </li>
            ))}
          </ul>
        </div>

        <div className="add-user-section">
          <h3>Voeg Nieuwe Gebruiker Toe</h3>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              placeholder="Gebruikersnaam"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Wachtwoord"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Voeg Gebruiker Toe</button>
          </form>
        </div>
      </div>
    </NavigationView>
  );
}

export default SettingsUserView;
