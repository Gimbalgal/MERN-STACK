import { useEffect, useState } from "react";
import './home.css'

const Homepage = () => {
    const [flowers, setFlowers] = useState([]);

    useEffect(() => {
        const fetchFlowers = async () => {
            const response = await fetch('/api/flowers');
            const json = await response.json();
            if (response.ok) {
                setFlowers(json);
            }
        };
        fetchFlowers(); 
    }, []);

    return ( 
        <div className="home">
            <div className="flower">
                {flowers.map((flower) => (
                    <p key={flower._id}>{flower.name}</p>
                ))}
            </div>
        </div>
    );
};

export default Homepage;



