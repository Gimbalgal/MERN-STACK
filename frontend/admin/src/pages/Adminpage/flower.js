
//

import React, { useState, useEffect } from "react";
import AddFlower from "./addflower";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Flower() {
  const [flowers, setFlowers] = useState([]);
  const [emptyField, setEmptyField] = useState([]); // State to track empty fields

  // Fetch flowers from the backend
  const fetchFlowers = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/flowers"); // Replace with your backend endpoint
      const data = await response.json();

      if (data.errors) {
        // If backend returns errors, set them in the emptyField state
        setEmptyField(data.errors);
        toast.error("Some fields are missing!");
      } else {
        setFlowers(data);
        setEmptyField([]); // Clear any previous errors
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
      setEmptyField(missingFields); // Set the missing fields in the state
      toast.error("Please fill in all required fields!");
      return;
    }

    // If no fields are missing, proceed to add the flower
    setFlowers([...flowers, newFlower]);
    setEmptyField([]); // Clear any previous errors
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
    <div className="p-4">
      {/* Header Section */}
      <div className="header">
        <h1 className="panel-h1">Admin Panel</h1>
        <div className="button-group">
          <button onClick={fetchFlowers} className="fetch-button">
            Flower
          </button>
          <button onClick={() => console.log("Add Flower Button Clicked")} className="add-button">
            Add Flower
          </button>
        </div>
      </div>
      <hr className="divider" />

      {/* Display Errors */}
      {emptyField.length > 0 && (
        <div className="error-message">
          <p>Please fill in the following fields:</p>
          <ul>
            {emptyField.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Flower Form */}
      <AddFlower onFlowerAdded={handleAddFlower} />

      {/* Flower List */}
      <div className="flower-details">
        <h2 className="panel-h2">Flower List</h2>
        {flowers.length === 0 ? (
          <p>No flowers available</p>
        ) : (
          flowers.map((flower) => (
            <div
              key={flower._id}
              className="border rounded p-4 mb-4 flex items-start space-x-4"
            >
              <img
                src={flower.image}
                alt={flower.name}
                className="flower-image"
              />
              <div className="flex-1">
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
                className="delete-button"
              >
                <span class="material-symbols-outlined">
                delete    </span>
              </button>
            </div>
          ))
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Flower;