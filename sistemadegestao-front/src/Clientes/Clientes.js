import { useState, useEffect } from 'react';
import FormularioClientes from './FormularioClientes';
import TabelaClientes from './TabelaClientes';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

// Função para formatar a data
const formatarData = (data) => {
  if (!data || typeof data !== 'string' || !data.includes('-')) {
      return '--/--/----'; // Exibe uma data padrão em caso de erro
  }

  const partesData = data.split('-'); // Divide a string "YYYY-MM-DD" em um array
  if (partesData.length !== 3) {
      return '--/--/----'; // Retorna a data padrão caso o array esteja incompleto
  }

  const [ano, mes, dia] = partesData; // Desestrutura as partes

  // Retorna a data no formato "DD/MM/YYYY"
  return `${dia}/${mes}/${ano}`;
};


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

function Clientes() {
  const controles = {
    codigo: 0,
    nome: "",
    dt_nascimento: "",
    dt_cadastro: "",
    obs: "",
    endereco_cliente: "",
    cliente_contato: "",
    genero: ""
  };

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [controle, setControle] = useState([]);
  const [objControle, setObjControle] = useState(controles);

  // Função para baixar o Excel
  const baixarExcel = () => {
    fetch('http://localhost:8080/exportarExcelClientes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao baixar o arquivo');
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'clientes.xlsx'; // Nome do arquivo
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(error => {
      console.error(error);
      Toast.fire({
        icon: 'error',
        title: 'Erro ao baixar o Excel',
      });
    });
  };

  // useEffect para buscar os dados e formatar as datas
  useEffect(() => {
    fetch("http://localhost:8080/listarclientes")
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        // Aplica a formatação de data antes de atualizar o estado
        const clientesFormatados = retorno_convertido.map(cliente => ({
          ...cliente,
          dt_nascimento: formatarData(cliente.dt_nascimento),
          dt_cadastro: formatarData(cliente.dt_cadastro)
        }));
        setControle(clientesFormatados);
      });
  }, []);

  // Resto das funções permanece igual
  const aoDigitar = (e) => {
    const { name, value } = e.target;

    setObjControle({ ...objControle, [name]: value });

    if (name === 'telefone' && !/^(\(\d{2}\) \d{5}-\d{4})?$/.test(value)) {
      Toast.fire({
        icon: 'error',
        title: 'Formato de telefone inválido',
        text: 'Use o formato (11) 99999-9999',
      });
      return;
    }

    setObjControle({ ...objControle, [name]: value });
  };

  const cadastrarClientes = () => {
    const clienteData = {
      ...objControle,
      dt_nascimento: objControle.dt_nascimento, // Certifique-se de que a data já está no formato correto
    };

    fetch('http://localhost:8080/cadastrarClientes', {
      method: 'POST',
      body: JSON.stringify(clienteData),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      if (retorno_convertido.mensagem !== undefined) {
        Toast.fire({
          icon: 'info',
          title: 'Aviso',
          text: retorno_convertido.mensagem,
        });
      } else {
        setControle([...controle, retorno_convertido]);
        Toast.fire({
          icon: 'success',
          title: 'Cliente cadastrado com sucesso!'
        });
        limparFomularioCliente();
      }
    });
  };

  const alterarClientes = () => {
    fetch('http://localhost:8080/alterarClientes', {
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
          icon: 'info',
          title: 'Aviso',
          text: retorno_convertido.mensagem,
        });
      } else {
        Toast.fire({
          icon: 'info',
          title: 'Cliente alterado com sucesso!'
        });
        let vetorTemp = [...controle];
        let indice = vetorTemp.findIndex((p) => p.codigo === objControle.codigo);
        vetorTemp[indice] = objControle;
        setControle(vetorTemp);
        limparFomularioCliente();
      }
    });
  };

  const removerCliente = () => {
    fetch('http://localhost:8080/removerClientes/' + objControle.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      Toast.fire({
        icon: 'info',
        title: 'Aviso',
        text: retorno_convertido.mensagem,
      });
      let vetorTemp = [...controle];
      let indice = vetorTemp.findIndex((p) => p.codigo === objControle.codigo);
      vetorTemp.splice(indice, 1);
      setControle(vetorTemp);
      limparFomularioCliente();
    });
  };

  const limparFomularioCliente = () => {
    setObjControle(controles);
    setBtnCadastrar(true);
  };

  const selecionarItemCliente = (indice) => {
    setObjControle(controle[indice]);
    setBtnCadastrar(false);
  };

  return (
    <div style={styles.container}>
      <FormularioClientes botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrarClientes} obj={objControle} cancelar={limparFomularioCliente} remover={removerCliente} alterar={alterarClientes}/>
      <TabelaClientes vetor={controle} selecionar={selecionarItemCliente}/>
      <button style={styles.downloadButton} onClick={baixarExcel}>
        <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '10px' }} />
        Download Excel
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    padding: '20px'
  },
  downloadButton: {
    backgroundColor: '#87adbd',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '18px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '#00000',
    marginTop: '20px',
    fontWeight: 'bold'
  }
};

export default Clientes;
