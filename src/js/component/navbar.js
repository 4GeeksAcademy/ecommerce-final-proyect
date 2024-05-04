import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="#!">E-Commerce</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#!">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#!">Sobre nosotros</a>
                        </li>                        
                    </ul>
                    <form className="d-flex">
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi-cart-fill me-1"></i>    
                            "Carrito" 
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>                      
                        </button>
                    </form>
                </div>
            </div>
        </nav>);
};