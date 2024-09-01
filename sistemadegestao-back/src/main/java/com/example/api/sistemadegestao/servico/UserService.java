package com.example.api.sistemadegestao.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.modelo.UsuarioModelo;
import com.example.api.sistemadegestao.repositorio.UsuarioRepositorio;

@Service
public class UserService {

    @Autowired
    private UsuarioRepositorio userRepo;

    @Autowired
    private RespostaModelo respostaModel;

    public ResponseEntity<?> autenticar(String username, String password) {
        UsuarioModelo user = userRepo.findByUsername(username);
        if (user == null || !user.getPassword().equals(password)) {
            respostaModel.setMensagem("Usuário ou senha inválidos!");
            return new ResponseEntity<>(respostaModel, HttpStatus.UNAUTHORIZED);
        } else {
            respostaModel.setMensagem("Login realizado com sucesso!");
            return new ResponseEntity<>(respostaModel, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> cadastrar(UsuarioModelo userModel) {
        UsuarioModelo existingUser = userRepo.findByUsername(userModel.getUsername());
        if (existingUser != null) {
            respostaModel.setMensagem("Nome de usuário já existe!");
            return new ResponseEntity<>(respostaModel, HttpStatus.BAD_REQUEST);
        }

        userRepo.save(userModel);
        respostaModel.setMensagem("Usuário cadastrado com sucesso!");
        return new ResponseEntity<>(respostaModel, HttpStatus.CREATED);
    }
}