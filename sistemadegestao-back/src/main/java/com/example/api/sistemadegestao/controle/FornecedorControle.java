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

import com.example.api.sistemadegestao.modelo.FornecedorModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.servico.FornecedorServico;

@RestController
@CrossOrigin(origins = "*")
public class FornecedorControle {
    
    @Autowired
    private FornecedorServico fs;

    @DeleteMapping("/removerFornecedor/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return fs.remover(codigo);
    }

    @PutMapping("/alterarFornecedor")
    public ResponseEntity<?> alterar(@RequestBody FornecedorModelo fornecedor) {
        return fs.cadastrarAlterar(fornecedor, "alterar");
    }
    
    @PostMapping("/cadastrarFornecedor")
    public ResponseEntity<?> cadastrar(@RequestBody FornecedorModelo fornecedor) {
        return fs.cadastrarAlterar(fornecedor, "cadastrar");
    }
    //Método para listar todos os produtos
    @GetMapping("/listarfornecedores")
    public Iterable<FornecedorModelo> listar() {
        return fs.listar();
    }


}
