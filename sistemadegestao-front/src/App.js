import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import ControleDeGastos from './ControleDeGastos/ControleDeGastos';
import Clientes from './Clientes/Clientes';
import Pagamento from './FolhaDePagamentos/FolhaDePagamentos';
import LoginPage from './../src/Login/Login';
import RegisterPage from './../src/Registro/Registro';
import './CSS/App.css';
import './CSS/clientes.css';
import './CSS/gastos.css';
import './CSS/pagamento.css';
import LogoGTX from "./img/GTX.png";
import { useState } from 'react';
import Footer from './../src/Rodape/Rodape';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
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
                    to="/orcamento"
                    className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
                  >
                    Orçamento
                  </NavLink>
                </nav>
              </div>
            </nav>
            <div className="conteudo">
              <Routes>
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/controle-de-gastos" element={<ControleDeGastos />} />
                <Route path="/FolhaDePagamentos" element={<Pagamento />} />
                <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
              </Routes>
            </div>
            <Footer /> {/* Adicione o rodapé aqui */}
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/cadastro" element={<RegisterPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
