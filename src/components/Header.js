import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Flavor Exchange
        </Typography>
        {user ? (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>👋 {user.username}</Typography>
             <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
