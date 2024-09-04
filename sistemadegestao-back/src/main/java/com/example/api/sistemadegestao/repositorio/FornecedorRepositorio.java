package com.example.api.sistemadegestao.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.api.sistemadegestao.modelo.FornecedorModelo;

@Repository
public interface FornecedorRepositorio extends CrudRepository<FornecedorModelo, Long>{


    
} 