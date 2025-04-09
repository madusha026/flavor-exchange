import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';  // Heart icons from Material-UI

const RecipeCard = ({ recipe, handleDelete, handleFavoriteToggle, isFavorite }) => {
  return (
    <Card>
      <CardMedia component="img" alt={recipe.title} height="140" image={recipe.imageUrl} />
      <CardContent>
        <Typography variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cooking Time: {recipe.cookingTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {recipe.rating} / 5
        </Typography>

        {/* Favorite Icon */}
        <Button 
          onClick={() => handleFavoriteToggle(recipe)}
          style={{ padding: 0 }}
        >
          {isFavorite ? <Favorite color="primary" /> : <FavoriteBorder color="primary" />}
        </Button>

        {/* Edit and Delete Buttons */}
        <Button color="primary" component={Link} to={`/edit/${recipe.id}`}>
          Edit
        </Button>
        <Button color="secondary" onClick={() => handleDelete(recipe.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
