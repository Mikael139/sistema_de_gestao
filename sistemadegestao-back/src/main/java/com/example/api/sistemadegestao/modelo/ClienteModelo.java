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
@Table(name = "clientes")
@Getter
@Setter
public class ClienteModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private int pessoa_id;   
    private String nome;
    private Date dt_nascimento;    
    private Date dt_cadastro;      
    private char genero;           
    private String obs;             
    private String cliente_contato;  
    private String endereco_cliente; 

}
