package com.example.api.sistemadegestao.modelo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroPontoFotoResponseModelo {

    private RegistroDePontoModelo registro;
    private byte[] foto;
    
}
