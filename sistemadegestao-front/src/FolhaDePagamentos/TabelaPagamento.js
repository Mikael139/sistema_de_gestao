
function TabelaClientes({vetor, selecionar}) {
    return(
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
                   vetor.map((obj, indice) => (
                    <tr key={indice} className="info">
                        <td>{indice+1}</td>
                        <td>{obj.nome}</td>
                        <td>{obj.dt_nascimento}</td>
                        <td>{obj.dt_cadastro}</td>
                        <td>{obj.obs}</td>
                        <td>{obj.endereco_cliente}</td>
                        <td>{obj.cliente_contato}</td>
                        <td>{obj.genero}</td>
                        <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                    </tr>
                   )) 
                }
                
            </tbody>
        </table>
    )
}

export default TabelaClientes;