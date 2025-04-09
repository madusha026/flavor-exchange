import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './RecipeForm.css';  // Import RecipeForm CSS

const RecipeForm = ({ recipes, setRecipes }) => {
  const [title, setTitle] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const recipe = recipes.find((r) => r.id === id);
      if (recipe) {
        setTitle(recipe.title);
        setCookingTime(recipe.cookingTime);
        setRating(recipe.rating);
        setImage(recipe.image);
        setIngredients(recipe.ingredients.join(', '));
        setInstructions(recipe.instructions);
      }
    }
  }, [id, recipes]);

  const handleSave = () => {
    const newRecipe = {
      id: id || Date.now().toString(),
      title,
      cookingTime,
      rating,
      image,
      ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
      instructions,
    };

    const updatedRecipes = id
      ? recipes.map((recipe) => (recipe.id === id ? newRecipe : recipe))
      : [...recipes, newRecipe];

    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    navigate('/');
  };

  return (
    <div className="recipe-form">
      <Typography variant="h4">{id ? 'Edit Recipe' : 'Add New Recipe'}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Cooking Time" variant="outlined" fullWidth value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Rating" variant="outlined" fullWidth value={rating} onChange={(e) => setRating(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Image URL" variant="outlined" fullWidth value={image} onChange={(e) => setImage(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Ingredients" variant="outlined" fullWidth value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Instructions" variant="outlined" fullWidth multiline rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {id ? 'Save Changes' : 'Add Recipe'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeForm;
