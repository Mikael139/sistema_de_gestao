
function TabelaClientes({vetor, selecionar}) {
    return(
        <table className="table">
            <thead>
                <tr class="container-fluid" className="table-informacao-clientes">
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Data do nascimento</th>
                    <th scope="col">Data do cadastro</th>
                    <th scope="col">Observação</th>
                    <th scope="col">Endereço</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Gênero</th>
                    <th scope="col">Selecionar</th>
                </tr>
            </thead>
        
            <tbody>
                {
                   vetor.map((obj, indice) => (
                    <tr key={indice} className="info-clientes">
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