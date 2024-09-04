package com.example.api.sistemadegestao.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.FornecedorModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.FornecedorRepositorio;

@Service
public class FornecedorServico {
    
    @Autowired
    private FornecedorRepositorio fr;

    @Autowired
    private RespostaModelo rm;


    //Método para listar todos os clientes
    public Iterable<FornecedorModelo> listar() {
        return fr.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(FornecedorModelo fm, String acao) {

        if (fm.getNomeFornecedor().equals("")) {
            rm.setMensagem("O campo nome é obrigatorio!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getFornecedorContato().equals("")) {
            rm.setMensagem("O campo contato é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getCnpjFornecedor().equals("")) {
            rm.setMensagem("O campo CNPJ é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getEnderecoFornecedor().equals("")) {
            rm.setMensagem("O campo endereco é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getTipoServico().equals("")) {
            rm.setMensagem("O campo tipo de serviço é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }else if (fm.getDataCadastro().equals("")){
            rm.setMensagem("O campo data de cadastro é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<FornecedorModelo>(fr.save(fm), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<FornecedorModelo>(fr.save(fm), HttpStatus.OK);
            }
        }
    }

    // Método para remover
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        System.out.println("Chamando método remover com código: " + codigo);
        fr.deleteById(codigo);

        rm.setMensagem("O fornecedor foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

}