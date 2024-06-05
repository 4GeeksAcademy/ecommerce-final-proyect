import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Cart = () => {
  const {store,actions} = useContext(Context)
  const [cart, setCart]= useState ([])
  // const [totalPayment, setTotalPayment]= useState(0)

  const total = ()=>{
  let sum = 0;
  store.cart.forEach(product=> sum += product.precio)
  return sum
}
const totalPayment = total()

  return (
<section className="h-100 gradient-custom">
  <div className="container py-5">
    <div className="row d-flex justify-content-center my-4">
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Cart - {store.cart?.length} items</h5>
          </div>
          <div className="card-body">

                {
                  store.cart?.length === 0 ? <h1>No hay artículos en el carrito</h1>:
                  store.cart?.map((product, i) => (

            <div key={i} className="row">
              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={product.imagen}
                    className="w-100" />
                  <a href="#!">
                    <div className="mask" style={{backgroundColor: "#ffffff"}}></div>
                  </a>
                </div>

              </div>

              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

                <p><strong>{product.nombre}</strong></p>
                <p>Color: blue</p>
                <p>Size: M</p>
                <button onClick={()=> actions.deleteFromCart(product.articulo_id)} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm me-1 mb-2" data-mdb-tooltip-init
                  title="Remove item">
                  <i className="fas fa-trash"></i>
                </button>
                

              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                {/* <div className="d-flex mb-4" style={{maxWidth: "300px"}}>
                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-3 me-2"
                    onClick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i className="fas fa-minus"></i>
                  </button>

                  <div data-mdb-input-init className="form-outline">
                    <input id="form1" min="0" name="quantity" value="1" type="number" className="form-control" />
                    <label className="form-label" htmlFor="form1">Quantity</label>
                  </div>

                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-3 ms-2"
                    onClick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i className="fas fa-plus"></i>
                  </button>
                </div> */}
     

    
                <p className="text-start text-md-center">
                  <strong>{product.precio}€</strong>
                </p>
 
              </div>
              <hr className="mt-1" />
            </div>
                  ))
                }
    
          </div>
        </div>
        <div className="card mb-4 mb-lg-0">
          <div className="card-body">
            <p><strong>We accept</strong></p>
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Summary</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Productos
                <span>{totalPayment} €</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Envío
                <span>Gratis</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total</strong>
                  <strong>
                    <p className="mb-0">(includido IVA)</p>
                  </strong>
                </div>
                <span><strong>{totalPayment} €</strong></span>
              </li>
            </ul>

            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">
              Go to pay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 );
};