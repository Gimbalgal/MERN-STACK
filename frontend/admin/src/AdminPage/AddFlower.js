

import React, { useState } from "react";

function AddFlower({ onFlowerAdded }) {
  const [flower, setFlower] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // 🔍 preview image

  const handleChange = (e) => {
    setFlower({ ...flower, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // 🖼️ set preview URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(flower).forEach((key) => formData.append(key, flower[key]));
    formData.append("image", image);

    const res = await fetch("http://localhost:7000/api/flowers", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onFlowerAdded(data);

    // 🧹 Reset form
    setFlower({ name: "", description: "", category: "", price: "" });
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow w-full max-w-sm" id="form">
      <h2 className="addflower">Add Flower</h2>
      <input name="name" value={flower.name} onChange={handleChange} placeholder="Name" className="form-control mb-3" required />
      <input name="description" value={flower.description} onChange={handleChange} placeholder="Description" className="form-control mb-3" required />
      <input name="category" value={flower.category} onChange={handleChange} placeholder="Category" className="form-control mb-3" required />
      <input name="price" value={flower.price} onChange={handleChange} placeholder="Price" className="form-control mb-3" type="number" required />
      <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" required />

      {/*  Preview Section */}
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="img-fluid rounded border mb-3" />
      )}

      <button type="submit" className="btn btn-primary w-100">
        Upload
      </button>
    </form>
  );
}

export default AddFlower;