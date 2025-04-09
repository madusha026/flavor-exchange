  import { Favorite, FavoriteBorder } from '@mui/icons-material';
  import { Button } from '@mui/material';  // Use Material UI Button
  import Timer from './Timer';
  import { Link } from 'react-router-dom';
  import './RecipeCard.css';  // Import RecipeCard CSS

  const RecipeCard = ({ recipe, handleDelete, handleFavoriteToggle, isFavorite }) => {
    return (
      <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-info">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-info-text">Cooking Time: {recipe.cookingTime}</p>
          <p className="recipe-info-text">Rating: {recipe.rating ? recipe.rating : "Not rated"} / 5</p>
          <Timer cookingTime ={recipe.cookingTime} />
          <div className="button-container">
            <Button
              onClick={() => handleFavoriteToggle(recipe)}
              sx={{
                color: 'red',
                '&:hover': {
                  color: 'darkred',
                },
              }}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </Button>
            <Button
              sx={{
                backgroundColor: '#3182ce',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2b6cb0',
                },
              }}
            >
              View
            </Button>
            <Button
              onClick={() => handleDelete(recipe.id)}
              sx={{
                backgroundColor: '#e53e3e',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#c53030',
                },
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        </Link>
      </div>
    );
  };

  export default RecipeCard;
