import React, { useEffect, useState } from "react";
import IngredientItem from "../components/IngredientItem";

export default function HomePage() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newExpDate, setNewExpDate] = useState("");

  // Fetch ingredients from backend on first load
  useEffect(() => {
    fetch("http://localhost:8000/api/fridge-items")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched ingredients:", data);  // <--- ADD THIS LINE
        // Convert {Milk: "...", Eggs: "..."} to [{name, expDate}, ...]
        const arr = Object.entries(data).map(([name, expDate]) => ({
          name,
          expDate,
        }));
        setIngredients(arr);
      });
  }, []);  

  // Add ingredient and refresh from backend
  const handleAdd = () => {
    if (newIngredient && newExpDate) {
      fetch("http://localhost:8000/api/fridge-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newIngredient, expiration: newExpDate })
      })
        .then(res => res.json())
        .then(data => {
          const arr = Object.entries(data).map(([name, expDate]) => ({
            name,
            expDate,
          }));
          setIngredients(arr);
          setNewIngredient("");
          setNewExpDate("");
        });
    }
  };

  // Delete ingredient and refresh from backend
  const handleDelete = (name) => {
    fetch(`http://localhost:8000/api/fridge-items/${encodeURIComponent(name)}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        const arr = Object.entries(data).map(([name, expDate]) => ({
          name,
          expDate,
        }));
        setIngredients(arr);
      });
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
            ingredients.map(item => (
              <IngredientItem
                key={item.name}
                name={item.name}
                expDate={item.expDate}
                onDelete={() => handleDelete(item.name)}
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
    </div>
  );
}
