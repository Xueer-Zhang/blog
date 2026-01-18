// src/pages/Login.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(username, email,password);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>register</h2>
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
      <input
        type="text"
        placeholder="mail"
        className="w-full p-4 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">register</button>
    </form>
  );
}