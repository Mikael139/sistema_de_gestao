package com.example.api.sistemadegestao.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.api.sistemadegestao.modelo.ControleDeGastosModelo;

@Repository
public interface ControleDeGastosRepositorio extends CrudRepository<ControleDeGastosModelo, Long> {

}
