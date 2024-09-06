package com.example.api.sistemadegestao.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.FolhaPagamentoModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.FolhaDePagamentoRepositorio;

@Service
public class FolhaPagamentoServico {
    @Autowired
    private FolhaDePagamentoRepositorio fpr;

    @Autowired
    private RespostaModelo rm;


    //Método para listar
    public Iterable<FolhaPagamentoModelo> listar() {
        return fpr.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(FolhaPagamentoModelo fp, String acao) {

        if (fp.getDataPagamento().equals("")) {
            rm.setMensagem("O campo de data do pagamento é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (fp.getValorPago() == 0.0) {
            rm.setMensagem("O valor pago é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        }
        else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<FolhaPagamentoModelo>(fpr.save(fp), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<FolhaPagamentoModelo>(fpr.save(fp), HttpStatus.OK);
            }
        }
    }

    // Método para remover
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        System.out.println("Chamando método remover com código: " + codigo);
        fpr.deleteById(codigo);

        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }
}
