import React, { useState, useContext} from 'react';
import RecipeCard from '../components/RecipeCard';
import { Typography, Grid, TextField } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const RecipeFeed = ({ recipes }) => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipeFeed;
