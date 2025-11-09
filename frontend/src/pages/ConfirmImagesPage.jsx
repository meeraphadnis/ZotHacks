import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function ConfirmImagesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialImages = location.state?.images || [];

  const [images, setImages] = useState(
    initialImages.map((img, index) => ({ id: index, src: img, selected: false }))
  );

  const toggleSelect = (id) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, selected: !img.selected } : img))
    );
  };

  const handleDelete = () => {
    setImages((prev) => prev.filter((img) => !img.selected));
  };

  // ✅ NEW: Send selected image(s) to Gemini
  const handleAnalyze = async (selectedImages) => {
    try {
      // For now, just analyze the first selected image
      const imageToAnalyze = selectedImages[0];
      if (!imageToAnalyze) {
        alert("Please select at least one image.");
        return;
      }

      // Convert base64 or blob URL → actual file
      const response = await fetch(imageToAnalyze.src);
      const blob = await response.blob();
      const file = new File([blob], "fridge.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("http://127.0.0.1:8000/files/analyze", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await uploadResponse.json();
      console.log("Gemini result:", data);

      // Once analysis is done, go to ConfirmIngredientsPage
      navigate("/confirmingredients");
    } catch (err) {
      console.error("Error analyzing image:", err);
      alert("Something went wrong while analyzing the image.");
    }
  };

  // ✅ Updated Confirm button
  const handleConfirm = () => {
    const selected = images.filter((img) => img.selected);
    handleAnalyze(selected);
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
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Confirm Your Images</h2>

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
              paddingBottom: "100%",
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
                border: "2px solid #6EBF8B",
                backgroundColor: img.selected ? "#6EBF8B" : "transparent",
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

      {/* Bottom buttons */}
      <div
        style={{
          position: "fixed",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 20,
        }}
      >
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
  );
}
