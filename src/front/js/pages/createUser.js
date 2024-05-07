import React, { useState } from 'react';

export const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // ESTO HACE QUE EL EMAIL Y LA CONTRASEÑA NO ES LA MISMA

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // CONSOLE LOG PARA VER SI TRAE LOS DATOS. ELIMINAR ANTES DE FINAL PORQUE SE VE LA CONTRASEÑA.
    console.log(`Creating account with email: ${email}, password: ${password}`);
  };

  return (
    <div className="create-account-container">
      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="create-account-button">
          Create Account
        </button>
      </form>

      <p className="login-link">
        Already have an account? <a href="#">Log in here</a>
      </p>
    </div>
  );
};

export default CreateAccount;
