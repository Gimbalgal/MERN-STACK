import React, { useState } from 'react';
import AddFlower from './addflower';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Flower() {
    const [flowers, setFlowers] = useState([]);

const handleAddFlower = (newFlower) => {
    setFlowers([...flowers, newFlower]);
    toast.success('Flower added successfully!');
};

    return (
    <div>
        <h1>Flower Management</h1>
        <AddFlower onAddFlower={handleAddFlower} />
        <div>
        <h2>Flower List</h2>
        {flowers.map((flower, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
            <img src={flower.image} alt={flower.name} style={{ width: '100px', height: '100px' }} />
            <p><strong>Name:</strong> {flower.name}</p>
            <p><strong>Description:</strong> {flower.description}</p>
            <p><strong>Price:</strong> ${flower.price}</p>
            <p><strong>Category:</strong> {flower.category}</p>
            </div>
        ))}
    </div>
    <ToastContainer />
    </div>
);
}

export default Flower;