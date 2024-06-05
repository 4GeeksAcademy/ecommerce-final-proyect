import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const SingleArticle = () => {
  const params = useParams()
  const { store, actions } = useContext(Context)
  const [productoElegido, setProductoElegido] = useState(null)
  useEffect(() => {
    const producto = store.productos.find(producto => params.id == producto.id)
    setProductoElegido(producto)
  }, [params, store.productos]);
  console.log(productoElegido);
  ;
  if (!productoElegido) {
    return (
      <div>Loading</div>
    )
  }
  const handleClick = () => {
    actions.addToCart(params.id)
  }
  return (
    <div className="py-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <img style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }} className="rounded-4 fit" src={productoElegido.imagen} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
                {productoElegido.nombre}
              </h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="ms-1">
                    4.5
                  </span>
                </div>
                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>154 pedidos</span>
                <span className="text-success ms-2">En stock</span>
              </div>

              <div className="mb-3">
                <span className="h5">{productoElegido.precio}€</span>
                <span className="text-muted">/cada uno</span>
              </div>

              <p>
                {productoElegido.descripcion}
              </p>

              <div className="row mb-4">
                <div className="col-md-4 col-6">
                  <label className="mb-2">Tamaño</label>
                  <select className="form-select border border-secondary" style={{ height: "35px" }}>
                    <option>Pequeño</option>
                    <option>Mediano</option>
                    <option>Grande</option>
                  </select>
                </div>

                <div className="col-md-4 col-6 mb-3">
                  <label className="mb-2 d-block">Cantidad</label>
                  <div className="input-group mb-3" style={{ width: "170px" }}>
                    <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                      <i className="fas fa-minus"></i>
                    </button>
                    <input type="text" className="form-control text-center border border-secondary" placeholder="1" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div onClick={handleClick} className="btn btn-primary shadow-0"> <i className="me-1 fa fa-shopping-basket"></i> Añadir al carrito </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 