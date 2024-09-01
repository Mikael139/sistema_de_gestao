package com.example.api.sistemadegestao.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.ControleDeGastosModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.ControleDeGastosRepositorio;


@Service
public class ControleDeGastosServico {
    
    @Autowired
    private ControleDeGastosRepositorio cgp;

    @Autowired
    private RespostaModelo rm;


    //Método para listar
    public Iterable<ControleDeGastosModelo> listar() {
        return cgp.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(ControleDeGastosModelo cg, String acao) {

        if (cg.getDataGasto().equals("")) {
            rm.setMensagem("O campo de data do gasto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (cg.getDescricao().equals("")) {
            rm.setMensagem("A descrição é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<ControleDeGastosModelo>(cgp.save(cg), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<ControleDeGastosModelo>(cgp.save(cg), HttpStatus.OK);
            }
        }
    }

// Método para remover
public ResponseEntity<RespostaModelo> remover(long codigo) {
    System.out.println("Chamando método remover com código: " + codigo);
    cgp.deleteById(codigo);

    rm.setMensagem("O produto foi removido com sucesso!");
    return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
}
}
