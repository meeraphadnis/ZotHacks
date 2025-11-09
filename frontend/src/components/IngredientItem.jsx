import React from "react";

export default function IngredientItem({
  name,
  quantity,
  expDate,
  onDelete,
  onIncrease,
  onDecrease,
}) {
  let daysUntilExpiration = null;
  if (expDate) {
    daysUntilExpiration = Math.ceil(
      (new Date(expDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
  }

  let indicatorColor = "#6BBF59";
  if (daysUntilExpiration !== null && daysUntilExpiration <= 2) indicatorColor = "#D9534F";
  else if (daysUntilExpiration !== null && daysUntilExpiration <= 5) indicatorColor = "#F0AD4E";

  const qtyBtn = {
    padding: "1px 4px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f7f7f7",
    color: "#5b6c57",
    fontWeight: "bold",
    fontSize: "1.1em",
    minWidth: "24px",
    minHeight: "24px",
    lineHeight: 1,
    margin: "0 2px",
    cursor: "pointer",
    transition: "0.1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const qtyText = {
    fontWeight: "bold",
    width: "22px",
    textAlign: "center",
    color: "#324a34",
    background: "transparent",
    border: "none",
    fontSize: "1.05em"
  };

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
          <div style={{
            fontWeight: "bold",
            color: "#324a34",
            display: "flex",
            alignItems: "center"
          }}>
            {name}
          </div>
          <div style={{ fontSize: "0.9em", color: "#7a7a7a" }}>
            {expDate && daysUntilExpiration !== null
              ? (
                <>Expires in {daysUntilExpiration} day{daysUntilExpiration !== 1 ? "s" : ""}</>
                )
              : (
                <>No expiration</>
                )}
          </div>
        </div>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginLeft: "20px"
      }}>
        <button onClick={onDecrease} style={qtyBtn}>−</button>
        <span style={qtyText}>{quantity}</span>
        <button onClick={onIncrease} style={qtyBtn}>+</button>
        <button
          onClick={onDelete}
          style={{
            marginLeft: "10px",
            background: "none",
            border: "none",
            padding: "4px",
            cursor: "pointer",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Delete"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="8" y="3" width="8" height="2" rx="1.2" fill="#b33a3a"/>
            <rect x="4" y="6" width="16" height="2" rx="1.3" fill="#ffebe6"/>
            <rect x="6" y="8" width="12" height="12" rx="3" fill="#b33a3a"/>
            <rect x="10" y="12" width="1.7" height="6" rx="0.6" fill="#ffebe6"/>
            <rect x="12.3" y="12" width="1.7" height="6" rx="0.6" fill="#ffebe6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
