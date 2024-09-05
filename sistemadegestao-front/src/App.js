import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import ControleDeGastos from './ControleDeGastos/ControleDeGastos';
import Clientes from './Clientes/Clientes';
import ControleDePonto from './ControleDePonto/ControleDePonto';
import Pagamento from './FolhaDePagamentos/FolhaDePagamentos';
import Fornecedores from './fornecedores/Fornecedores';
import LoginPage from './../src/Login/Login';
import Funcionarios from './funcionarios/funcionarios';
import RegisterPage from './../src/Registro/Registro';
import './CSS/App.css';
import './CSS/clientes.css';
import './CSS/gastos.css';
import './CSS/pagamento.css';
import './CSS/Funcionarios.css';
import './CSS/Fornecedores.css';
import './CSS/controleDePonto.css'
import LogoGTX from "./img/GTX.png";
import { useState } from 'react';
import Footer from './../src/Rodape/Rodape';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const handleLoginSuccess = () => {
    console.log('Login bem-sucedido!');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log('Usuário desconectado');
  };
  



  return (
    <Router>
      <div>
        {isAuthenticated ? (
          <>
            <nav className="navbar">
              <div className="container">
                <img src={LogoGTX} alt="Logo da GTX" className="navbar-brand" style={{ width: '120px', height: 'auto' }} />
                <nav className="navbar-nav">
                  <NavLink
                    to="/clientes"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    Clientes
                  </NavLink>
                  <NavLink
                    to="/controle-de-gastos"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    Controle de gastos
                  </NavLink>
                  <NavLink
                    to="/FolhaDePagamentos"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    Folha de pagamento
                  </NavLink>
                  <NavLink
                    to="/Funcionarios"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    Lista de Funcionarios
                  </NavLink>
                  <NavLink
                    to="/Fornecedores"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    Lista de Fornecedores
                  </NavLink>
                  <NavLink
                    to="/ponto"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                    style={{ marginLeft: '65px' }}
                  >
                    Ponto
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={{ marginLeft: '65px' }}
                    id='botaoSair'
                  >
                    Desconectar
                  </button>

                </nav>
              </div>
            </nav>
            <div className="conteudo">
              <Routes>
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/controle-de-gastos" element={<ControleDeGastos />} />
                <Route path="/FolhaDePagamentos" element={<Pagamento />} />
                <Route path="/Funcionarios" element={<Funcionarios />} />
                <Route path="/Fornecedores" element={<Fornecedores />} />
                <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/ponto" element={<ControleDePonto />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/clientes" />} />
              </Routes>
            </div>
          <Footer /> {/* Adicione o rodapé aqui */}
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redireciona para a página de login */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

