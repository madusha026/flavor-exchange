import React, { useState, useContext } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);  // Use login function from AuthContext
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      const userData = { username };
      login(userData);  // Set user data in context
      localStorage.setItem('user', JSON.stringify(userData));  // Store user in localStorage
      navigate('/');  // Redirect to home page
    } else {
      alert('Please enter a valid username');
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Login;
