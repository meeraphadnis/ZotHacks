import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";

export default function ConfirmImagesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialImages = location.state?.images || [];

  // Store images with id and selected flag
  const [images, setImages] = useState(
    initialImages.map((img, index) => ({ id: index, src: img, selected: false }))
  );

  const toggleSelect = (id) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, selected: !img.selected } : img))
    );
  };

  const selectAllImages = () => {
    setImages((prev) => prev.map((img) => ({ ...img, selected: true })));
  };

  const handleDelete = () => {
    setImages((prev) => prev.filter((img) => !img.selected));
  };

  const handleConfirm = () => {
  const selectedImages = images.filter(img => img.selected);
  if (selectedImages.length === 0) {
    alert("Please select at least one image to confirm.");
    return;
  }
  navigate("/confirmingredients", {
    state: { images: selectedImages.map((img) => img.src) },
  });
};


  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#E8DECA",
        padding: "20px",
        boxSizing: "border-box",
        fontFamily: "Marcellus, serif",
        position: "relative",
      }}
    >
      {/* Header with back arrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <button
          onClick={() => navigate("/add")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            marginRight: 10,
          }}
        >
          <ArrowLeft size={28} color="#7A6D5F" />
        </button>
        <h2 style={{ flex: 1, textAlign: "center", margin: 0 }}>
          Confirm Your Images
        </h2>
        {/* Placeholder to keep header centered */}
        <div style={{ width: 38 }} /> {/* Same width as ArrowLeft to balance */}
      </div>

      {/* Images grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 15,
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%", // make square container
              border: img.selected ? "4px solid #6EBF8B" : "2px solid #ccc",
              borderRadius: 12,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => toggleSelect(img.id)}
          >
            <img
              src={img.src}
              alt="uploaded"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Circular checkbox */}
            <div
              onClick={() => toggleSelect(img.id)}
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "2px solid #6EBF8B", // outline circle
                backgroundColor: img.selected ? "#6EBF8B" : "transparent", // filled if selected
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {img.selected && <Check size={16} color="#E8DECA" />}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom buttons container */}
      <div
        style={{
          position: "fixed",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
        {/* Select All Images button */}
        <button
          onClick={selectAllImages}
          style={{
            backgroundColor: "#9088888B",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "12px 24px",
            cursor: "pointer",
            fontSize: 16,
            width: 250,
            textAlign: "center",
          }}
        >
          Select All Images
        </button>

        {/* other buttons buttons */}
        <div style={{ display: "flex", gap: 20 }}>
          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "#E27D60",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            Delete Selected
          </button>
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
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
