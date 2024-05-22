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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			getProducts: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/productos")
					const data = await resp.json()
					setStore({ productos: data })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading products from backend", error), 400
				}
			},

			getOneProduct: async () => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/productos/{:id}")
					const data = await resp.json()
					setStore({ producto: data })
				}catch(error){
					console.log("Error loading one product from backend", error), 400}
			},

			createUser: async (email,password) => {
				try {
					fetch(process.env.BACKEND_URL + "/register", {
						method: "POST", 
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							email,
							password
						})
					})
					.then((response => {response.json}))
					.then((data => console.log(data)))
					.catch(error => console.log(error))
				} catch (error) {
					console.log("Error creating user from backend", error), 400
				}

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
