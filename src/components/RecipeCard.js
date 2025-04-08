import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
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
        <Button size="small" color="primary" component={Link} to={`/recipe/${recipe.id}`}>
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
