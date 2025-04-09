import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import './RecipeDetails.css';  // Import CSS for this page

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeData = recipes.find((r) => r.id === id);
    setRecipe(recipeData);
  }, [id, recipes]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-details" style={{ maxWidth: '900px', margin: 'auto', padding: '16px' }}>
      <Card sx={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#fff'
      }}>
        <CardMedia
          component="img"
          alt={recipe.title}
          height="300"
          image={recipe.image}
          sx={{ borderRadius: '8px', objectFit: 'cover', width: '100%' }}
        />
        <CardContent sx={{ padding: '16px' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>
            {recipe.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '8px', textAlign: 'center' }}>
            {recipe.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
            <strong>Cooking Time:</strong> {recipe.cookingTime}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
            <strong>Rating:</strong> {recipe.rating} / 5
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
            <strong>Instructions:</strong>
            <div style={{ paddingLeft: '20px' }}>
              {recipe.instructions}
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetails;
