import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css"; // Asegúrate de tener este CSS cargado
import People from "../component/people.js";
import Planets from "../component/planets.js";
import Vehicles from "../component/vehicles.js";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [user, setUser] = useState();

	useEffect(() => {
		actions.getUser().then(resp => setUser(resp));
		actions.loadPeopleData();
		actions.loadPlanetsData();
		actions.loadVehiclesData();
	}, []);
	

    const handleLogout = () => {
        const success = actions.logout();
        if (success) {
            navigate("/");
        }
    };

    const peopleImg = {
        "Luke Skywalker": "https://static.wikia.nocookie.net/esstarwars/images/1/15/Luke_Skywalker_Ep_7_SWCT.png/revision/latest?cb=20170215060145",
        "C-3PO": "https://www.gamereactor.es/media/70/light_upc_3pohead_4357033_650x.jpg",
        "R2-D2": "https://i.blogs.es/6de2fa/r2d2/1366_2000.webp",
        "Darth Vader": "https://imagenes.cadena100.es/files/og_thumbnail/uploads/2024/09/20/66ed7d3989217.jpeg",
        "Leia Organa": "https://cinepremiere.com.mx/wp-content/uploads/2020/06/Leia-Organa-Star-Wars--1024x559.jpg",
        "Owen Lars": "https://images2.minutemediacdn.com/image/upload/c_crop,x_762,y_0,w_2847,h_1601/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImageExchange/mmsport/319/01j042f763qcer531j30.jpg",
        "Beru Whitesun lars": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgAqKX72ZgFxo2DihDl89cGLdXep_nc25g1A&s",
        "R5-D4": "https://static.wikia.nocookie.net/star-wars-canon-extended/images/2/23/R5.jpg/revision/latest/scale-to-width-down/374?cb=20160123232521",
        "Biggs Darklighter": "https://i.insider.com/555219ca6bb3f7a502baac2c?width=700",
        "Obi-Wan Kenobi": "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2020/12/obi-wan-kenobi.jpg?fit=2052%2C1155&quality=50&strip=all&ssl=1"
    };

    const planetsImg = {
        "Tatooine": "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357",
        "Alderaan": "https://static.wikia.nocookie.net/esstarwars/images/4/4a/Alderaan.jpg/revision/latest?cb=20100723184830",
        "Yavin IV": "https://static.wikia.nocookie.net/esstarwars/images/d/d4/Yavin-4-SWCT.png/revision/latest?cb=20170924222729",
        "Hoth": "https://static.wikia.nocookie.net/esstarwars/images/8/81/Hoth_AoRCR.png/revision/latest?cb=20220720013233",
        "Dagobah": "https://static.wikia.nocookie.net/esstarwars/images/1/1c/Dagobah.jpg/revision/latest?cb=20061117132132",
        "Bespin": "https://static.wikia.nocookie.net/esstarwars/images/2/2c/Bespin_EotECR.png/revision/latest?cb=20170527220537",
        "Endor": "https://static.wikia.nocookie.net/esstarwars/images/e/e5/Endor-SWCT.png/revision/latest?cb=20170629180854",
        "Naboo": "https://static.wikia.nocookie.net/esstarwars/images/f/f0/Naboo_planet.png/revision/latest?cb=20190928214307",
        "Coruscant": "https://static.wikia.nocookie.net/esstarwars/images/1/16/Coruscant-EotE.jpg/revision/latest?cb=20221030195452",
        "Kamino": "https://static.wikia.nocookie.net/esstarwars/images/a/a9/Eaw_Kamino.jpg/revision/latest?cb=20210616005549"
    };

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
        "Sail barge": "https://www.brickfanatics.com/wp-content/uploads/2023/03/Star-Wars-Return-of-the-Jedi-Jabbas-Sail-Barge.jpg"
    };

    if (!user) return null;

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="mb-4 text-center">Bienvenido, {user.email}</h1>
                <button className="btn btn-danger" style={{ marginRight: "400px" }} onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </div>

            <h1>People</h1>
            <div className="horizontal-scroll">
                {store.people?.map(person => (
                    <People
                        key={person.uid}
                        uid={person.uid}
                        name={person.name}
                        imageUrl={peopleImg[person.name] || 'url-a-placeholder'}
                    />
                ))}
            </div>

            <h1>Planets</h1>
            <div className="horizontal-scroll">
                {store.planets?.map(planet => (
                    <Planets
                        key={planet.uid}
                        uid={planet.uid}
                        name={planet.name}
                        imageUrl={planetsImg[planet.name] || 'url-a-placeholder'}
                    />
                ))}
            </div>

            <h1>Vehicles</h1>
            <div className="horizontal-scroll">
                {store.vehicles?.map(vehicle => (
                    <Vehicles
                        key={vehicle.uid}
                        uid={vehicle.uid}
                        name={vehicle.name}
                        imageUrl={vehiclesImg[vehicle.name] || 'url-a-placeholder'}
                    />
                ))}
            </div>
        </div>
    );
};
