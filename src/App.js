import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeFeed from './pages/ReceipeFeed';
import RecipeFormPage from './pages/RecipeFormPage';
import RecipeDetails from './pages/RecipeDetails';
import Header from './components/Header';
import Login from './pages/login';
import FavoritesPage from './pages/FavoritesPage';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { Button } from '@mui/material';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (storedRecipes.length === 0) {
      fetch('./recipes.json') // Ensure correct path
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched data:', data); // Check if data is fetched correctly
          setRecipes(data);
          localStorage.setItem('recipes', JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching recipes:', error));
    } else {
      console.log('Stored data:', storedRecipes); // Check if localStorage has data
      setRecipes(storedRecipes);
    }
  }, []);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Button onClick={toggleDarkMode} className="dark-mode-button">
          Toggle Dark Mode
        </Button>
        <div className="content-container">
          <h1 className="main-title">Flavor Exchange: Recipe Sharing Platform</h1>
          <Routes>
            <Route path="/" element={<RecipeFeed recipes={recipes} setRecipes={setRecipes} />} />
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
