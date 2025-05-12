import React, { useEffect, useRef, useState } from "react";
import "./CustomizerForm.css";

const CustomizerForm = () => {
  const canvasRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    height: 180,
    weight: 85,
    build: "Big",
    image: null,
    text: "",
  });

  useEffect(() => {
    if (!preview) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = preview;
    image.onload = () => {
      // Draw image
      ctx.drawImage(image, 50, 50, 200, 200);

      // Draw text (max 3 lines)
      const lines = form.text.split("\n").slice(0, 3);
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#000";
      lines.forEach((line, i) => {
        ctx.fillText(line, 60, 270 + i * 25);
      });
    };
  }, [preview, form.text]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Customization submitted!");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={form.height}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Build</label>
          <select name="build" value={form.build} onChange={handleChange}>
            <option value="Lean">Lean</option>
            <option value="Regular">Regular</option>
            <option value="Athletic">Athletic</option>
            <option value="Big">Big</option>
          </select>
        </div>

        <div
          className="upload-box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <p>Drop an image here or upload below</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="Preview" className="image-preview" />
          )}
        </div>

        <div className="field">
          <label>Enter text to print on T-shirt (max 3 lines)</label>
          <textarea
            name="text"
            rows={3}
            value={form.text}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="preview-display">
        <canvas ref={canvasRef} width={300} height={400}></canvas>
      </div>
    </div>
  );
};

export default CustomizerForm;
