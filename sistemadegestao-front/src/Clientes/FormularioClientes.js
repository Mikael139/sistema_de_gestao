function FormularioClientes({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu clientes">
            <div className="form-row">
            <label htmlFor="nome" className="label nome">Nome</label>
                <input type="text" value={obj.nome} onChange={eventoTeclado} name="nome" placeholder="Nome" className="form-control-first" />
            </div>

            <div className="form-row">
                <div className="input-container">
                    <input type="date" value={obj.dt_nascimento} onChange={eventoTeclado} name="dt_nascimento" placeholder="Data do seu nascimento" className="form-control-sub data" />
                    <label htmlFor="dataNascimento" className="label">Data Nasc.</label>
                </div>
                <div className="input-container">
                    <input type="date" value={obj.dt_cadastro} onChange={eventoTeclado} name="dt_cadastro" placeholder="Data do cadastro" className="form-control-sub data" />
                    <label htmlFor="dataCadastro" className="label">Data de cad.</label>
                </div>
            </div>

            <div className="form-row">
                <input type="text" value={obj.obs} onChange={eventoTeclado} name="obs" placeholder="Observação" className="form-control-sub" />
                <label htmlFor="observação" className="label">Observação</label>
                <input type="text" value={obj.endereco_cliente} onChange={eventoTeclado} name="endereco_cliente" placeholder="Endereço" className="form-control-sub" />
                <label htmlFor="endereço" className="label dois">Endereço</label>
            </div>

            <div className="form-row">
            <label htmlFor="Telefone" className="label">Telefone</label>
                <input type="text" value={obj.cliente_contato} onChange={eventoTeclado} name="cliente_contato" placeholder="Telefone" className="form-control-sub" />
                <label htmlFor="genero" className="label dois">Gênero</label>
                <select value={obj.genero} onChange={eventoTeclado} name="genero" className="form-control-sub">
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                    <option value="N">Prefiro não informar</option>
                </select>
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