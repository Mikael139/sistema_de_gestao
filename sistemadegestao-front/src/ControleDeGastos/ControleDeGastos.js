import { useState, useEffect } from 'react';
import FormularioDeGastos from './FormularioDeGastos';
import TabelaDeGastos from './TabelaDeGastos';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

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

function ControleDeGastos() {
  const controles = {
    codigo: 0,
    dataGasto: "",
    descricao: "",
    valorGasto: ""
  };

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [controle, setControle] = useState([]);
  const [objControle, setObjControle] = useState(controles);
  const [totalGastos, setTotalGastos] = useState(0); 

  useEffect(() => {
    fetch("http://localhost:8080/listarcontroledegastos")
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        setControle(retorno_convertido);
        calcularTotalGastos(retorno_convertido);
      });
  }, []);

  const calcularTotalGastos = (gastos) => {
    const total = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.valorGasto || 0), 0);
    setTotalGastos(total);
  };

  const aoDigitar = (e) => {
    setObjControle({ ...objControle, [e.target.name]: e.target.value });
  };

  const cadastrarGastos = async () => {
    try {
      const resposta = await fetch('http://localhost:8080/cadastrarGastos', {
        method: 'POST',
        body: JSON.stringify(objControle),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const retorno_convertido = await resposta.json();

      if (retorno_convertido.mensagem !== undefined) {
        await Toast.fire({
          icon: 'error',
          title: retorno_convertido.mensagem,
        });
      } else {
        const novosGastos = [...controle, retorno_convertido];
        setControle(novosGastos);
        calcularTotalGastos(novosGastos); // Atualizar o total após cadastrar um novo gasto
        await Toast.fire({
          icon: 'success',
          title: 'Gasto cadastrado com sucesso!',
        });
        limparFomularioControleDeGastos();
      }
    } catch (error) {
      await Toast.fire({
        icon: 'error',
        title: 'Erro ao cadastrar gasto',
      });
    }
  };

  const alterar = async () => {
    try {
      const resposta = await fetch('http://localhost:8080/alterar', {
        method: 'PUT',
        body: JSON.stringify(objControle),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const retorno_convertido = await resposta.json();

      if (retorno_convertido.mensagem !== undefined) {
        await Toast.fire({
          icon: 'error',
          title: retorno_convertido.mensagem,
        });
      } else {
        await Toast.fire({
          icon: 'info',
          title: 'Gasto alterado com sucesso!',
        });
        let vetorTemp = [...controle];
        let indice = vetorTemp.findIndex((p) => p.codigo === objControle.codigo);
        vetorTemp[indice] = objControle;
        setControle(vetorTemp);
        calcularTotalGastos(vetorTemp); // Atualizar o total após alteração
        limparFomularioControleDeGastos();
      }
    } catch (error) {
      await Toast.fire({
        icon: 'error',
        title: 'Erro ao alterar gasto',
      });
    }
  };

  const removerGastos = async () => {
    try {
      const resposta = await fetch('http://localhost:8080/remover/' + objControle.codigo, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const retorno_convertido = await resposta.json();

      await Toast.fire({
        icon: 'error',
        title: retorno_convertido.mensagem,
      });

      let vetorTemp = [...controle];
      let indice = vetorTemp.findIndex((p) => p.codigo === objControle.codigo);
      vetorTemp.splice(indice, 1);
      setControle(vetorTemp);
      calcularTotalGastos(vetorTemp); // Atualizar o total após remover
      limparFomularioControleDeGastos();
    } catch (error) {
      await Toast.fire({
        icon: 'error',
        title: 'Erro ao remover gasto',
      });
    }
  };

  const limparFomularioControleDeGastos = () => {
    setObjControle(controles);
    setBtnCadastrar(true);
  };

  const selecionarItemControleDeGastos = (indice) => {
    setObjControle(controle[indice]);
    setBtnCadastrar(false);
  };

  const baixarExcel = () => {
    fetch('http://localhost:8080/exportarExcel', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'controle_gastos.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      
    });
  };

  return (
    <div style={styles.container}>
      <FormularioDeGastos botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrarGastos} obj={objControle} cancelar={limparFomularioControleDeGastos} remover={removerGastos} alterar={alterar}/>
      <TabelaDeGastos vetor={controle} selecionar={selecionarItemControleDeGastos}/>
      <h2 style={styles.fonte}>Total de Gastos: R${totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>

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
  },
  fonte: {
    color: 'white',
  }
};

export default ControleDeGastos;
