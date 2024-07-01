import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiContext } from './ApiContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, apiRequest } = useApiContext();

  const handleLogin = async () => {
    try {
      const response = await apiRequest('post', '/auth/token/', { username, password });
      setAccessToken(response.access);
      setRefreshToken(response.refresh);
      navigate('/items/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;



