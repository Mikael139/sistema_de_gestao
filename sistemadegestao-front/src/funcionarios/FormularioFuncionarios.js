function FormularioFuncionarios({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu funcionarios">
          <div className="form-row">
            <label htmlFor="nomeCompleto" className="label nome">Nome Completo</label>
            <input type="text" value={obj.nomeCompleto} onChange={eventoTeclado} name="nomeCompleto" placeholder="Nome Completo" className="form-control-first"
            />
          </div>

          <div className="form-row">
            <div className="input-container">
              <input type="date" value={obj.dt_nascimento} onChange={eventoTeclado} name="dt_nascimento" placeholder="Data de Nascimento" className="form-control-sub data"
              />
              <label htmlFor="dt_nascimento" className="label">Data de Nascimento</label>
            </div>
            <div className="input-container">
              <input type="date" value={obj.dt_cadastro} onChange={eventoTeclado} name="dt_cadastro" placeholder="Data de Cadastro" className="form-control-sub data"
              />
              <label htmlFor="dt_cadastro" className="label">Data de Cadastro</label>
            </div>
          </div>

          <div className="form-row">
            <input type="text" value={obj.endereco} onChange={eventoTeclado} name="endereco" placeholder="Endereço" className="form-control-sub"
            />
            <label htmlFor="endereco" className="label">Endereço</label>
          </div>

          <div className="form-row">
            <input type="number" value={obj.telefone} onChange={eventoTeclado} name="telefone" placeholder="Telefone" className="form-control-sub"
            />
            <label htmlFor="telefone" className="label">Telefone</label>
            <input type="email" value={obj.email} onChange={eventoTeclado} name="email" placeholder="Email" className="form-control-sub"
            />
            <label htmlFor="email" className="label"></label>
          </div>

          <div className="form-row">
            <label htmlFor="genero" className="label">Gênero</label>
            <select value={obj.genero} onChange={eventoTeclado} name="genero" className="form-control-sub"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
              <option value="N">Prefiro não informar</option>
            </select>
          </div>

          <div className="form-row">
            <input type="text" value={obj.cargo} onChange={eventoTeclado} name="cargo" placeholder="Cargo" className="form-control-sub"
            />
            <label htmlFor="cargo" className="label">Cargo</label>

            <input type="number" value={obj.salario} onChange={eventoTeclado} name="salario" placeholder="Salário" className="form-control-sub" step="0.01"
            />
            <label htmlFor="salario" className="label">Salário</label>
          </div>

          <div className="button-row">
            {botao ? (
              <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary" />
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

export default FormularioFuncionarios;
