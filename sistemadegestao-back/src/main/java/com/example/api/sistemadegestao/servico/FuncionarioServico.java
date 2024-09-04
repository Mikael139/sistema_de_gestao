package com.example.api.sistemadegestao.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.FuncionarioModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.FuncionarioRepositorio;

@Service
public class FuncionarioServico {
    
    @Autowired
    private FuncionarioRepositorio fr;

    @Autowired
    private RespostaModelo rm;


    //Método para listar todos os clientes
    public Iterable<FuncionarioModelo> listar() {
        return fr.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(FuncionarioModelo fm, String acao) {

        if (fm.getNomeCompleto().equals("")) {
            rm.setMensagem("O campo nome é obrigatorio!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getTelefone().equals("")) {
            rm.setMensagem("O comapo telefone é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getEmail().equals("")) {
            rm.setMensagem("O comapo email é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getEndereco().equals("")) {
            rm.setMensagem("O comapo endereco é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fm.getSalario() == 0) {
            rm.setMensagem("O comapo salario é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<FuncionarioModelo>(fr.save(fm), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<FuncionarioModelo>(fr.save(fm), HttpStatus.OK);
            }
        }
    }

    // Método para remover
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        System.out.println("Chamando método remover com código: " + codigo);
        fr.deleteById(codigo);

        rm.setMensagem("O funcionario foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

}