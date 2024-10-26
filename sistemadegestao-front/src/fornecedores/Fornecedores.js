import { useState, useEffect } from 'react';
import FormularioFornecedores from './FormularioFornecedores';
import TabelaFornecedores from './TabelaFornecedores';
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

function Fornecedores() {
    const controles = {
        codigo: 0,
        tipoServico: "",
        dataCadastro: "",
        obs: "",
        fornecedorContato: "",
        nomeFornecedor: "",
        enderecoFornecedor: "",
        cnpjFornecedor: ""
    }

    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [controle, setControle] = useState([]);
    const [objControle, setObjControle] = useState(controles);

    useEffect(() => {
        fetch("http://localhost:8080/listarfornecedores")
            .then(retorno => retorno.json())
            .then(retorno_convertido => setControle(retorno_convertido));
    }, []);

    const aoDigitar = (e) => {
        setObjControle({ ...objControle, [e.target.name]: e.target.value });
    }

    const cadastrarFornecedores = () => {
        fetch('http://localhost:8080/cadastrarFornecedor', {
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
                        icon: 'info',
                        title: retorno_convertido.mensagem,
                    });
                } else {
                    setControle([...controle, retorno_convertido]);
                    Toast.fire({
                        icon: 'success',
                        title: 'Fornecedor cadastrado com sucesso!',
                    });
                    limparFomularioFornecedores();
                }
            });
    }

    const alterarFornecedores = () => {
        fetch('http://localhost:8080/alterarFornecedor', {
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
                        title: retorno_convertido.mensagem,
                    });
                } else {
                    Toast.fire({
                        icon: 'info',
                        title: 'Fornecedor alterado com sucesso!',
                    });
                    let vetorTemp = [...controle];
                    let indice = vetorTemp.findIndex((p) => {
                        return p.codigo === objControle.codigo;
                    });
                    vetorTemp[indice] = objControle;
                    setControle(vetorTemp);
                    limparFomularioFornecedores();
                }
            });
    }

    const removerFornecedor = () => {
        fetch('http://localhost:8080/removerFornecedor/' + objControle.codigo, {
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
                    title: retorno_convertido.mensagem,
                });
                let vetorTemp = [...controle];
                let indice = vetorTemp.findIndex((p) => {
                    return p.codigo === objControle.codigo;
                });
                vetorTemp.splice(indice, 1);
                setControle(vetorTemp);
                limparFomularioFornecedores();
            });
    }

    const limparFomularioFornecedores = () => {
        setObjControle(controles);
        setBtnCadastrar(true);
    }

    const selecionarItemFornecedor = (indice) => {
        setObjControle(controle[indice]);
        setBtnCadastrar(false);
    }

    return (
        <div>
            <FormularioFornecedores 
                botao={btnCadastrar} 
                eventoTeclado={aoDigitar} 
                cadastrar={cadastrarFornecedores} 
                obj={objControle} 
                cancelar={limparFomularioFornecedores} 
                remover={removerFornecedor} 
                alterar={alterarFornecedores} 
            />
            <TabelaFornecedores vetor={controle} selecionar={selecionarItemFornecedor} />
        </div>
    );
}

export default Fornecedores;
