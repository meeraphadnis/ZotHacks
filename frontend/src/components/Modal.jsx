import React from "react";

export function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="modal-overlay"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.21)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center"
      }}>
      <div className="modal-content"
        style={{
          background: "#fff", borderRadius: 16, maxWidth: 430, width: "90vw",
          padding: 30, boxShadow: "0 4px 32px rgba(0,0,0,0.17)", position: "relative"
        }}>
        <button onClick={onClose}
            style={{
              position: "absolute", right: 16, top: 12, border: "none",
              background: "none", fontSize: 32, color: "#aaa", cursor: "pointer"
            }} aria-label="Close">&times;</button>
        {children}
      </div>
    </div>
  );
}
