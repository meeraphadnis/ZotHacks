import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/recipes")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load recipes.");
        return res.json();
      })
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert("Could not load recipes: " + err.message);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e8deca",
        fontFamily: "Marcellus, serif",
        padding: 30,
      }}
    >
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#46503d",
        textAlign: "center",
        marginBottom: 30
      }}>
        Recipes
      </h1>
      {loading && <div style={{textAlign: "center", marginTop: 40}}>Loading recipes...</div>}
      <div style={{
        maxWidth: 650, margin: "0 auto",
        display: "flex", flexDirection: "column", gap: "15px"
      }}>
        {recipes.map(recipe => (
          <div
            key={recipe.name}
            style={{
              cursor: "pointer",
              background: "#fffdf6",
              borderRadius: "14px",
              padding: "17px",
              boxShadow: "0 1px 4px rgba(0,0,0,.09)",
              fontWeight: 500,
              letterSpacing: 0.1,
              fontSize: "1.1rem",
              color: "#324a34"
            }}
            onClick={() => setSelectedRecipe(recipe)}
          >
            {recipe.name}
          </div>
        ))}
      </div>
      <Modal show={!!selectedRecipe} onClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <div>
            <h2 style={{
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 13,
              color: "#46503d"
            }}>{selectedRecipe.name}</h2>
            {selectedRecipe.image_url &&
              <img src={selectedRecipe.image_url} alt={selectedRecipe.name}
                style={{
                  width: "100%", borderRadius: 12, marginBottom: 13, maxHeight: 170, objectFit: "cover"
                }}
              />
            }
            <h4 style={{marginBottom: 7}}>Ingredients</h4>
            <ul>
              {selectedRecipe.ingredients.map((ing, idx) =>
                <li key={idx}>{ing.item}: {ing.quantity}</li>
              )}
            </ul>
            <h4 style={{marginTop: 17, marginBottom: 7}}>Instructions</h4>
            <div style={{whiteSpace: "pre-line", fontSize: "1.02em"}}>
              {selectedRecipe.instructions}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
