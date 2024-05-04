import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const AboutUs = () => {
	const { store, actions } = useContext(Context);

	return (
    //     <div className="about-us-section">
    //     <div className="container">
    //         <div className="row">
    //             <div className="col-md-6">
    //                 <h2>Nuestra Historia</h2>
    //                 <p>Descripción de la historia de la empresa.</p>
    //             </div>
    //             <div className="col-md-6">
    //                 <h2>Nuestro Equipo</h2>
    //                 <p>Descripción del equipo y sus miembros.</p>
    //             </div>
    //         </div>
    //         <div className="row">
    //             <div className="col-md-6">
    //                 <h2>Nuestra Misión</h2>
    //                 <p>Descripción de la misión de la empresa.</p>
    //             </div>
    //             <div className="col-md-6">
    //                 <h2>Nuestros Valores</h2>
    //                 <p>Descripción de los valores de la empresa.</p>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className="about-us-section">
    <div className="container">
        <div className="about-us-content">
            <h2>Nuestra Historia</h2>
            <p>Descripción de la historia de la empresa.</p>
        </div>
        <div className="about-us-content">
            <h2>Nuestro Equipo</h2>
            <p>Descripción del equipo y sus miembros.</p>
        </div>
        <div className="about-us-content">
            <h2>Nuestra Misión</h2>
            <p>Descripción de la misión de la empresa.</p>
        </div>
        <div className="about-us-content">
            <h2>Nuestros Valores</h2>
            <p>Descripción de los valores de la empresa.</p>
        </div>
    </div>
</div>
	);
};
