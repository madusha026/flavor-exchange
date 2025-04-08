import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const recipeData = recipes.find((r) => r.id === id);
    setRecipe(recipeData);
  }, [id, recipes]);

  if (!recipe) return <div>Loading...</div>;

  // Safely handle ingredients if not an array
  const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : 'Ingredients not available';

  return (
    <div>
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
          <Typography variant="body2" color="text.secondary">
            Ingredients: {ingredients}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Instructions: {recipe.instructions}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetails;
