package com.example.api.sistemadegestao.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.sistemadegestao.modelo.UsuarioModelo;
import com.example.api.sistemadegestao.servico.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioControle {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModelo user) {
        return userService.autenticar(user.getUsername(), user.getPassword());
    }

    @PostMapping("/cadastrarUsuarios")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioModelo user) {
        return userService.cadastrar(user);
    }
}