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

import com.example.api.sistemadegestao.modelo.ControleDeGastosModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.servico.ControleDeGastosServico;

@RestController
@CrossOrigin(origins = "*")
public class ControleDeGastosControle {
    
    @Autowired
    private ControleDeGastosServico cg;

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return cg.remover(codigo);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ControleDeGastosModelo controleGastos) {
        return cg.cadastrarAlterar(controleGastos, "alterar");
    }

    @PostMapping("/cadastrarGastos")
    public ResponseEntity<?> cadastrar(@RequestBody ControleDeGastosModelo controleGastos) {
        return cg.cadastrarAlterar(controleGastos, "cadastrar");
    }

    //Método para listar
    @GetMapping("/listarcontroledegastos")
    public Iterable<ControleDeGastosModelo> listar() {
        return cg.listar();
    }

}
