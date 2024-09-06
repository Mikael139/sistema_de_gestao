package com.example.api.sistemadegestao.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.sistemadegestao.modelo.FolhaPagamentoModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.servico.FolhaPagamentoServico;

@RestController
@CrossOrigin(origins = "*")
public class FolhaDePagamentoControle {
    
    @Autowired
    private FolhaPagamentoServico fp;

    @DeleteMapping("/removerPagamento/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return fp.remover(codigo);
    }

    @PutMapping("/alterarPagamento")
    public ResponseEntity<?> alterar(@RequestBody FolhaPagamentoModelo folhaPagamento) {
        return fp.cadastrarAlterar(folhaPagamento, "alterar");
    }

    @PostMapping("/cadastrarPagamento")
    public ResponseEntity<?> cadastrar(@RequestBody FolhaPagamentoModelo folhaPagamento) {
        return fp.cadastrarAlterar(folhaPagamento, "cadastrar");
    }

    //Método para listar
    @GetMapping("/listarFolhaDePagamento")
    public Iterable<FolhaPagamentoModelo> listar() {
        return fp.listar();
    }

}
