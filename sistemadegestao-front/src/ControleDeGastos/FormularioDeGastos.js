function FormularioDeGastos({botao, eventoTeclado, cadastrar, obj, cancelar, remover, alterar}) {
    return(
        <form className="menu">
            <label htmlFor="Datadogasto" className="label_gasto">Data do gasto</label>
            <input type="date" value={obj.dataGasto} onChange={eventoTeclado} name="dataGasto" className="form-control data"/>
            <label htmlFor="Datadogasto" className="label_gasto valor">Valor gasto</label>
            <input type="number" value={obj.valorGasto} onChange={eventoTeclado} name="valorGasto" placeholder="Valor gasto" className="form-control"/>
            <label htmlFor="Datadogasto" className="label_gasto descricao">Descrição</label>
            <input type="text" value={obj.descricao} onChange={eventoTeclado} name="descricao" placeholder="Descrição" className="form-control descricao"/>

        
            {
                botao 
                //Se botão for igual a true mostra o cadastrar
                ? 
                <input type="button" value="Cadastrar" onClick={cadastrar} className="btn btn-primary"/>
                //Caso contrário, mostra os demais botões
                :
                <div>
                    <input type="button" value="Alterar" onClick={alterar} className="btn btn-warning"/>
                    <input type="button" value="Remover" onClick={remover} className="btn btn-danger"/>
                    <input type="button" value="Cancelar" onClick={cancelar} className="btn btn-secondary"/>
                </div>
            }
        </form>
    )
}

export default FormularioDeGastos;