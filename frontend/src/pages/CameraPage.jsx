import React, { useRef, useState, useEffect } from "react";
import { PlusCircle, Upload, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [capturing, setCapturing] = useState(false); // is camera frozen for capture
  const [captureReady, setCaptureReady] = useState(true); // + or checkmark state
  const [images, setImages] = useState([]); // captured/uploaded images
  const [flash, setFlash] = useState(false);

  // Start camera
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCapture = () => {
    if (!captureReady) {
      // Checkmark state → confirm picture
      if (!canvasRef.current) return;
      const imgData = canvasRef.current.toDataURL("image/png");
      setImages((prev) => [...prev, imgData]);
      setCaptureReady(true);
      setCapturing(false);
      if (videoRef.current) videoRef.current.play();
    } else {
      // + state → freeze video
      if (!canvasRef.current || !videoRef.current) return;
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setCapturing(true);
      setCaptureReady(false);
      videoRef.current.pause();

      // Flash effect
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    }
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleConfirm = () => {
    navigate("/confirmimages", { state: { images } });
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#E8DECA",
        padding: "90px 20px 120px",
        boxSizing: "border-box",
        fontFamily: "Marcellus, serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Video + Flash */}
      <div
        style={{
          width: "90%",
          maxWidth: 500,
          aspectRatio: "4/3",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "#000",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {flash && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.3,
              pointerEvents: "none",
              transition: "opacity 0.15s",
            }}
          />
        )}
      </div>

      {/* Buttons: Upload, +/Checkmark, Confirm */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 15,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        {/* Upload */}
        <label
          style={{
            backgroundColor: "#6EBF8B",
            color: "#fff",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Upload size={28} />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>

        {/* + / Checkmark */}
        <button
          onClick={handleCapture}
          style={{
            backgroundColor: "#6EBF8B",
            color: "#fff",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
        >
          {captureReady ? (
            <PlusCircle size={28} color="#fff" />
          ) : (
            <Check size={28} color="#fff" />
          )}
        </button>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          style={{
            backgroundColor: "#6EBF8B",
            color: "#fff",
            borderRadius: "50%",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          Confirm
        </button>
      </div>

      {/* Captured/Uploaded Images Gallery */}
      {images.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            width: "90%",
            maxWidth: 500,
            marginTop: 10,
          }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              style={{
                width: "30%",
                aspectRatio: "1/1",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <img
                src={img}
                alt={`capture-${idx}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
