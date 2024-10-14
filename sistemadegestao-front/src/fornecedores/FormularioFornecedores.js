function FormularioFornecedores({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu clientes fornecedores">
            <div className="form-row">
                <label htmlFor="nomeFornecedor" className="label nome">Fornecedor</label>
                <input type="text" value={obj.nomeFornecedor} onChange={eventoTeclado} name="nomeFornecedor" placeholder="Nome do fornecedor" className="form-control-first" 
                />
            </div>

            <div className="form-row">
                <div className="input-container">
                    <input type="date" value={obj.dataCadastro} onChange={eventoTeclado} name="dataCadastro" placeholder="Data do cadastro" className="form-control-sub data" />
                    <label htmlFor="dataCadastro" className="label">Data Cadastro</label>
                </div>
                <div className="input-container">
                    <input type="text" value={obj.cnpjFornecedor} onChange={eventoTeclado} name="cnpjFornecedor" placeholder="CNPJ do fornecedor" className="form-control-sub" 
                    />
                    <label htmlFor="cnpjFornecedor" className="label">CNPJ</label>
                </div>
            </div>

            <div className="form-row">
                <div className="input-container">
                    <input type="text" value={obj.enderecoFornecedor} onChange={eventoTeclado} name="enderecoFornecedor" placeholder="Endereço do fornecedor" className="form-control-sub" 
                    />
                    <label htmlFor="enderecoFornecedor" className="label">Endereço</label>
                </div>
                <div className="input-container">
                    <input type="text" value={obj.tipoServico} onChange={eventoTeclado} name="tipoServico" placeholder="Tipo de serviço" className="form-control-sub" 
                    />
                    <label htmlFor="tipoServico" className="label">Tipo de serviço</label>
                </div>
            </div>

            <div className="form-row">
                <div className="input-container">   
                    <input type="text" value={obj.obs} onChange={eventoTeclado} name="obs" placeholder="Observações" className="form-control-sub" 
                    />
                <label htmlFor="obs" className="label">Observações</label>
                </div>
                <div className="input-container">
                    <input type="text" value={obj.fornecedorContato} onChange={eventoTeclado} name="fornecedorContato" placeholder="Contato do fornecedor" className="form-control-sub" 
                    />
                    <label htmlFor="fornecedorContato" className="label">Contato do fornecedor</label>
                </div>
            </div>
            

            <div className="button-row">
                {botao ? (
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
                ) : (
                    <div className="botoes grande">
                        <input type="button" value="Alterar" onClick={alterar} className="btn btn-warning" />
                        <input type="button" value="Remover" onClick={remover} className="btn btn-danger" />
                        <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-secondary" />
                    </div>
                )}
            </div>
        </form>

    );
}

export default FormularioFornecedores;
