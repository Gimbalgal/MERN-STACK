// import React, { useState } from 'react';

// function AddFlower({ onAddFlower }) {
// const [flowerName, setFlowerName] = useState('');
// const [flowerDescription, setFlowerDescription] = useState('');
// const [flowerPrice, setFlowerPrice] = useState('');
// const [flowerCategory, setFlowerCategory] = useState('');
// const [flowerImage, setFlowerImage] = useState('');

// const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!flowerName || !flowerDescription || !flowerPrice || !flowerCategory || !flowerImage) {
//         alert('Please fill in all fields!');
//         return;
//     }

//     const newFlower = {
//         name: flowerName,
//         description: flowerDescription,
//         price: flowerPrice,
//         category: flowerCategory,
//         image: flowerImage,
//     };

//     onAddFlower(newFlower);
//     setFlowerName('');
//     setFlowerDescription('');
//     setFlowerPrice('');
//     setFlowerCategory('');
//     setFlowerImage('');
// };

// return (
//     <div>
//     <h2>Add New Flower</h2>
//     <form onSubmit={handleSubmit}>
//         <input
//             type="text"
//             placeholder="Flower Name"
//             value={flowerName}
//             onChange={(e) => setFlowerName(e.target.value)}
//         />
//         <textarea
//             placeholder="Flower Description"
//             value={flowerDescription}
//             onChange={(e) => setFlowerDescription(e.target.value)}
//         />
//         <input
//             type="number"
//             placeholder="Flower Price"
//             value={flowerPrice}
//             onChange={(e) => setFlowerPrice(e.target.value)}
//         />
//         <input
//             type="text"
//             placeholder="Flower Category"
//             value={flowerCategory}
//             onChange={(e) => setFlowerCategory(e.target.value)}
//         />
//         <input
//             type="text"
//             placeholder="Flower Image URL"
//             value={flowerImage}
//             onChange={(e) => setFlowerImage(e.target.value)}
//         />
//         <button type="submit">Add Flower</button>
//         </form>
//     </div>
//   );
// }

// export default AddFlower;


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
      <input name="name" value={flower.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
      <input name="description" value={flower.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
      <input name="category" value={flower.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" required />
      <input name="price" value={flower.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" type="number" required />
      <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" required />

      {/*  Preview Section */}
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded border" />
      )}

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Upload
      </button>
    </form>
  );
}

export default AddFlower;
