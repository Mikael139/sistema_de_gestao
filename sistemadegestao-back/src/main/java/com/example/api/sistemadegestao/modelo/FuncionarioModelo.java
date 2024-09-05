package com.example.api.sistemadegestao.modelo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "funcionario")
@Getter
@Setter
public class FuncionarioModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   
    private Long codigo;
    private String nomeCompleto;
    private Date dt_nascimento;
    private Date dt_cadastro;
    private char genero;  
    private String telefone;    
    private String email;      
    private String endereco;           
    private String cargo;             
    private double salario;  

}

