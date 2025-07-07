// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Flowers = () => {
//     const [flowers, setFlowers] = useState([]);
//     const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchFlowers();
//   }, []);

//   const fetchFlowers = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//     const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/flowers`);
    
//       // Filter only specific flower images
//     const filteredFlowers = data.filter(flower =>
//         ['/uploads/aromaCandle.png', '/uploads/dryFlower.png',
//         '/uploads/freshener.png', '/uploads/freshFlower.png',
//         '/uploads/livePlant.png'].includes(flower.image)
//     );

//         setFlowers(filteredFlowers);
//     } catch (err) {
//         console.error("Error fetching flowers:", err);
//         setError(err.message);
//     } finally {
//         setLoading(false);
//     }
// };

// return (
//     <div style={{ padding: '20px' }}>
//         {loading ? (
//         <p>Loading flowers...</p>
//     ) : error ? (
//         <p>Error: {error}</p>
//     ) : (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//             {flowers.map((flower, index) => (
//                 <div key={index} style={{ width: '200px', textAlign: 'center' }}>
//                 <img 
//                 src={`${process.env.REACT_APP_API_URL}${flower.image}`} 
//                 alt={flower.name} 
//                 style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
//                 />
//                 <p>{flower.name}</p>
//             </div>
//         ))}
//         </div>
//     )}
//     </div>
// );
// };

// export default Flowers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Flowers = () => {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);

const fetchFlowers = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/flowers`);
        setFlowers(data);
    } catch (err) {
        console.error("Error fetching flowers:", err);
    } finally {
        setLoading(false);
    }
};

const deleteFlower = async (id) => {
    const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'This flower will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/flowers/${id}`);
        Swal.fire('Deleted!', 'The flower has been deleted.', 'success');
        fetchFlowers(); // refresh list
    } catch (err) {
        Swal.fire('Error', 'Failed to delete flower.', 'error');
    }
    }
};

useEffect(() => {
    fetchFlowers();
}, []);

    if (loading) return <p>Loading flowers...</p>;

    return (
    <div className="flowers-list">
        <h2>All Flowers</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {flowers.map((flower) => (
            <div key={flower._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', width: '200px' }}>
            <img
                src={`${process.env.REACT_APP_API_URL}${flower.image}`}
                alt={flower.name}
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
            />
            <h4>{flower.name}</h4>
            <p>{flower.description}</p>
            <p><b>${flower.price}</b></p>
            <button onClick={() => deleteFlower(flower._id)} style={{ color: 'red' }}>Delete</button>
            </div>
        ))}
    </div>
    </div>
);
};

export default Flowers;
