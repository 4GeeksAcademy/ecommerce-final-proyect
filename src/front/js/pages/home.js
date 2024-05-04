import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<header className="bg-info py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">DESCUENTO EN TODA LA TIENDA</h1>
                    <p className="lead fw-normal text-white-50 mb-0">20% de descuento con el código "TEST20"</p>
                </div>
            </div>
        </header>
	);
};
