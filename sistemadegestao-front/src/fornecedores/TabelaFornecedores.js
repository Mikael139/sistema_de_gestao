import React from 'react';
function TabelaFornecedores({ vetor, selecionar }) {

    const formatarCNPJ = (cnpj) => {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };

    const formatarCelular = (celular) => {
        return celular.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    };

    const formatarData = (data) => {
        const novaData = new Date(data);
        return novaData.toLocaleDateString('pt-BR');
    };

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr className="table_informacao">
                        <th>#</th>
                        <th>Nome Fornecedor</th>
                        <th>Contato</th>
                        <th>CNPJ</th>
                        <th>Endereço</th>
                        <th>Tipo de Serviço</th>
                        <th>Data de Cadastro</th>
                        <th>Observação</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        vetor.map((obj, indice) => (
                            <tr key={indice} className="info-gastos">
                                <td>{indice + 1}</td>
                                <td>{obj.nomeFornecedor}</td>
                                <td>{formatarCelular(obj.fornecedorContato)}</td>
                                <td>{formatarCNPJ(obj.cnpjFornecedor)}</td>
                                <td>{obj.enderecoFornecedor}</td>
                                <td>{obj.tipoServico}</td>
                                <td>{formatarData(obj.dataCadastro)}</td>
                                <td>{obj.obs}</td>
                                <td><button onClick={() => { selecionar(indice) }} className="btn btn-success">Selecionar</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TabelaFornecedores;
