import { useState, useEffect } from 'react';
import FormularioFuncionarios from './FormularioFuncionarios';
import TabelaFuncionarios from './TabelaFuncionarios';
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
});

function Funcionarios() {
  const controles = {
    codigo: 0,
    nomeCompleto: "",
    dt_nascimento: "",
    dt_cadastro: "",
    genero: "",
    telefone: "",
    email: "",
    endereco: "",
    cargo: "",
    salario: ""
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [controle, setControle] = useState([]);
  const [objControle, setObjControle] = useState(controles);

  useEffect(() => {
    fetch("http://localhost:8080/listarfuncionario")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setControle(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    const { name, value } = e.target;
    setObjControle({ ...objControle, [name]: value });
  }

  const cadastrarFuncionarios = () => {
    fetch('http://localhost:8080/cadastrarFuncionario', {
      method: 'post',
      body: JSON.stringify(objControle),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          Toast.fire({
            icon: 'error',
            title: retorno_convertido.mensagem
          });
        } else {
          setControle([...controle, retorno_convertido]);
          Toast.fire({
            icon: 'success',
            title: 'Funcionário cadastrado com sucesso!'
          });
          limparFomularioFuncionarios();
        }
      });
  }

  const alterarFuncionarios = () => {
    fetch('http://localhost:8080/alterarFuncionario', {
      method: 'put',
      body: JSON.stringify(objControle),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          Toast.fire({
            icon: 'error',
            title: retorno_convertido.mensagem
          });
        } else {
          Toast.fire({
            icon: 'success',
            title: 'Funcionário alterado com sucesso!'
          });
          let vetorTemp = [...controle];
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objControle.codigo;
          });
          vetorTemp[indice] = objControle;
          setControle(vetorTemp);
          limparFomularioFuncionarios();
        }
      });
  }

  const removerFuncionario = () => {
    fetch('http://localhost:8080/removerFuncionario/' + objControle.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        Toast.fire({
          icon: 'success',
          title: retorno_convertido.mensagem
        });
        let vetorTemp = [...controle];
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objControle.codigo;
        });
        vetorTemp.splice(indice, 1);
        setControle(vetorTemp);
        limparFomularioFuncionarios();
      });
  }

  const limparFomularioFuncionarios = () => {
    setObjControle(controles);
    setBtnCadastrar(true);
  }

  const selecionarItemFuncionario = (indice) => {
    setObjControle(controle[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <FormularioFuncionarios 
        botao={btnCadastrar} 
        eventoTeclado={aoDigitar} 
        cadastrar={cadastrarFuncionarios} 
        obj={objControle} 
        cancelar={limparFomularioFuncionarios} 
        remover={removerFuncionario} 
        alterar={alterarFuncionarios} 
      />
      <TabelaFuncionarios vetor={controle} selecionar={selecionarItemFuncionario} />
    </div>
  );
}

export default Funcionarios;
