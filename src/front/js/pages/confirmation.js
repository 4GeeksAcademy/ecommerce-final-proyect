import React from "react";

export const Confirmation = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="payment-confirmation">
              <div className="header text-center">
                <h1>¡Gracias por tu compra!</h1>
                <p>Tu pedido se ha completado con éxito.</p>
              </div>
  
              <div className="order-details">
                <h2>Detalles del pedido</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Número de pedido: #1234567890</li>
                  <li className="list-group-item">Fecha del pedido: 12 de mayo de 2024</li>
                  <li className="list-group-item">Método de pago: Visa XXXX-1234</li>
                  <li className="list-group-item">Importe total: €100,00</li>
                </ul>
              </div>
  
              <div className="next-steps">
                <h2>Próximos pasos</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Se ha enviado un recibo por correo electrónico a la dirección que proporcionaste. Guárdalo para tus registros.</li>
                  <li className="list-group-item">Puedes visitar tu página de cuenta en cualquier momento para verificar el estado de tu pedido.</li>
                  <li className="list-group-item">Si tienes alguna pregunta o inquietud, no dudes en contactarnos.</li>
                </ul>
              </div>
  
              <div className="actions text-center">
                <a href="/" className="btn btn-primary back-to-shop">Regresar a la tienda</a>
                <a href="/account" className="btn btn-success view-account">Ver cuenta</a>
                <a href="mailto:support@example.com" className="btn btn-warning contact-support">Contactar soporte</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };