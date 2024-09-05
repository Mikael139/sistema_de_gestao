import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import './../CSS/login.css';
import './../CSS/App.css';
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

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Novo estado
  const navigate = useNavigate();

  useEffect(() => {
    // Adiciona a classe ao body
    document.body.classList.add('body-login');

    // Remove a classe do body quando o componente for desmontado
    return () => {
      document.body.classList.remove('body-login');
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username: email,
        password: password,
      });
      await Toast.fire({

        icon: 'success',
        title: 'Login realizado com sucesso',
      });
      onLoginSuccess();
      navigate('/controle-de-gastos');
    } catch (error) {
      await Toast.fire({

        icon: 'error',
        title: 'Erro ao fazer o login',
      })
    }
  };

  return (
    <div className ="login_background">
      <div className="box_preta">
        <img src={require('./../img/GTX.png')} alt="Logo da GTX" className="login_logo" />
        <div className="box_branca">
          <h1 className="login_titulo">Que bom te ver por aqui!</h1>
          <h1 className="login_subtitulo">Faça seu Login</h1>
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
              <span style={{ margin: '2px' }}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </form>
          <a href="#" target="_blank" rel="noopener noreferrer" className="esqueceu">Esqueceu a senha?</a>
          <br />
          <NavLink to="/cadastro" className="criar">
            Não possui uma conta? <strong id="criar">Crie uma agora</strong>
          </NavLink>
        </div>
        <button className="btn_entrar" onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
};

export default LoginPage;
