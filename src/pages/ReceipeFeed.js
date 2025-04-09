import React, { useState, useContext} from 'react';
import RecipeCard from '../components/RecipeCard';
import { Typography, Grid, TextField , Button} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RecipeFeed = ({  recipes, setRecipes  }) => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);  // Update the state
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));  // Update localStorage
  };

  // Toggle favorite status
  const handleFavoriteToggle = (recipe) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === recipe.id)) {
      // If already in favorites, remove it
      updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      // Otherwise, add it to favorites
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to localStorage
  };

   // Check if a recipe is in the favorites list
   const isFavorite = (recipe) => {
    return favorites.some((fav) => fav.id === recipe.id);
  };


  return (
    <div>
      <Typography variant="h4" gutterBottom>All Recipes</Typography>
      <TextField
        label="Search Recipes"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard recipe={recipe}  
            handleFavoriteToggle={handleFavoriteToggle}
              isFavorite={isFavorite(recipe)} 

              />
            <Button 
              color="secondary" 
              onClick={() => handleDelete(recipe.id)} 
               // Delete functionality
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/add')}  // Navigate to the Add Recipe page
        sx={{ marginBottom: '20px' }}
      >
        Add New Recipe
      </Button>
    </div>

    
  );
};

export default RecipeFeed;
