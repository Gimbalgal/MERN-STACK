

import React, { useState, useEffect } from "react";
import AddFlower from "./addflower";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Flower() {
  const [flowers, setFlowers] = useState([]); // State to store flowers

  // Fetch flowers from the backend
  const fetchFlowers = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/flowers"); // Replace with your backend endpoint
      const data = await response.json();

      if (data.errors) {
        toast.error("Some fields are missing!");
      } else {
        setFlowers(data);
        toast.success("Flowers fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching flowers:", error);
      toast.error("Failed to load flowers");
    }
  };

  // Fetch flowers on component mount
  useEffect(() => {
    fetchFlowers();
  }, []);

  // Handle adding a new flower
  const handleAddFlower = (newFlower) => {
    // Example validation for empty fields
    const missingFields = [];
    if (!newFlower.name) missingFields.push("Name");
    if (!newFlower.description) missingFields.push("Description");
    if (!newFlower.price) missingFields.push("Price");
    if (!newFlower.category) missingFields.push("Category");

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // If no fields are missing, proceed to add the flower
    setFlowers([...flowers, newFlower]);
    toast.success("Flower added successfully!");
  };

  // Handle deleting a flower
  const handleDeleteFlower = async (id) => {
    try {
      await fetch(`http://localhost:7000/api/flowers/${id}`, {
        method: "DELETE",
      });
      setFlowers(flowers.filter((flower) => flower._id !== id));
      toast.info("Flower deleted successfully!");
    } catch (error) {
      console.error("Error deleting flower:", error);
      toast.error("Failed to delete flower");
    }
  };

  return (
    <div className="custom-container">
      {/* Header Section */}
      <div className="header">
        <h1 className="title">Admin Panel</h1>
        <div className="button-group">
          <button onClick={fetchFlowers} className="btn btn-dark btn-sm">
            Flower
          </button>
          <button onClick={() => console.log("Add Flower Button Clicked")} className="btn btn-outline-dark btn-sm">
            Add Flower
          </button>
        </div>
      </div>
      <hr className="divider" />

      {/* Main Content */}
      <div className="content">
        {/* Left: Add Flower Form */}
        <div className="form">
          <AddFlower onFlowerAdded={handleAddFlower} />
        </div>

        {/* Right: Flower Details */}
        <div className="flower-details">
          <h2 className="subtitle">Flower List</h2>
          {flowers.length === 0 ? (
            <p className="empty-message">No flowers available</p>
          ) : (
            flowers.map((flower) => (
              <div key={flower._id} className="flower-card">
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="flower-image"
                />
                <div className="flower-info">
                  <p>
                    <strong>Name:</strong> {flower.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {flower.description}
                  </p>
                  <p>
                    <strong>Price:</strong> ${flower.price}
                  </p>
                  <p>
                    <strong>Category:</strong> {flower.category}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteFlower(flower._id)}
                  className="btn btn-danger"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Flower;