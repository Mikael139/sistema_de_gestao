import React, { useState } from 'react';
import axios from 'axios';
import CameraModal from './CameraModal';
import '../CSS/ponto.css';

function ControleDePonto({ onLoginSuccess }) {
  const [id, setId] = useState('');
  const [senha, setSenha] = useState('');
  const [showCamera, setShowCamera] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/registro/validar', null, {
        params: { id, senha }
      });
  
      console.log(response);
      if (response.status === 200) {
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess();
        } else {
          console.error('onLoginSuccess não é uma função');
        }
        setShowCamera(true);
      }
    } catch (error) {
      console.error(error);
      alert('ID ou senha incorretos');
    }
  };  

  return (
    <div className="login-container">
    <div className="login-box">
      <h1 className="title">Controle de Ponto</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="form-label">ID:
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="form-input"
            autoComplete="current-password"
          />
        </label>
        <label className="form-label">Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-button">Entrar</button>
      </form>
    </div>
    {showCamera && <CameraModal />}
  </div>
  );
}

export default ControleDePonto;
