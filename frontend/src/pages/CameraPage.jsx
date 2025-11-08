import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Check, Upload } from "lucide-react";

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [tempImage, setTempImage] = useState(null);
  const navigate = useNavigate();

  // Start camera
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    startCamera();
  }, []);

  // Log images for debugging
  useEffect(() => {
    console.log("Images array:", images);
    console.log("Number of confirmed images:", images.length);
  }, [images]);

  const handleTakePicture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setTempImage(dataUrl);
    }
  };

  const handleConfirmPicture = () => {
    if (tempImage) {
      setImages((prev) => [...prev, tempImage]);
      setTempImage(null);
    }
  };

  const handleDone = () => {
    navigate("/confirmimages", {state: { images }});
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#E8DECA",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay preview */}
      {tempImage && (
        <img
          src={tempImage}
          alt="preview"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Button container */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 20,
        }}
      >
        {/* Upload button */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#6EBF8B",
            width: 70,
            height: 70,
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <Upload size={32} color="#E8DECA" />
          <input
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
        </label>

        {/* Take / confirm picture button */}
        <button
          onClick={tempImage ? handleConfirmPicture : handleTakePicture}
          style={{
            backgroundColor: "#6EBF8B",
            border: "none",
            borderRadius: "50%",
            width: 70,
            height: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E8DECA",
            cursor: "pointer",
          }}
        >
          {tempImage ? <Check size={32} /> : <PlusCircle size={32} />}
        </button>

        {/* Done button */}
        {images.length > 0 && (
          <button
            onClick={handleDone}
            style={{
              backgroundColor: "#6EBF8B",
              border: "none",
              borderRadius: "50%",
              width: 70,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E8DECA",
              cursor: "pointer",
            }}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}
