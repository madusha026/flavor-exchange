import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';  // Import Header CSS

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            cursor: 'pointer', 
            textTransform: 'uppercase', 
            letterSpacing: '1px' 
          }}
          onClick={() => navigate('/')}
        >
          Flavor Exchange
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="body1" sx={{ marginRight: '16px', fontWeight: 500 }}>
                👋 {user.username}
              </Typography>
              <Button 
                sx={{
                  backgroundColor: '#2c7a7b',
                  color: 'white',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#285e5b',
                  },
                }} 
                component={Link} 
                to="/favorites"
              >
                Favorites
              </Button>
              <Button 
                sx={{
                  backgroundColor: '#e53e3e',
                  color: 'white',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#c53030',
                  },
                }} 
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              sx={{
                backgroundColor: '#3182ce',
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#2b6cb0',
                },
              }} 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
