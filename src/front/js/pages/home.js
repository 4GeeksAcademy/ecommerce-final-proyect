import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
    const { store, actions } = useContext(Context);
    return (
        <div>
            <header className="container px-4 px-lg-5 my-5 bg-info py-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">DESCUENTO EN TODA LA TIENDA</h1>
                    <p className="lead fw-normal text-white-25 mb-0">20% de descuento con el código "TEST20"</p>
                </div>
            </header>
            <div className="container row mx-auto ">
                {store.productos?.map(el => <div key={el.id} className="col-sm-3 col-lg-3 py-1">< Card nombre={el.nombre} precio={el.precio} descripcion={el.descripcion} uid={el.id} imagen={el.imagen} /></div>)}
            </div>
        </div>
    );
};
