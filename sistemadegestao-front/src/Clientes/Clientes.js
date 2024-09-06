import { useState, useEffect } from 'react';
import FormularioClientes from './FormularioClientes';
import TabelaClientes from './TabelaClientes';
import Swal from 'sweetalert2'
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
})

function Clientes() {
    const controles = {
        codigo: 0,
        nome:"",
        data_nascimento: "",
        data_cadastro:"",
        obs:"",
        endereco: "",
        telefone: "",
        genero: ""
      }
    
      const [btnCadastrar, setBtnCadastrar] = useState(true);
      const [controle, setControle] = useState([]);
      const [objControle, setObjControle] = useState(controles);
    
      useEffect(() => {
        fetch("http://localhost:8080/listarclientes")
          .then(retorno => retorno.json())
          .then(retorno_convertido => setControle(retorno_convertido));
      }, []);
    
      const aoDigitar = (e) => {
        const { name, value } = e.target;
      
        if (name === 'telefone' && !/^(\(\d{2}\) \d{5}-\d{4})?$/.test(value)) {
          alert('Formato de telefone inválido. Use o formato (11) 99999-9999');
          return;
        }
      
        setObjControle({ ...objControle, [name]: value });
      }
    
      const cadastrarClientes = () => {
        fetch('http://localhost:8080/cadastrarClientes', {
          method:'post',
          body:JSON.stringify(objControle),
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          if(retorno_convertido.mensagem !== undefined) {
            alert(retorno_convertido.mensagem)
          } else {
            setControle([...controle, retorno_convertido]);
            alert('Cliente cadastrado com sucesso!');
            limparFomularioCliente();
          }
        })
      }
    
      const alterarClientes = () => {
        fetch('http://localhost:8080/alterarClientes',{
          method:'put',
          body:JSON.stringify(objControle),
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          if(retorno_convertido.mensagem !== undefined){
            alert(retorno_convertido.mensagem);
          }else{
            alert('Cliente alterado com sucesso!');
            let vetorTemp = [...controle];
            let indice = vetorTemp.findIndex((p) =>{
              return p.codigo === objControle.codigo;
            });
            vetorTemp[indice] = objControle;
            setControle(vetorTemp);
            limparFomularioCliente();
          }
        })
      }
    
      const removerCliente = () => {
        fetch('http://localhost:8080/removerClientes/'+objControle.codigo,{
          method:'delete',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
          }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
          alert(retorno_convertido.mensagem);
          let vetorTemp = [...controle];
          let indice = vetorTemp.findIndex((p) =>{
            return p.codigo === objControle.codigo;
          });
          vetorTemp.splice(indice, 1);
          setControle(vetorTemp);
          limparFomularioCliente();
        })
      }
    
      const limparFomularioCliente = () => {
        setObjControle(controles);
        setBtnCadastrar(true);
      }
    
      const selecionarItemCliente = (indice) => {
        setObjControle(controle[indice]);
        setBtnCadastrar(false);
      }
    
      const baixarExcel = () => {
        fetch('http://localhost:8080/exportarExcelClientes', {
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
          a.download = 'clientes.xlsx';
          document.body.appendChild(a);
          a.click();
          a.remove();
          // Caminho para a tela de graficos (Python)
          window.location.href = "https://innovateitdata.streamlit.app";
        });
      }

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
