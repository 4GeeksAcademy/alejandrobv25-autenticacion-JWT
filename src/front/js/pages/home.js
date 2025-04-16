import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/nuevaHome.css";

export const Home = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignup, setIsSignup] = useState(false);
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSignup) {
			const success = await actions.signup(email, password);
			if (success) {
				alert("Registro exitoso. Ahora inicia sesión.");
				setIsSignup(false);
				setEmail("");
				setPassword("");
			}
		} else {
			const loggedIn = await actions.login(email, password);
			if (loggedIn) {
				setEmail("");
				setPassword("");
				navigate("/single");
			} else {
				alert("Login fallido. Verifica tus credenciales.");
			}
		}
	};

	return (
		<div className="auth-container">
			<form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
				<h2>{isSignup ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="off"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Contraseña"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="off"
					required
				/>
				<button type="submit" className="btn btn-primary">
					{isSignup ? "Registrarse" : "Iniciar Sesión"}
				</button>
				<div className="auth-toggle">
					{isSignup ? "¿Ya tienes una cuenta?" : "¿No estás registrado?"}{" "}
					<button
						type="button"
						className="btn btn-link"
						onClick={() => {
							setIsSignup(!isSignup);
							setEmail("");
							setPassword("");
						}}
					>
						{isSignup ? "Inicia sesión" : "Crea una cuenta"}
					</button>
				</div>
			</form>
		</div>
	);
};
