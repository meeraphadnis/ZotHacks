import React, { useState } from "react";
import IngredientItem from "../components/IngredientItem";

export default function HomePage() {
  const [ingredients, setIngredients] = useState([
    { name: "Milk", expDate: "2025-11-10" },
    { name: "Eggs", expDate: "2025-11-15" },
    { name: "Spinach", expDate: "2025-11-09" },
  ]);

  const [newIngredient, setNewIngredient] = useState("");
  const [newExpDate, setNewExpDate] = useState("");

  const handleAdd = () => {
    if (newIngredient && newExpDate) {
      setIngredients([
        ...ingredients,
        { name: newIngredient, expDate: newExpDate },
      ]);
      setNewIngredient("");
      setNewExpDate("");
    }
  };

  const handleDelete = (index) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#E8DECA",
        padding: "90px 5vw 120px",
        boxSizing: "border-box",
        fontFamily: "Marcellus, serif",
      }}
    >
      {/* Ingredients Section */}
      <section style={{ marginBottom: "50px" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#324a34",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Ingredients
        </h1>

        {/* Ingredient List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "700px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <IngredientItem
                key={index}
                name={item.name}
                expDate={item.expDate}
                onDelete={() => handleDelete(index)}
              />
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                color: "#6a6a6a",
                marginTop: "30px",
              }}
            >
              No ingredients added yet.
            </p>
          )}
        </div>

        {/* Add Ingredient Section (Moved Below) */}
        <div
          style={{
            marginTop: "35px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            paddingTop: "15px",
            borderTop: "2px solid #d6ccb4",
          }}
        >
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Ingredient name"
            style={{
              flex: "1 1 200px",
              padding: "10px",
              borderRadius: "12px",
              border: "1.5px solid #b8c1a9",
              color: "#324a34",
              backgroundColor: "#fffdf6",
              fontSize: "1em",
            }}
          />
          <input
            type="date"
            value={newExpDate}
            onChange={(e) => setNewExpDate(e.target.value)}
            style={{
              flex: "1 1 150px",
              padding: "10px",
              borderRadius: "12px",
              border: "1.5px solid #b8c1a9",
              color: "#324a34",
              backgroundColor: "#fffdf6",
              fontSize: "1em",
            }}
          />
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: "#6EBF8B",
              color: "#fffdf6",
              border: "none",
              borderRadius: "12px",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "1em",
              cursor: "pointer",
              transition: "0.2s ease",
            }}
          >
            Add
          </button>
        </div>
      </section>

      {/* Recently Cooked Section */}
      <section>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#324a34",
            textAlign: "center",
            margin: "30px 0 15px",
          }}
        >
          Recently Cooked
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fffdf6",
              borderRadius: "15px",
              padding: "10px 15px",
              width: "90%",
              textAlign: "center",
              color: "#6a6a6a",
              fontSize: "0.95em",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            You haven’t cooked anything yet!
          </div>
        </div>
      </section>
    </div>
  );
}
