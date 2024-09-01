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

import com.example.api.sistemadegestao.modelo.ClienteModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.servico.ClienteServico;

@RestController
@CrossOrigin(origins = "*")
public class ClienteControle {
    
    @Autowired
    private ClienteServico cs;

    @DeleteMapping("/removerClientes/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo) {
        return cs.remover(codigo);
    }

    @PutMapping("/alterarClientes")
    public ResponseEntity<?> alterar(@RequestBody ClienteModelo controleGastos) {
        return cs.cadastrarAlterar(controleGastos, "alterar");
    }

    @PostMapping("/cadastrarClientes")
    public ResponseEntity<?> cadastrar(@RequestBody ClienteModelo controleGastos) {
        return cs.cadastrarAlterar(controleGastos, "cadastrar");
    }
    //Método para listar todos os produtos
    @GetMapping("/listarclientes")
    public Iterable<ClienteModelo> listar() {
        return cs.listar();
    }

    @GetMapping("/")
    public String rota() {
        return "API funcionando";
    }

}
