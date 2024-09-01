package com.example.api.sistemadegestao.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.api.sistemadegestao.modelo.UsuarioModelo;

@Repository
public interface UsuarioRepositorio extends CrudRepository<UsuarioModelo, Long> {
    UsuarioModelo findByUsername(String username);
}
