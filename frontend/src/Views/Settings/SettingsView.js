import React, { useEffect, useState } from 'react';
import NavigationView from '../Navigation/NavigationView';
import './SettingsView.css';

function SettingsView() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
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
      setNewUser({ username: '', password: '' });
      fetchUsers();
    }

    setMessage(data.message);
  };

  return (
    <NavigationView>
      <div className="settings-container">
        <h2>Settings</h2>

        <div className="section">
          <h3>All Users</h3>
            <ul className="user-list">
            {users.map((user) => (
                <li key={user.id}>
                {user.username} <span className="user-role">({user.role})</span>
                </li>
            ))}
            </ul>
        </div>

        <div className="section">
          <h3>Add New User</h3>
          {message && <p className="message">{message}</p>}
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                </select>
                <button type="submit">Add User</button>
            </form>
        </div>
      </div>
    </NavigationView>
  );
}

export default SettingsView;
