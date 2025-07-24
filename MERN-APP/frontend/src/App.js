import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data));
  }, []);

  const addUser = () => {
    if (!name || !email) return alert("Please fill out both fields!");
    axios.post('/api/users', { name, email }).then(res => {
      setUsers([...users, res.data]);
      setName('');
      setEmail('');
    });
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border-2 border-pink-200">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">Sign-Up</h1>

        <input
          className="w-full border border-pink-300 rounded-full px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name..."
        />
        <input
          className="w-full border border-pink-300 rounded-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email..."
        />
        <button
          onClick={addUser}
          className="w-full bg-pink-300 hover:bg-pink-200 text-white font-semibold py-2 px-4 rounded-full transition"
        >
          Add User 
        </button>
      </div>

      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold text-pink-600 mb-3">🌸 Registered Users</h2>
        <ul className="bg-white rounded-3xl border-2 border-pink-100 divide-y divide-pink-100 shadow">
          {users.map(user => (
            <li key={user._id} className="px-4 py-3">
              <span className="font-medium text-pink-600">{user.name}</span> — {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
