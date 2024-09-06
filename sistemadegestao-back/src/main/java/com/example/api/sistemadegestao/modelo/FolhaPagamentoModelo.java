package com.example.api.sistemadegestao.modelo;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "folha_pagamento")
@Getter
@Setter
public class FolhaPagamentoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folha_ID;

    @ManyToOne
    @JoinColumn(name = "funcionario_ID", referencedColumnName = "id")
    private FuncionarioModelo funcionario;

    private Date dataPagamento;
    private double valorPago;

}
