import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const VehiclesDetail = () => {
    const [vehicle, setVehicle] = useState(null);
    const [error, setError] = useState(null);
    const { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicle = async () => {
            if (!uid) {
                setError("Invalid vehicle ID.");
                return;
            }

            const url = `https://www.swapi.tech/api/vehicles/${uid}/`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
                const data = await response.json();
                setVehicle(data.result.properties); // ⬅️ Aquí también cambiamos a `data.result.properties`
            } catch (error) {
                setError(error.message || "Failed to fetch vehicle details.");
            }
        };

        fetchVehicle();
    }, [uid]);

    const vehiclesImg = {
        "Sand Crawler": "https://static.wikia.nocookie.net/starwars/images/f/ff/Sandcrawler.png/revision/latest?cb=20130812001443",
        "X-34 landspeeder": "https://cwwh.de/shop/images/product_images/original_images/X34-landspeeder.jpg",
        "T-16 skyhopper": "https://cdnb.artstation.com/p/assets/images/images/046/978/031/large/kenji-marcio-t16-starwarsscene1-sl.jpg?1646434609",
        "TIE/LN starfighter": "https://static.wikia.nocookie.net/swbloodlines/images/3/3f/TIE_Ln.jpg/revision/latest?cb=20180311171411",
        "Snowspeeder": "https://cornerboothsocialclub.wordpress.com/wp-content/uploads/2012/07/06726_snowspeeder.jpg",
        "AT-AT": "https://preview.redd.it/at-at-question-v0-p7dt80p34iqa1.jpg?width=640&crop=smart&auto=webp&s=a68428cef8943e842bdb13f80724da7ed4740d43",
        "TIE bomber": "https://static.wikia.nocookie.net/disney/images/1/17/TIE_Bomber_BF2.png/revision/latest?cb=20170906175715",
        "AT-ST": "https://i0.wp.com/www.rebelscale.com/wp-content/uploads/command-at-st-snow4.jpg?ssl=1",
        "Storm IV Twin-Pod cloud car": "https://swrpggm.com/wp-content/uploads/2021/10/CloudCar_FE.png",
        "Sail barge": "https://www.brickfanatics.com/wp-content/uploads/2023/03/Star-Wars-Return-of-the-Jedi-Jabbas-Sail-Barge.jpg",
    };

    const vehicleImageUrl = vehicle ? vehiclesImg[vehicle.name] : '';

    if (error) {
        return (
            <div className="container">
                <h1>Error</h1>
                <p>{error}</p>
                <Link to="/single" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    if (!vehicle) return <div>Loading...</div>;

    return (
        <div className="detail-container">
            <div className="detail-content">
                <div className="detail-image">
                    <img src={vehicleImageUrl} alt={vehicle.name} />
                </div>
                <div className="detail-info">
                    <h1>{vehicle.name}</h1>
                    <ul>
                        <li><strong>Model:</strong> {vehicle.model}</li>
                        <li><strong>Manufacturer:</strong> {vehicle.manufacturer}</li>
                        <li><strong>Cost in credits:</strong> {vehicle.cost_in_credits}</li>
                        <li><strong>Length:</strong> {vehicle.length}</li>
                        <li><strong>Max atmosphering speed:</strong> {vehicle.max_atmosphering_speed}</li>
                        <li><strong>Crew:</strong> {vehicle.crew}</li>
                        <li><strong>Passengers:</strong> {vehicle.passengers}</li>
                        <li><strong>Cargo capacity:</strong> {vehicle.cargo_capacity}</li>
                        <li><strong>Consumables:</strong> {vehicle.consumables}</li>
                    </ul>
                    <Link to="/single" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        </div>
    );
};
