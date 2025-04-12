import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Flowers = () => {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFlowers();
    }, []);

    const fetchFlowers = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/flowers`);
            const filteredFlowers = data.filter((flower) =>
                [
                    "uploads/aromaCandle.png",
                    "uploads/dryFlower.png",
                    "uploads/freshFlower.png",
                    "uploads/livePlant.png",
                    "uploads/freshener.png",
                ].includes(flower.imageUrl)
            );
            setFlowers(filteredFlowers);
        } catch (error) {
            console.error("Error fetching flowers:", error);

            // 🎉 Here's the SweetAlert popup
            Swal.fire({
                title: "Oops!",
                text: "Failed to fetch flowers. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });

            setError("Failed to fetch flowers. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading flowers...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && flowers.length > 0 ? (
                <ul>
                    {flowers.map((flower, index) => (
                        <li key={index}>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${flower.imageUrl}`}
                                alt={flower.name}
                                width={100}
                            />
                            <p>{flower.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No flowers found.</p>
            )}
        </div>
    );
};

export default Flowers;
