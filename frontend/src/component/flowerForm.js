import React, { useState } from 'react';

const Flowerform = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null); // Change to null for file upload
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const flower = { name, description, price, category };

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        if (image) {
            formData.append('image', image); // Append file
        }

        try {
            const response = await fetch('/api/flowers', {
                method: 'POST',
                body: formData, // Send form data instead of JSON
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setImage(null);
                setError(null);
                console.log('New flower added', json);
            }
        } catch (err) {
            setError('Something went wrong');
            console.error(err);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Flower</h3>

            <label>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />

            <label>Description</label>
            <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />

            <label>Price</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} value={price} />

            <label>Category</label>
            <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} />

            <label>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

            <button>Add Flower</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Flowerform;
