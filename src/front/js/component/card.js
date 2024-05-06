import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Card = ({ name,uid,type }) => {
  const {store, actions} = useContext(Context)
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src="https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202211/08/00108346400420____6__640x640.jpg"
        className="card-img-top mx-0"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text my-0">
        </p>
        <div className="d-flex justify-content-between">
        <a href={`/views/${type}/${uid}`} className="btn btn-primary">
          Añadir a carrito
          <i className="bi-cart-fill me-1"></i>
        </a>
        <button
          className="btn btn-outline-warning"
          onClick={() => actions.addCart(name)}
        >
          <i className="fa fa-heart"></i>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Card;