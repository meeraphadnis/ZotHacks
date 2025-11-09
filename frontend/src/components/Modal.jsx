import React from "react";

export function Modal({ show, onClose, children, recipe, onCooked }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.21)",
        zIndex: 3000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 430,
          width: "90vw",
          maxHeight: "86vh",
          overflowY: "auto",
          padding: 30,
          boxShadow: "0 4px 32px rgba(0,0,0,0.17)",
          position: "relative"
        }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            right: 16,
            top: 12,
            border: "none",
            background: "#E26D5A",
            color: "#fff",
            fontSize: 28,
            borderRadius: "50%",
            width: 38,
            height: 38,
            boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9999,
            outline: "none",
            transition: "background 0.18s"
          }}
          aria-label="Close"
          onMouseOver={e => { e.target.style.background = "#cf5642"; }}
          onMouseOut={e => { e.target.style.background = "#E26D5A"; }}
        >
          &times;
        </button>
        <div style={{ paddingTop: 10 }}>{children}</div>
        {recipe && onCooked && (
          <button
            style={{
              background: "#6EBF8B",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "0.7em 1.6em",
              fontWeight: "bold",
              fontSize: "1.08em",
              cursor: "pointer",
              marginTop: "18px",
              width: "100%",
              maxWidth: 320
            }}
            onClick={() => onCooked(recipe)}
          >
            Mark as Cooked
          </button>
        )}
      </div>
    </div>
  );
}