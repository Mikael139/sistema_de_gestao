function TabelaClientes({ vetor, selecionar }) {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr className="table-informacao-clientes">
                        <th>#</th>
                        <th>Nome</th>
                        <th>Data do nascimento</th>
                        <th>Data do cadastro</th>
                        <th>Observação</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Gênero</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vetor.length > 0 ? (
                            vetor.map((obj, indice) => (
                                <tr key={indice} className="info-clientes">
                                    <td>{indice + 1}</td>
                                    <td>{obj.nome}</td>
                                    <td>{obj.dt_nascimento}</td>
                                    <td>{obj.dt_cadastro}</td>
                                    <td>{obj.obs}</td>
                                    <td>{obj.endereco_cliente}</td>
                                    <td>{obj.cliente_contato}</td>
                                    <td>{obj.genero}</td>
                                    <td>
                                        <button onClick={() => { selecionar(indice) }} className="btn btn-success">
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={{ textAlign: 'center', padding: '2vh' }}>
                                    Nenhum dado disponível
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TabelaClientes;
