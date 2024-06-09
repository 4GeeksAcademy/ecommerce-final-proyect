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
			token: null,

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
					getActions().setSession(session)					
					// Ejecutar la funcion de traerse el carrito getActions().getCarrito()
					console.log(getStore())
					await getActions().getCart()
					return session
				} catch (error) {
					console.log("Error login user", error);
					return null;
				}

			},
			setSession: (session)=>{
				const store = getStore()
				setStore({
					...store, session,
					token: session.access_token,
					user: session.user,
					cart: session.user.cesta_lista.at(-1).cesta_articulo
				})
			},

			setSessionNull: () => {
				const store = getStore()
				localStorage.clear()
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

			addToCart: async (articulo_id) => {
				let id = getStore().user.cesta_lista[0].id
				console.log(getStore());
				const response = await fetch(process.env.BACKEND_URL + '/articulos_cesta',
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": `Bearer ${getStore().token}`
						},
						body: JSON.stringify({
							"cesta_id": id,
							"articulo_id": articulo_id
						})
					})
				if (response) { console.log("articulo añadido") }
				getActions().getCart()
				const resp = resp => console.log(resp);
				const error = error => console.log(error);
			},

			deleteFromCart: async (articulo_id) => {
				// let id = getStore().session.cesta_lista[0].id
				const response = await fetch(process.env.BACKEND_URL + '/articulos_cesta/' + id + "/" + articulo_id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${getStore().token}`
					},

				})
				if (response) { console.log("articulo eliminado") }
				getActions().getCart()
				const resp = resp => console.log(resp);
				const error = error => console.log(error);
			},

			getCart: async () => {
				let id = getStore().user.cesta_lista[0].id
				fetch(process.env.BACKEND_URL + `/articulos_cesta/${id}`, {
					method: "GET",
					headers:{
						"Content-Type": "application/json",
						"Authorization": `Bearer ${getStore().token}`
					}
				})

					.then(response => response.json())
					// .then (response => console.log("CESTA", response))
					.then(response => setStore({ cart: response.articulos }))

			},
		}
	};
};

export default getState;
