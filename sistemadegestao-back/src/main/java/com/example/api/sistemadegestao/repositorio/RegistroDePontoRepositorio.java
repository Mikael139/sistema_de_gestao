package com.example.api.sistemadegestao.repositorio;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.sistemadegestao.modelo.RegistroDePontoModelo;

@Repository
public interface RegistroDePontoRepositorio extends JpaRepository<RegistroDePontoModelo, Long> {
    Optional<RegistroDePontoModelo> findByIdAndSenha(int id, String senha);
}
