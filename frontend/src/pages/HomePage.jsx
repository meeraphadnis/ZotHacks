import React, { useEffect, useState, useRef } from "react";
import IngredientItem from "../components/IngredientItem";

export default function HomePage() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [newExpDate, setNewExpDate] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const dateInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/fridge-items")
      .then(res => res.json())
      .then(data => {
        const arr = Object.entries(data).map(([name, info]) => ({
          name,
          quantity: info[0],
          expDate: info[1] || null,
        }));
        setIngredients(arr);
      });
  }, []);

  const handleAdd = () => {
    if (newIngredient) {
      fetch("http://localhost:8000/api/fridge-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newIngredient,
          quantity: newQuantity,
          expiration: newExpDate || null,
        }),
      })
        .then(res => res.json())
        .then(data => {
          const arr = Object.entries(data).map(([name, info]) => ({
            name,
            quantity: info[0],
            expDate: info[1] || null,
          }));
          setIngredients(arr);
          setNewIngredient("");
          setNewExpDate("");
          setNewQuantity(1);
        });
    }
  };

  // Calendar pop-up logic
  const openCalendar = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
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
                quantity={item.quantity}
                expDate={item.expDate}
                onDelete={() => handleDelete(item.name)}
                onIncrease={() => handleIncrease(item.name)}
                onDecrease={() => handleDecrease(item.name)}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#6a6a6a", marginTop: "30px" }}>
              No ingredients added yet.
            </p>
          )}
        </div>
        {/* Add Ingredient Section */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "700px",
            width: "100%",
            margin: "0 auto",
            borderTop: "2px solid #e0d6bd",
            paddingTop: "25px"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "8px"
          }}>
            <input
              type="text"
              value={newIngredient}
              onChange={e => setNewIngredient(e.target.value)}
              placeholder="Ingredient name"
              style={{
                flex: "1 1 120px",
                padding: "8px",
                borderRadius: "12px",
                border: "1.5px solid #b8c1a9",
                color: "#324a34",
                backgroundColor: "#fffdf6",
                fontSize: "1em",
                minWidth: "80px",
                marginRight: "8px"
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <button
                type="button"
                onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
                style={{
                  padding: "1px 5px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#ececec",
                  color: "#324a34",
                  fontWeight: "bold",
                  fontSize: "1.15em",
                  cursor: "pointer",
                  minWidth: "22px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="11" width="12" height="2" rx="1" fill="#324a34"/>
                </svg>
              </button>
              <span style={{
                display: "inline-block",
                width: "28px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.1em",
                color: "#324a34",
                background: "transparent"
              }}>
                {newQuantity}
              </span>
              <button
                type="button"
                onClick={() => setNewQuantity(newQuantity + 1)}
                style={{
                  padding: "1px 5px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#ececec",
                  color: "#324a34",
                  fontWeight: "bold",
                  fontSize: "1.15em",
                  cursor: "pointer",
                  minWidth: "22px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="11" width="12" height="2" rx="1" fill="#324a34"/>
                  <rect x="11" y="6" width="2" height="12" rx="1" fill="#324a34"/>
                </svg>
              </button>
            </div>
          </div>
          {/* Expiration input and calendar picker to the right */}
          <div style={{
            display: "flex",
            alignItems: "center",
            margin: "13px 0 0 0",
            width: "100%"
          }}>
            <input
              ref={dateInputRef}
              type="date"
              value={newExpDate}
              onChange={e => setNewExpDate(e.target.value)}
              placeholder="Expiration (optional)"
              style={{
                flex: "1 1 190px",
                padding: "12px",
                borderRadius: "12px",
                border: "1.5px solid #b8c1a9",
                color: "#324a34",
                backgroundColor: "#fffdf6",
                fontSize: "1.15em",
                minWidth: "145px",
                outline: "none",
                marginRight: "4px"
              }}
            />
            <button
              type="button"
              onClick={openCalendar}
              style={{
                background: "none",
                border: "none",
                padding: "0 0 0 6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
              aria-label="Pick Expiration Date"
            >
              <svg width="27" height="27" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="6" width="18" height="15" rx="3" fill="#b8c1a9"/>
                <rect x="3" y="4" width="18" height="4" rx="1.5" fill="#324a34"/>
                <rect x="7" y="0" width="2" height="8" rx="1" fill="#324a34"/>
                <rect x="15" y="0" width="2" height="8" rx="1" fill="#324a34"/>
              </svg>
            </button>
          </div>
          {/* Big Add button below */}
          <button
            onClick={handleAdd}
            style={{
              backgroundColor: "#6EBF8B",
              color: "#fffdf6",
              border: "none",
              borderRadius: "18px",
              padding: "18px 40px",
              fontWeight: "bold",
              fontSize: "1.25em",
              cursor: "pointer",
              transition: "0.2s ease",
              marginTop: "18px"
            }}
          >
            Add
          </button>
        </div>
      </section>
    </div>
  );
}
