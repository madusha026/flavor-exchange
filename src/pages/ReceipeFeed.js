import React, { useState, useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Typography, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RecipeFeed.css';  // Import CSS for this page

const RecipeFeed = ({ recipes, setRecipes }) => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [dietaryFilter, setDietaryFilter] = useState('');
  const navigate = useNavigate();

  // Filter recipes by title and dietary restrictions
  const filteredRecipes = recipes.filter((recipe) => {
    // Filter by search term
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by dietary restriction (if any filter is selected)
    const matchesDietaryFilter = dietaryFilter === '' || recipe.dietaryRestrictions.includes(dietaryFilter);

    return matchesSearch && matchesDietaryFilter;
  });

  const handleDietaryFilterChange = (event) => {
    setDietaryFilter(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);  
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));  
  };

  const handleFavoriteToggle = (recipe) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === recipe.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };

  const isFavorite = (recipe) => {
    return favorites.some((fav) => fav.id === recipe.id);
  };

  return (
    <div className="recipe-feed">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontSize: '2rem', fontWeight: 600 }}>
        All Recipes
      </Typography>

      <div className="filter-container" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <FormControl sx={{ width: '25%' }}>
          <InputLabel id="dietary-restriction-label">Dietary Restrictions</InputLabel>
          <Select
            labelId="dietary-restriction-label"
            value={dietaryFilter}
            onChange={handleDietaryFilterChange}
            sx={{ width: '100%' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Vegan">Vegan</MenuItem>
            <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
            <MenuItem value="Dairy-Free">Dairy-Free</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search Recipes"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ marginBottom: '16px' }}
        />
      </div>

      <Grid container spacing={6}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard 
              recipe={recipe}  
              handleFavoriteToggle={handleFavoriteToggle}
              isFavorite={isFavorite(recipe)}
            />
            <Button
              color="secondary"
              onClick={() => handleDelete(recipe.id)}
              sx={{
                marginTop: '8px',
                backgroundColor: '#e53e3e',
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#c53030',
                },
              }}
            >
              Delete
            </Button>
          </Grid>
        ))}
      </Grid>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/add')}
        sx={{
          marginTop: '32px',
          width: '100%',
          backgroundColor: '#3182ce',
          '&:hover': {
            backgroundColor: '#2b6cb0',
          },
        }}
      >
        Add New Recipe
      </Button>
    </div>
  );
};

export default RecipeFeed;
