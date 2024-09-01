import React, { useState } from 'react';
import axios from 'axios';
import './../CSS/login.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando ícones

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.includes('@')) {
      alert('Por favor, insira um e-mail válido com "@".');
      return;
    }
    if (password.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (!/[a-zA-Z]/.test(password)) {
      alert('A senha deve conter pelo menos uma letra.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert('A senha deve conter pelo menos um caractere especial.');
      return;
    }
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/cadastrarUsuarios', {
        username: email,
        password: password,
      });
      alert(response.data.mensagem);
      navigate('/');
    } catch (error) {
      alert('Erro ao fazer cadastro');
    }
  };

  return (
    <div className="box_preta">
      <img src={require('./../img/GTX.png')} alt="Logo da GTX" className="login_logo" />
      <div className="box_branca">
        <h1 className="login_titulo">Crie sua Conta</h1>
        <h1 className="login_subtitulo">Faça seu Cadastro</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="E-Mail"
            className="login email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="login senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="password-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme a Senha"
              className="login senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </form>
        <a href="#" target="_blank" rel="noopener noreferrer" className="esqueceu">Esqueceu a senha?</a>
        <br />
        <a href="/" target="_blank" rel="noopener noreferrer" className="criar">
          Já possui uma conta? <strong id="criar">Faça Login</strong>
        </a>
      </div>
      <button className="btn_entrar" onClick={handleRegister}>Cadastrar</button>
    </div>
  );
};

export default Registro;
