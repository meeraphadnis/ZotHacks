import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import LoadingOverlay from "../components/LoadingOverlay";

export default function ConfirmImagesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialImages = location.state?.images || [];

  const [images, setImages] = useState(
    initialImages.map((img, index) => ({ id: index, src: img, selected: false }))
  );
  const [loading, setLoading] = useState(false);

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

  // ✅ Fixed handleAnalyze
  const handleAnalyze = async (selectedImages) => {
    try {
      const imageToAnalyze = selectedImages[0];
      if (!imageToAnalyze) {
        alert("Please select at least one image.");
        return;
      }

      setLoading(true); // show overlay while analyzing

      // Convert base64 or blob URL → actual file
      const response = await fetch(imageToAnalyze.src);
      const blob = await response.blob();
      const file = new File([blob], "fridge.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);

      const analyzeResponse = await fetch("http://localhost:8000/files/analyze", {
        method: "POST",
        body: formData,
      });

      if (!analyzeResponse.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await analyzeResponse.json();
      console.log("Analysis result:", data);

      // ✅ Navigate to next page (optionally pass data via state)
      navigate("/confirmingredients", { state: { ingredients: data } });
    } catch (err) {
      console.error("Error analyzing image:", err);
      alert("Something went wrong while analyzing the image.");
    } finally {
      setLoading(false); // hide overlay
    }
  };

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
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <button
          onClick={() => navigate("/add")}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", marginRight: 10 }}
        >
          <ArrowLeft size={28} color="#7A6D5F" />
        </button>
        <h2 style={{ flex: 1, textAlign: "center", margin: 0 }}>Confirm Your Images</h2>
        <div style={{ width: 38 }} />
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
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}
      >
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

      {/* Loading overlay */}
      <LoadingOverlay visible={loading} />
    </div>
  );
}
