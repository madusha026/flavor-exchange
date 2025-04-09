import React, { useState, useContext } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';  // Import CSS for this page

const Login = () => {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      const userData = { username };
      login(userData); 
      localStorage.setItem('user', JSON.stringify(userData)); 
      navigate('/'); 
    } else {
      alert('Please enter a valid username');
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h4" className="login-title" sx={{ textAlign: 'center', fontWeight: 600 }}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        sx={{
          marginBottom: '16px',
        }}
      />
      <Button 
        className="login-button" 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
        sx={{
          marginTop: '16px',
          backgroundColor: '#3182ce',
          '&:hover': {
            backgroundColor: '#2b6cb0',
          },
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
