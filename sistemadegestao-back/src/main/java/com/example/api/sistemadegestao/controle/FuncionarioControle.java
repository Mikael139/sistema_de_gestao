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

import com.example.api.sistemadegestao.modelo.FuncionarioModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.servico.FuncionarioServico;

@RestController
@CrossOrigin(origins = "*")
public class FuncionarioControle {
    
    @Autowired
    private FuncionarioServico fs;

    @DeleteMapping("/removerFuncionario/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return fs.remover(codigo);
    }

    @PutMapping("/alterarFuncionario")
    public ResponseEntity<?> alterar(@RequestBody FuncionarioModelo controleGastos) {
        return fs.cadastrarAlterar(controleGastos, "alterar");
    }

    @PostMapping("/cadastrarFuncionario")
    public ResponseEntity<?> cadastrar(@RequestBody FuncionarioModelo controleGastos) {
        return fs.cadastrarAlterar(controleGastos, "cadastrar");
    }
    //Método para listar todos os produtos
    @GetMapping("/listarfuncionario")
    public Iterable<FuncionarioModelo> listar() {
        return fs.listar();
    }

}
