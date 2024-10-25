import React from 'react';
function TabelaClientes({ vetor, selecionar }) {

    const formatarData = (data) => {    
        const [ano, mes, dia] = data.split('-'); // Divide a data "YYYY-MM-DD" em partes
    
        return `${dia}/${mes}/${ano}`; // Retorna a data no formato "DD/MM/YYYY"
    };

    const formatarTelefone = (telefone) => {
        // Remove qualquer caractere que não seja número
        const telefoneLimpo = telefone.replace(/\D/g, '');
        // Aplica a máscara (xx) xxxxx-xxxx
        return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

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
                                    <td>{formatarTelefone(obj.cliente_contato)}</td>
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
