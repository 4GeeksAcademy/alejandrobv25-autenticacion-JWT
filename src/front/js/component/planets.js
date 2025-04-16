import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Planets = ({ uid, name, imageUrl }) => {
    const { actions, store } = useContext(Context);
    
    const isFavorite = store.favorites.some(fav => fav.uid === uid && fav.type === "planets");

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={imageUrl} className="card-img-top" alt={name} style={{ height: "200px", objectFit: "cover" }} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <button
                    className="btn btn-link"
                    onClick={() => {
                        if (isFavorite) {
                            actions.removeFavorite(uid, "planets");
                        } else {
                            actions.addFavorite({ uid, name, type: "planets" });
                        }
                    }}
                    style={{ color: isFavorite ? "red" : "gray", fontSize: "1.5rem" }}
                >
                    <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
                <Link to={`/planets/${uid}`} className="btn btn-primary">
                    Learn more!
                </Link>
            </div>
        </div>
    );
};

export default Planets;