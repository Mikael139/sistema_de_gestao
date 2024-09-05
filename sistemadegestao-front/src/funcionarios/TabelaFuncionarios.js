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

  return (
      <table className="table">
          <thead>
              <tr className="table-informacao-funcionarios">
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Data do nascimento</th>
                  <th scope="col">Data do cadastro</th>
                  <th scope="col">Email</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Cargo</th>
                  <th scope="col">Salário</th>
                  <th scope="col">Gênero</th>
                  <th scope="col">Selecionar</th>
              </tr>
          </thead>

          <tbody>
              {vetor.map((obj, indice) => (
                  <tr key={indice} className="info-funcionarios">
                      <td>{indice + 1}</td>
                      <td>{obj.nomeCompleto}</td>
                      <td>{formatarData(obj.dt_nascimento)}</td>
                      <td>{formatarData(obj.dt_cadastro)}</td>
                      <td>{obj.email}</td>
                      <td>{formatarTelefone(obj.telefone)}</td>
                      <td>{obj.endereco}</td>
                      <td>{obj.cargo}</td>
                      <td>{formatarSalario(obj.salario)}</td>
                      <td>{obj.genero}</td>
                      <td>
                          <button onClick={() => selecionar(indice)} className="btn btn-success">
                              Selecionar
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
}

export default TabelaFuncionarios;
