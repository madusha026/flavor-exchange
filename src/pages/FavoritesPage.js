import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

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
    <div>
      <Typography variant="h4">Your Favorite Recipes</Typography>
      <Grid container spacing={3}>
        {favorites.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card>
              <CardMedia component="img" alt={recipe.title} height="140" image={recipe.imageUrl} />
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Button color="secondary" onClick={() => removeFavorite(recipe.id)}>Remove from Favorites</Button>
                <Button color="primary" component={Link} to={`/recipe/${recipe.id}`}>View Recipe</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
