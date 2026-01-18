// src/pages/Login.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>login</h2>
      <input
        type="text"
        placeholder="username"
        className="w-full p-4 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="password"
        className="w-full p-4 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">login</button>
    </form>
  );
}