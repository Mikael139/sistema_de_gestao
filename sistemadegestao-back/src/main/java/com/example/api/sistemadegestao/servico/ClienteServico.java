package com.example.api.sistemadegestao.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.ClienteModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.ClienteRepositorio;

@Service
public class ClienteServico {
    
    @Autowired
    private ClienteRepositorio cr;

    @Autowired
    private RespostaModelo rm;


    //Método para listar todos os clientes
    public Iterable<ClienteModelo> listar() {
        return cr.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(ClienteModelo cm, String acao) {

        if (cm.getDt_nascimento().equals("")) {
            rm.setMensagem("O campo de data de nascimento é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getObs().equals("")) {
            rm.setMensagem("Observacao é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<ClienteModelo>(cr.save(cm), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<ClienteModelo>(cr.save(cm), HttpStatus.OK);
            }
        }
    }

    // Método para remover
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        System.out.println("Chamando método remover com código: " + codigo);
        cr.deleteById(codigo);

        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

}
