import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
    const { store, actions } = useContext(Context);
    return (
        <header>
            <div className="container px-4 px-lg-5 my-5 bg-info py-5">
                <div className="text-center text-white">
                    <h1 className="display-4 fw-bolder">DESCUENTO EN TODA LA TIENDA</h1>
                    <p className="lead fw-normal text-white-25 mb-0">20% de descuento con el código "TEST20"</p>
                </div>
            </div>
            <div className="row flex-nowrap px-4 px-lg-5">
                {store.productos?.map(el => <div key={el.id} className="col-sm">< Card nombre={el.nombre} precio={el.precio} descripcion={el.descripcion} uid={el.id} imagen={el.imagen} /></div>)}
            </div>
        </header>
    );
};
