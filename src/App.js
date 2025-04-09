import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeFeed from './pages/ReceipeFeed';
import RecipeFormPage from './pages/RecipeFormPage';
import RecipeDetails from './pages/RecipeDetails';
import Header from './components/Header';
import Login from './pages/login';
import FavoritesPage from './pages/FavoritesPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (storedRecipes.length === 0) {
      fetch('/recipes.json')
        .then((response) => response.json())
        .then((data) => setRecipes(data))
        .catch((error) => console.error('Error fetching recipes:', error));
    } else {
      setRecipes(storedRecipes);
    }
  }, []);

  return (
    <AuthProvider>
    <Router>
      <Header />
      <div>
        <h1>Flavor Exchange: Recipe Sharing Platform</h1>
        <Routes>
        <Route 
              path="/" 
              element={<RecipeFeed recipes={recipes} setRecipes={setRecipes} />} 
            />
          <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
          <Route path="/add" element={<RecipeFormPage recipes={recipes} setRecipes={setRecipes} />} />
          <Route path="/edit/:id" element={<RecipeFormPage recipes={recipes} setRecipes={setRecipes} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
