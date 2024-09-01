function FormularioClientes({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu clientes pagamento">
            <div className="form-row pagamento">
            <label htmlFor="nome" className="label nome pagamento">Nome</label>
                <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className="form-control-first" />
            </div>

            <div className="form-row">
                <div className="input-container">
                    <input type="text" value={obj.data_nascimento} onChange={eventoTeclado} name="email" placeholder="E-Mail" className="form-control-sub pagamento" />
                    <label htmlFor="dataNascimento" className="label">E-mail</label>
                </div>
                <div className="input-container">
                    <input type="number" value={obj.data_cadastro} onChange={eventoTeclado} name="codigo" placeholder="CPF" className="form-control-sub pagamento" />
                    <label htmlFor="dataCadastro" className="label">CPF</label>
                </div>
            </div>

            <div className="form-row">
                <input type="date" value={obj.obs} onChange={eventoTeclado} name="datapagamento" className="form-control-sub pagamento" />
                <label htmlFor="observação" className="label">Data do pagamento</label>
                <input type="number" value={obj.endereco_cliente} onChange={eventoTeclado} name="valor" placeholder="Valor pago" className="form-control-sub pagamento" />
                <label htmlFor="endereço" className="label dois">Valor pago</label>
            </div>
            <div className="button-row">
                {botao ? (
                    <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
                ) : (
                    <div>
                        <input type="button" value="Alterar" onClick={alterar} className="btn btn-warning" />
                        <input type="button" value="Remover" onClick={remover} className="btn btn-danger" />
                        <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-secondary" />
                    </div>
                )}
            </div>
        </form>
    );
}

export default FormularioClientes;