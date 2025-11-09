// src/components/IngredientItem.jsx
import React from "react";

export default function IngredientItem({ name, expDate, onDelete }) {
  const daysUntilExpiration = Math.ceil(
    (new Date(expDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  let indicatorColor = "#6BBF59"; // green
  if (daysUntilExpiration <= 2) indicatorColor = "#D9534F"; // red
  else if (daysUntilExpiration <= 5) indicatorColor = "#F0AD4E"; // orange

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fffdf6",
        borderRadius: "15px",
        padding: "12px 18px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: indicatorColor,
            flexShrink: 0,
          }}
        ></div>
        <div>
          <div style={{ fontWeight: "bold", color: "#324a34" }}>{name}</div>
          <div style={{ fontSize: "0.9em", color: "#7a7a7a" }}>
            Expires in {daysUntilExpiration} day
            {daysUntilExpiration !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <button
        onClick={onDelete}
        style={{
          border: "none",
          backgroundColor: "#ffebe6",
          color: "#b33a3a",
          borderRadius: "10px",
          padding: "5px 12px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "0.2s",
        }}
      >
        Delete
      </button>
    </div>
  );
}
