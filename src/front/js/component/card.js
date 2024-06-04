import React, { useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link,useNavigate } from "react-router-dom";

export const Card = ({ nombre,precio, descripcion,uid,imagen }) => {
  const {store, actions} = useContext(Context)
  const navigate = useNavigate()
  console.log( nombre,precio, descripcion,uid,imagen );
  return (
    <div className="card mx-auto" style={{ width: "18rem" }}>
      <img
        src={imagen}
        className="card-img-top mx-0"
        onClick={()=>navigate(`/single/${uid}`)}
      />
      <div className="card-body">
        <h5 onClick={()=>navigate(`/single/${uid}`)} className="card-title">{nombre}</h5>
        <p className="card-text my-0">
        </p>
        <div className="d-flex justify-content-between">
        <div onClick={() => actions.addToCart(store.cart.id, uid)} className="btn btn-primary">
          Añadir a carrito
          <i className="bi-cart-fill me-1"></i>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Card;