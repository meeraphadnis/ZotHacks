import React, { useState, useEffect } from "react";
import "../Recipes.css";
import { ArrowLeft } from "lucide-react";

export const Recipes = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCookedModalOpen, setIsCookedModalOpen] = useState(false);

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
    setIsCookedModalOpen(false);
  };

  const handleOpenCookedModal = () => {
    setIsCookedModalOpen(true);
  };

  const handleCloseCookedModal = () => {
    setIsCookedModalOpen(false);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedRecipe]);

  return (
    <>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => handleCardClick(recipe)}
          >
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <div className="recipe-info">
              <h2 className="recipe-name">{recipe.name}</h2>
              <p className="recipe-detail">Calories: {recipe.calories}</p>
              <p className="recipe-detail">Cook Time: {recipe.cookTime}</p>
              <p className="recipe-detail">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-left" onClick={handleCloseModal}>
              <ArrowLeft color="#333" size={24} />
            </button>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="modal-image"
            />

            <div className="modal-info">
              <h2 className="recipe-name">{selectedRecipe.name}</h2>
              <div className="modal-details">
                <div>
                  <p className="recipe-detail">Calories: {selectedRecipe.calories}</p>
                  <p className="recipe-detail">Cook Time: {selectedRecipe.cookTime}</p>
                </div>
                <button className="cooked-button" onClick={handleOpenCookedModal}>
                  Cooked
                </button>
              </div>

              <p className="recipe-detail">{selectedRecipe.description}</p>

              {/* Add this part */}
              <h3 className="instructions-title">Recipe / Instructions</h3>
              <p className="recipe-instructions">{selectedRecipe.instructions}</p>
            </div>

          </div>
        </div>
      )}

      {/* Smaller Sub-Modal for "Cooked" */}
      {isCookedModalOpen && (
        <div className="submodal-overlay" onClick={handleCloseCookedModal}>
          <div
            className="submodal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="submodal-title">Ingredients Used</h3>
            
            <div className="ingredients-header">
              <span>Ingredient</span>
              <span>Quantity</span>
            </div>

            <ul className="ingredients-list">
              <li className="ingredient-item">
                <span>Sample Ingredient 1</span>
                <span className="ingredient-qty">1</span>
              </li>
              <li className="ingredient-item">
                <span>Sample Ingredient 2</span>
                <span className="ingredient-qty">2</span>
              </li>
              <li className="ingredient-item">
                <span>Sample Ingredient 3</span>
                <span className="ingredient-qty">3</span>
              </li>
              <li className="ingredient-item">
                <span>Sample Ingredient 4</span>
                <span className="ingredient-qty">4</span>
              </li>
            </ul>

            {/* Buttons row */}
            <div className="submodal-buttons">
              <button
                onClick={handleCloseCookedModal}
                className="submodal-button close-submodal"
              >
                Close
              </button>
              <button className="submodal-button confirm-submodal">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
