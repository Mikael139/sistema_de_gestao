function TabelaClientes({ vetor, selecionar }) {
    return (
        <div className="table-container">
            <table className="table pagamentos">
                <thead>
                    <tr className="table-informacao-pagamentos">
                        <th>#</th>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>CPF</th>
                        <th>Data do pagamento</th>
                        <th>Valor pago</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vetor.length > 0 ? (
                            vetor.map((obj, indice) => (
                                <tr key={indice} className="info">
                                    <td>{indice + 1}</td>
                                    <td>{obj.nome}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.cpf}</td>
                                    <td>{obj.data_pagamento}</td>
                                    <td>R$ {obj.valor_pago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <button onClick={() => { selecionar(indice) }} className="btn btn-success">
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '2vh' }}>
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
