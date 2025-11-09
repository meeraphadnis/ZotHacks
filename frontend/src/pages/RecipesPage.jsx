import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Recipes } from "../components/Recipes";

export const RecipesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get fridge items from previous page via router state
  const fridgeItems = location.state?.fridgeItems || [];

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (fridgeItems.length === 0) {
        setError("No ingredients selected.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/get-recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fridgeItems),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipes from backend.");
        }

        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [fridgeItems]);

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`, { state: { recipes } });
  };

  if (loading) return <div className="text-center mt-20">Loading recipes...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error: {error}</div>;

  return (
    <div
      className="min-h-screen bg-[#e8deca] py-10 px-6"
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: 20,
        boxSizing: "border-box",
        fontFamily: "Marcellus, serif",
      }}
    >
      <h1 className="text-4xl font-semibold text-[#46503d] mb-8 text-center">
        Recipes
      </h1>

      <Recipes recipes={recipes} onRecipeClick={handleViewRecipe} />
    </div>
  );
};