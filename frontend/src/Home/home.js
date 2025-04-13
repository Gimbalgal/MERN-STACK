import { useEffect, useState } from "react";

import Flowerdetails from "../component/flowerDetail";

const Home = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        const fetchFlowers = async () => {
            try {
                const response = await fetch('/api/flowers'); // double-check this!
                const json = await response.json();
                console.log("Fetched flowers:", json);

                if (response.ok && Array.isArray(json)) {
                    setFlowers(json);
                } else {
                    console.error("Invalid flower data", json);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchFlowers();
    }, []);

    return (
        <div className="admin">
            <div className="flower">
                {flowers && flowers.map((flower) => (
                    <Flowerdetails key={flower.id} flower={flower} />
                ))}
            </div>
        </div>
    );
};

export default Home;
