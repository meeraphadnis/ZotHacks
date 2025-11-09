import React from "react";
import { Link } from "react-router-dom";
import "../Recipes.css"; // Import the CSS file

export const Recipes = ({ recipes }) => {
  return (
    <div className="recipes-grid">
      {recipes.map((recipe) => (
        <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe-card">
          <img src={recipe.image} alt={recipe.name} className="recipe-image" />
          <div className="recipe-info">
            <h2 className="recipe-name">{recipe.name}</h2>
            <p className="recipe-detail">Calories: {recipe.calories}</p>
            <p className="recipe-detail">Cook Time: {recipe.cookTime}</p>
            <p className="recipe-detail">{recipe.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
