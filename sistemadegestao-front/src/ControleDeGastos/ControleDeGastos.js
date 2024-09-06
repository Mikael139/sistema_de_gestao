import { useState, useEffect } from 'react';
import FormularioDeGastos from './FormularioDeGastos';
import TabelaDeGastos from './TabelaDeGastos';
import Swal from 'sweetalert2';

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

  useEffect(() => {
    fetch("http://localhost:8080/listarcontroledegastos")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setControle(retorno_convertido));
  }, []);

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
        setControle([...controle, retorno_convertido]);
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

  return (
    <div>
      <FormularioDeGastos
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrarGastos}
        obj={objControle}
        cancelar={limparFomularioControleDeGastos}
        remover={removerGastos}
        alterar={alterar}
      />
      <TabelaDeGastos vetor={controle} selecionar={selecionarItemControleDeGastos} />
    </div>
  );
}

export default ControleDeGastos;
