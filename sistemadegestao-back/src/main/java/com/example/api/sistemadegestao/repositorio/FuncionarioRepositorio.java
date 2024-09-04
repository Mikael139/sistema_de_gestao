package com.example.api.sistemadegestao.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.api.sistemadegestao.modelo.FuncionarioModelo;

@Repository
public interface FuncionarioRepositorio extends CrudRepository<FuncionarioModelo, Long>{


    
} 