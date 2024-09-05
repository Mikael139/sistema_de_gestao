package com.example.api.sistemadegestao.repositorio;

import com.example.api.sistemadegestao.modelo.FotoModelo;
import com.example.api.sistemadegestao.modelo.RegistroDePontoModelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FotoRepositorio extends JpaRepository<FotoModelo, Long> {
    Optional<FotoModelo> findByRegistroDePonto(RegistroDePontoModelo registroDePonto);
}
