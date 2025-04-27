// import React, { useState } from 'react';
// import AddFlower from './addflower';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Flower() {
//     const [flowers, setFlowers] = useState([]);

// const handleAddFlower = (newFlower) => {
//     setFlowers([...flowers, newFlower]);
//     toast.success('Flower added successfully!');
// };

//     return (
//     <div>
//         <h1>Flower Management</h1>
//         <AddFlower onAddFlower={handleAddFlower} />
//         <div>
//         <h2>Flower List</h2>
//         {flowers.map((flower, index) => (
//             <div key={index} style={{ marginBottom: '10px' }}>
//             <img src={flower.image} alt={flower.name} style={{ width: '100px', height: '100px' }} />
//             <p><strong>Name:</strong> {flower.name}</p>
//             <p><strong>Description:</strong> {flower.description}</p>
//             <p><strong>Price:</strong> ${flower.price}</p>
//             <p><strong>Category:</strong> {flower.category}</p>
//             </div>
//         ))}
//     </div>
//     <ToastContainer />
//     </div>
// );
// }

// export default Flower;

import React, { useState, useEffect } from "react";
import AddFlower from "./addflower";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Flower() {
const [flowers, setFlowers] = useState([]);

  // Fetch flowers from the backend
    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                    const response = await fetch("http://localhost:7000/api/flowers"); // Replace with your backend endpoint
                    const data = await response.json();
                    setFlowers(data);
        } catch (error) {
                    console.error("Error fetching flowers:", error);
                    toast.error("Failed to load flowers");
    }
    };

    fetchFlowers();
}, []);

  // Handle adding a new flower
const handleAddFlower = (newFlower) => {
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
    <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Flower Management</h1>

      {/* Add Flower Form */}
    <AddFlower onFlowerAdded={handleAddFlower} />

      {/* Flower List */}
        <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Flower List</h2>
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
                className="w-24 h-24 object-cover rounded"
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
                className="bg-red-500 text-white px-4 py-2 rounded"
                >
                Delete
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