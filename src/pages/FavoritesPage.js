import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';  // Import CSS for this page

const FavoritesPage = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, [user]);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <Typography variant="h4" className="favorites-title" sx={{ textAlign: 'center', fontSize: '2rem', fontWeight: 600 }}>
        Your Favorite Recipes
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card sx={{ borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <CardMedia component="img" alt={recipe.title} height="140" image={recipe.imageUrl} />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {recipe.title}
                </Typography>
                <Button
                  className="remove-button"
                  color="secondary"
                  onClick={() => removeFavorite(recipe.id)}
                  sx={{
                    marginRight: '8px',
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#c53030',
                    },
                  }}
                >
                  Remove from Favorites
                </Button>
                <Button
                  className="view-button"
                  color="primary"
                  component={Link}
                  to={`/recipe/${recipe.id}`}
                  sx={{
                    marginLeft: '8px',
                    backgroundColor: '#3182ce',
                    color: 'white',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#2b6cb0',
                    },
                  }}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
