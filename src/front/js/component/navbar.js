import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="./"><i className="fa-solid fa-shop"></i></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="./">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./aboutUs" >Sobre nosotros</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-outline-dark me-2" type="submit">
                            <i className="fas fa-shopping-cart me-1"></i>
                            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>

                        <button type="button" className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Login
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header mb-5">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Login now!</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" className="form-control"
                                                        name='email'  />
                                                    <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" className="form-control"
                                                        name='password'  />
                                                    <label className="form-label" htmlFor="form3Example4c">Password</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/createUser" type="button" className="btn btn-primary">Sign-up</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
