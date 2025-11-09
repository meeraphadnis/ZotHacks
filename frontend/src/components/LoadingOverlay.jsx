import React from "react";
import { Oval } from "react-loader-spinner"; // or use ClipLoader from react-spinners

export default function LoadingOverlay({ visible }) {
  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      <Oval height={80} width={80} color="#6EBF8B" ariaLabel="loading" />
    </div>
  );
}
