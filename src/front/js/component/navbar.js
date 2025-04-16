import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/nuevaHome.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <Link to="/">
                <img
                    src="https://storage.mslocacoes.com/mslocacoes/1f3274221be44582b9e5527606a3017d.jpg"
                    alt="Star Wars Logo"
                    className="navbar-brand mb-0 h1"
                    style={{ height: "100px", marginLeft: "20px" }}
                />
            </Link>
            <div className="ml-auto" style={{ marginRight: "50px" }}>
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="favoritesDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites ({store.favorites.length})
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item">No favorites added</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                    {fav.name}
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => actions.removeFavorite(fav.uid, fav.type)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;