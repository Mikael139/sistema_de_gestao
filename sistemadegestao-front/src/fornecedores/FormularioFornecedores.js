function FormularioFornecedores({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu clientes fornecedores">
            <div className="form-row pagamento">
            <label htmlFor="nome" className="label nome pagamento">Fornecedor</label>
                <input type="text" value={obj.fornecedor} onChange={eventoTeclado} name="nome" placeholder="Fornecedor" className="form-control-first" />
            </div>

            <div className="form-row">
                <div className="input-container">
                    <input type="text" value={obj.email_fornecedor} onChange={eventoTeclado} name="email_fornecedor" placeholder="E-Mail do fornecedor" className="form-control-sub pagamento" />
                    <label htmlFor="dataNascimento" className="label">E-mail do fornecedor</label>
                </div>
                <div className="input-container">
                    <input type="number" value={obj.Telefone} onChange={eventoTeclado} name="codigo" placeholder="Telefone" className="form-control-sub pagamento" />
                    <label htmlFor="dataCadastro" className="label">Telefone</label>
                </div>
            </div>

            <div className="form-row">
                <input type="text" value={obj.item} onChange={eventoTeclado} name="datapagamento" placeholder ="Item oferecido" className="form-control-sub pagamento" />
                <label htmlFor="observação" className="label">Item</label>
                <input type="number" value={obj.valor} onChange={eventoTeclado} name="valor" placeholder="Valor" className="form-control-sub pagamento" />
                <label htmlFor="Valor" className="label dois">Valor</label>
            </div>
            <div className="button-row">
                {botao ? (
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
                ) : (
                    <div className="botoes">
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
