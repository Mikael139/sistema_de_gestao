import React from 'react';

function TabelaFuncionarios({ vetor, selecionar }) {

  const formatarTelefone = (telefone) => {
    return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  const formatarData = (data) => {
    const novaData = new Date(data);
    return novaData.toLocaleDateString('pt-BR');
  };

  const formatarSalario = (salario) => {
    return salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatarEmail = (email) => {
    const partes = email.split('@');
    return (
      <>
        {partes[0]}<br />{/* Adiciona uma quebra de linha antes do @ */}
        @{partes[1]}
      </>
    );
  };

  return (
    <div className="table-container funcionarios">
      <table className="table">
        <thead>
          <tr className="table_informacao">
            <th>#</th>
            <th>Nome</th>
            <th>Data do nasc.</th>
            <th>Data do cad.</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Gênero</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {vetor.map((obj, indice) => (
            <tr key={indice} className="info-gastos funcionarios">
              <td>{indice + 1}</td>
              <td>{obj.nomeCompleto}</td>
              <td>{formatarData(obj.dt_nascimento)}</td>
              <td>{formatarData(obj.dt_cadastro)}</td>
              <td>{formatarEmail(obj.email)}</td> {/* Usa a função para formatar o e-mail */}
              <td>{formatarTelefone(obj.telefone)}</td>
              <td>{obj.endereco}</td>
              <td>{obj.cargo}</td>
              <td>{formatarSalario(obj.salario)}</td>
              <td>{obj.genero}</td>
              <td>
                <button onClick={() => selecionar(indice)} className="btn btn-success">Selecionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaFuncionarios;
