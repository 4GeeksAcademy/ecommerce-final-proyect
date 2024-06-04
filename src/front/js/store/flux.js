const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			session: null,
			cart: [],
			productos: [],
			
		},
		actions: {
			// Use getActions to call a function within a fuction

			loginUser: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email,
							password,
						})
					})
					const session = await response.json()
					const store = getStore()
					setStore({
						...store, session
					})
					setStore({ cart: session.cesta_lista[0] })
					// Ejecutar la funcion de traerse el carrito getActions().getCarrito()
					console.log(session)
					return session
				} catch (error) {
					console.log("Error login user", error);
					return null;
				}

			},

			setSessionNull: () => {
				const store = getStore()
				setStore({ ...store, session: null })
			},

			getProducts: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/productos")
					const data = await resp.json()
					const store = getStore()
					setStore({ ...store, productos: data })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading products from backend", error), 400
				}
			},

			getOneProduct: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/productos/{:id}")
					const data = await resp.json()
					setStore({ producto: data })
				} catch (error) {
					console.log("Error loading one product from backend", error), 400
				}
			},

			createUser: async (email, password, nombre) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email,
							password,
							nombre
						})
					})
					const session = await response.json()
					const store = getStore()
					setStore({
						...store, session
					})
					return session
				} catch (error) {
					console.log("Error creating user from backend", error);
					return null;
				}

			},

			addToCart: async (id, articulo_id) => {
				const response = await fetch(process.env.BACKEND_URL + '/articulos_cesta', {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"cesta_id": id,
						"articulo_id": articulo_id
					})
				})
				if (response) { console.log("articulo añadido") }
				const resp = resp => console.log(resp);
				const error = error => console.log(error);
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
