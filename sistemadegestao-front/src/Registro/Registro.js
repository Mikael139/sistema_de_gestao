import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../CSS/login.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
})

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Adiciona a classe ao body
    document.body.classList.add('body-login');

    // Remove a classe do body quando o componente for desmontado
    return () => {
      document.body.classList.remove('body-login');
    };
  }, []);

  const handleRegister = async () => {
    if (!email.includes('@')) {
      await Toast.fire({
        icon: 'error',
        title: 'Por favor, insira um e-mail válido com "@"',
      });
      return;
    }
    if (password.length < 8) {
      await Toast.fire({
        icon: 'error',
        title: 'A senha deve ter no mínimo 8 caracteres',
      });
      return;
    }
    if (!/[a-zA-Z]/.test(password)) {
      await Toast.fire({
        icon: 'error',
        title: 'A senha deve conter pelo menos uma letra',
      });
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      await Toast.fire({
        icon: 'error',
        title: 'A senha deve conter pelo menos um caractere especial',
      });
      return;
    }
    if (password !== confirmPassword) {
      await Toast.fire({
        icon: 'error',
        title: 'As senhas não coincidem',
      });
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
      await Toast.fire({
        icon: 'error',
        title: 'Erro ao fazer o cadastro',
      })
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
        <NavLink to="/" className="criar">
          Já possui uma conta? <strong id="criar">Faça Login</strong>
        </NavLink>
      </div>
      <button className="btn_entrar" onClick={handleRegister}>Cadastrar</button>
    </div>
  );
};

export default Registro;
