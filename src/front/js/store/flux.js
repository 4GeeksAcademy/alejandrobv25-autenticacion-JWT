const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			people: [],
            planets: [],
            vehicles: [],
            favorites: [],
			isAuthenticated: false 
		},
		actions: {
			login: async (email, password) => {
				try {
					const token = await fetch(`${process.env.BACKEND_URL}api/login`, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email, password })
					});
			
					if (!token.ok) {
						throw new Error("Login failed");
					}
			
					const tokenJson = await token.json();
					localStorage.setItem('token', tokenJson.access_token);
					return true;
				} catch (err) {
					console.log('Error durante login:', err);
					return false;
				}
			},

			signup: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
			
					if (!response.ok) {
						throw new Error('Error al registrar el usuario');
					}
			
					const data = await response.json();
					console.log("Usuario registrado exitosamente:", data);
					return true; // Indica que el registro fue exitoso
				} catch (error) {
					console.error("Error en el registro:", error);
					return false; // Indica que hubo un error en el registro
				}
			},

			getUser: async () => {
				const token = localStorage.getItem('token');

				try {
					const user = await fetch(`${process.env.BACKEND_URL}api/user`, {
						method: "GET",
						headers: { // Corregido de "heaers" a "headers"
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					});
					if (!user.ok) return Throw ('error get user');
					return await user.json();
				} catch {
					console.log("error");
				}
			},

			logout: () => {
				try {
					// Elimina el token del localStorage
					localStorage.removeItem('token');
			
					// Limpia los favoritos del estado global y del localStorage
					setStore({ favorites: [] });
					localStorage.removeItem('favorites');
			
					// Limpia otros datos del estado global si es necesario
					setStore({ message: null });
			
					console.log("Sesión cerrada exitosamente");
					return true;
				} catch (error) {
					console.error("Error al cerrar sesión:", error);
					return false;
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			loadPeopleData: () => {
                fetch('https://www.swapi.tech/api/people/')
                    .then(resp => resp.json())
                    .then(respJson => {
                        const response = respJson.results;
                        setStore({ people: response });
                    });
            },
            loadPlanetsData: () => {
                fetch('https://www.swapi.tech/api/planets/')
                    .then(resp => resp.json())
                    .then(respJson => {
                        const response = respJson.results;
                        setStore({ planets: response });
                    });
            },
            loadVehiclesData: () => {
                fetch('https://www.swapi.tech/api/vehicles/')
                    .then(resp => resp.json())
                    .then(respJson => {
                        const response = respJson.results;
                        setStore({ vehicles: response });
                    });
            },

            addFavorite: (item) => {
                const store = getStore();
                if (!store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type)) {
                    const updatedFavorites = [...store.favorites, item];
                    setStore({ favorites: updatedFavorites });
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                }
            },

            removeFavorite: (uid, type) => {
                const store = getStore();
                const updatedFavorites = store.favorites.filter(fav => !(fav.uid === uid && fav.type === type));
                setStore({ favorites: updatedFavorites });
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            },

			loadFavoritesFromStorage: () => {
                const storedFavorites = localStorage.getItem("favorites");
                if (storedFavorites) {
                    try {
                        const parsed = JSON.parse(storedFavorites);
                        setStore({ favorites: parsed });
                    } catch (err) {
                        console.error("Error al parsear favoritos desde localStorage:", err);
                    }
                }
            }
		}
	};
};

export default getState;
