import React, { Component } from "react";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
	<section  style={{color: "#000", backgroundColor: "f3f2f2"}}>
  <div className="container py-5">
    <div className="row d-flex justify-content-center">
      <div className="col-md-10 col-xl-8 text-center">
        <h3 className="fw-bold mb-4">Lo que dicen nuestros clientes:</h3>
    	</div>
    </div>

    <div className="row text-center">
      <div className="col-md-4 mb-4 mb-md-0">
        <div className="card">
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                className="rounded-circle shadow-1-strong" width="100" height="100" />
            </div>
            <h5 className="font-weight-bold">Teresa May</h5>
            <h6 className="font-weight-bold my-3">Compró hace 3 días</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star-half-alt fa-sm text-info"></i>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>El proceso de compra fue sencillo y rápido!
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4 mb-md-0">
        <div className="card">
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                className="rounded-circle shadow-1-strong" width="100" height="100" />
            </div>
            <h5 className="font-weight-bold">Maggie McLoan</h5>
            <h6 className="font-weight-bold my-3">Compró hace 1 día</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>Necesitaba un producto y en menos tiempo del planeado, ya lo tenía en casa!
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-0">
        <div className="card">
          <div className="card-body py-4 mt-2">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                className="rounded-circle shadow-1-strong" width="100" height="100" />
            </div>
            <h5 className="font-weight-bold">Alexa Horwitz</h5>
            <h6 className="font-weight-bold my-3">Compró hace 6 horas</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-info"></i>
              </li>
              <li>
                <i className="far fa-star fa-sm text-info"></i>
              </li>
            </ul>
            <p className="mb-2">
              <i className="fas fa-quote-left pe-2"></i>Tuve un problema con el pago, pero todo se solucionó bien
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
	</footer>
);
