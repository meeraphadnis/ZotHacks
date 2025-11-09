import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmIngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ingredients from backend
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await fetch("http://127.0.0.1:8000/files/fridge_items");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        // If data is a dictionary, convert to array
        const list = Array.isArray(data) ? data : Object.entries(data).map(([name, info]) => ({
          name,
          ...info
        }));
        setIngredients(list);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  // Quantity handlers
  const increaseQty = (index) => {
    setIngredients((prev) =>
      prev.map((ing, i) =>
        i === index ? { ...ing, quantity: (ing.quantity || 0) + 1 } : ing
      )
    );
  };

  const decreaseQty = (index) => {
    setIngredients((prev) =>
      prev.map((ing, i) =>
        i === index && (ing.quantity || 0) > 0
          ? { ...ing, quantity: ing.quantity - 1 }
          : ing
      )
    );
  };

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/files/update_ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ingredients),
      });
      if (!response.ok) throw new Error("Failed to update ingredients");
      const data = await response.json();
      console.log("Updated ingredients:", data);
      navigate("/potentialrecipes", { state: { ingredients } });
    } catch (err) {
      console.error("Error sending updated ingredients:", err);
    }
  };

  if (loading) return <p>Loading ingredients...</p>;
  if (error) return <p>Could not load ingredients. Try again.</p>;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#E8DECA",
        padding: 20,
        fontFamily: "Marcellus, serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Confirm Ingredients
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {ingredients.map((ing, index) => (
          <li
            key={index}
            style={{
              padding: "10px 15px",
              marginBottom: 10,
              backgroundColor: "#fff",
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{ing.name}</strong>
              <p style={{ margin: 0, color: "#6EBF8B" }}>
                Exp: {ing.expiration || "N/A"}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={() => decreaseQty(index)}
                style={{
                  background: "#FF9F9F",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                }}
              >
                −
              </button>
              <span>{ing.quantity || 0}</span>
              <button
                onClick={() => increaseQty(index)}
                style={{
                  background: "#6EBF8B",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                }}
              >
                +
              </button>
              <button
                onClick={() => removeIngredient(index)}
                style={{
                  background: "transparent",
                  color: "gray",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

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
