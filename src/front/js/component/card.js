import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = ({ nombre,precio, descripcion,uid,type,imagen }) => {
  const {store, actions} = useContext(Context)
  console.log( nombre,precio, descripcion,uid,type,imagen );
  return (
    <div className="card mx-auto" style={{ width: "18rem" }}>
      <img
        src={imagen}
        className="card-img-top mx-0"
      />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text my-0">
        </p>
        <div className="d-flex justify-content-between">
        <Link to={`/single/${uid}`} className="btn btn-primary">
          Añadir a carrito
          <i className="bi-cart-fill me-1"></i>
        </Link>
        {/* <button
          className="btn btn-outline-warning"
          onClick={() => actions.addCart(name)}
        >
          <i className="fa fa-heart"></i>
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;