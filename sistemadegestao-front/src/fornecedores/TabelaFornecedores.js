function TabelaFornecedores({vetor, selecionar}) {
    return(
        <table className="table fornecedores">
            <thead>
                <tr className="table-informacao-fornecedores">
                    <th>#</th>
                    <th>Fornecedor</th>
                    <th>E-Mail</th>
                    <th>Telefone</th>
                    <th>Item</th>
                    <th>Valor fornecido</th>
                </tr>
            </thead>
        
            <tbody>
                {
                   vetor.map((obj, indice) => (
                    <tr key={indice} className="info">
                        <td>{indice+1}</td>
                        <td>{obj.fornecedor}</td>
                        <td>{obj.email_fornecedor}</td>
                        <td>{obj.Telefone}</td>
                        <td>{obj.item}</td>
                        <td>{obj.valor}</td>
                        <td>{obj.fornecedor_contato}</td>
                        <td>{obj.genero}</td>
                        <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                    </tr>
                   )) 
                }
                
            </tbody>
        </table>
    )
}

export default TabelaFornecedores;

