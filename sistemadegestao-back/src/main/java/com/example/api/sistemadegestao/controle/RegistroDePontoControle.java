package com.example.api.sistemadegestao.controle;

import com.example.api.sistemadegestao.modelo.FotoModelo;
import com.example.api.sistemadegestao.modelo.RegistroDePontoModelo;
import com.example.api.sistemadegestao.modelo.RegistroPontoFotoResponseModelo;
import com.example.api.sistemadegestao.servico.RegistroDePontoServico;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/registro")
@CrossOrigin(origins = "*")
public class RegistroDePontoControle {

    @Autowired
    private RegistroDePontoServico registroDePontoServico;

    @PostMapping("/validar")
    public ResponseEntity<String> validarRegistro(@RequestParam @NotNull int id, @RequestParam @NotNull String senha) {
        if (id <= 0 || senha.isEmpty()) {
            return ResponseEntity.badRequest().body("ID e senha devem ser preenchidos.");
        }

        boolean valido = registroDePontoServico.validarRegistro(id, senha);
        if (valido) {
            return ResponseEntity.ok("Registro validado com sucesso.");
        } else {
            return ResponseEntity.status(401).body("ID ou senha incorretos.");
        }
    }

    @PostMapping("/foto")
    public ResponseEntity<String> enviarFoto(
        @RequestParam @NotNull Long registroId,
        @RequestParam("arquivo") @NotNull MultipartFile arquivo) {
        if (registroId <= 0 || arquivo.isEmpty()) {
            return ResponseEntity.badRequest().body("ID do registro e foto devem ser fornecidos.");
        }

        String resultado = registroDePontoServico.salvarFoto(registroId, arquivo);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/ponto/{id}")
    public ResponseEntity<?> obterPontoEFoto(@PathVariable Long id) {
        Optional<RegistroDePontoModelo> registroOpt = registroDePontoServico.findById(id);
        if (registroOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        RegistroDePontoModelo registro = registroOpt.get();
        
        Optional<FotoModelo> fotoOpt = registroDePontoServico.findFotoByRegistroDePonto(registro);
        byte[] foto = fotoOpt.map(FotoModelo::getImagem).orElse(null);

        RegistroPontoFotoResponseModelo response = new RegistroPontoFotoResponseModelo();
        response.setRegistro(registro);
        response.setFoto(foto);
        
        return ResponseEntity.ok(response);
    }
}
