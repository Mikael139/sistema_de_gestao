package com.example.api.sistemadegestao.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Controle_De_Gastos")
@Getter
@Setter
public class ControleDeGastosModelo {
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private Long departamento_ID;
    private String dataGasto;
    private String descricao;
    private double valorGasto;

}
