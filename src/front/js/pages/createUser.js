import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const CreateAccount = () => {
  const {store,actions}=useContext(Context)
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({ acceptTerms: false });
console.log(email);
  const handleSubmit = async (event) => {
    event.preventDefault();

    // ESTO COMPRUEBA QUE EL EMAIL Y LA CONTRASEÑA NO ESTÁ VACIA

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    if (!acceptTerms) {
      alert('Debes aceptar los términos de servicio');
      return;
    }
    const result = await actions.createUser(email,password,nombre)
    console.log(result)
    if (!!result){
      navigate("/")
    }
    // CONSOLE LOG PARA VER SI TRAE LOS DATOS. ELIMINAR ANTES DE FINAL PORQUE SE VE LA CONTRASEÑA. Esto debe cambiar por un fetch con método POST
    console.log(`Creating account with email: ${email}, password: ${password}, nombre: ${nombre}`);
  };

  return (
    <section className="vh-100" style={{backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="text" className="form-control" name='nombre' onChange={(event) => setNombre(event.target.value)} />
                      <label className="form-label" >Tu nombre</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className="form-control"
                      name='email' onChange={(event) => setEmail(event.target.value)} />
                      <label className="form-label" htmlFor="form3Example3c">Tu email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className="form-control" 
                      name='password' onChange={(event) => setPassword(event.target.value)}/>
                      <label className="form-label" htmlFor="form3Example4c">Contraseña</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd">Repita contraseña</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2"
                          type="checkbox"
                          id="form2Example3c"
                          checked={acceptTerms}
                          onChange={(event) => {
                            setAcceptTerms(event.target.checked);
                            setErrors({ ...errors, acceptTerms: !event.target.checked });
                          }} />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Acepto los términos de servicio
                    </label>
                  </div>
                  
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default CreateAccount;
