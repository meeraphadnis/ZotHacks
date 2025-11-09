import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ConfirmIngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/fridge-items")
      .then(res => res.json())
      .then(data => {
        const loadedIngredients = Object.entries(data).map(
          ([name, expiration], idx) => ({
            id: idx,
            name,
            expiration,
          })
        );
        setIngredients(loadedIngredients);
      });
  }, []);

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    setIngredients((prev) => [
      ...prev,
      { id: prev.length, name: newIngredient, expiration: "Unknown" },
    ]);
    setNewIngredient("");
  };

  const handleConfirm = () => {
    // TODO: send ingredients to backend or process further
    console.log("Final ingredients:", ingredients);
    navigate("/potentialrecipes", { state: { ingredients } });
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#E8DECA",
        padding: 20,
        boxSizing: "border-box",
        fontFamily: "Marcellus, serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Confirm Ingredients
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {ingredients.map((ing) => (
          <li
            key={ing.id}
            style={{
              padding: "10px 15px",
              marginBottom: 10,
              backgroundColor: "#fff",
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{ing.name}</span>
            <span style={{ color: "#6EBF8B" }}>{ing.expiration}</span>
          </li>
        ))}
      </ul>

      {/* Add custom ingredient */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="Add ingredient"
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #b4eac7ff", backgroundColor: "#b4eac7ff"}}
        />
        <button
          onClick={addIngredient}
          style={{
            backgroundColor: "#6EBF8B",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <button
        onClick={handleConfirm}
        style={{
          backgroundColor: "#6EBF8B",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "12px 24px",
          cursor: "pointer",
          fontSize: 16,
          display: "block",
          margin: "0 auto",
        }}
      >
        Confirm
      </button>
    </div>
  );
}
