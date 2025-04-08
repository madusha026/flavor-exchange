import React from 'react';
import RecipeForm from '../components/RecipeForm';

const RecipeFormPage = ({ recipes, setRecipes }) => {
  return (
    <div>
      <RecipeForm recipes={recipes} setRecipes={setRecipes} />
    </div>
  );
};

export default RecipeFormPage;
