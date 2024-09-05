// Login.js
import { useState, useEffect } from 'react';
import FormularioFuncionarios from './FormularioFuncionarios';
import TabelaFuncionarios from './TabelaFuncionarios';

function Funcionarios() {
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
        fetch("http://localhost:8080/listarfuncionarios")
          .then(retorno => retorno.json())
          .then(retorno_convertido => setControle(retorno_convertido));
      }, []);
    
      const aoDigitar = (e) => {
        const { name, value } = e.target;
      
        // Validate phone format
        if (name === 'telefone' && !/^(\(\d{2}\) \d{5}-\d{4})?$/.test(value)) {
          alert('Formato de telefone inválido. Use o formato (11) 99999-9999');
          return;
        }
      
        setObjControle({ ...objControle, [name]: value });
      }
    
      const cadastrarFuncionarios = () => {
        fetch('http://localhost:8080/cadastrarFuncionarios', {
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
            alert('Funcionário cadastrado com sucesso!');
            limparFomularioFuncionarios();
          }
        })
      }
    
      const alterarFuncionarios = () => {
        fetch('http://localhost:8080/alterarFuncionarios',{
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
            alert('Funcionário alterado com sucesso!');
            let vetorTemp = [...controle];
            let indice = vetorTemp.findIndex((p) =>{
              return p.codigo === objControle.codigo;
            });
            vetorTemp[indice] = objControle;
            setControle(vetorTemp);
            limparFomularioFuncionarios();
          }
        })
      }
    
      const removerFuncionario = () => {
        fetch('http://localhost:8080/removerFuncionarios/'+objControle.codigo,{
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
          limparFomularioFuncionarios();
        })
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
          <FormularioFuncionarios botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrarFuncionarios} obj={objControle} cancelar={limparFomularioFuncionarios} remover={removerFuncionario} alterar={alterarFuncionarios}/>
          <TabelaFuncionarios vetor={controle} selecionar={selecionarItemFuncionario}/>
        </div>
      );
    }

export default Funcionarios;

