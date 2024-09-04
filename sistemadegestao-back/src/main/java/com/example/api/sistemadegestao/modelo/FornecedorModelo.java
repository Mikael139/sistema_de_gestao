package com.example.api.sistemadegestao.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "fornecedor")
@Getter
@Setter
public class FornecedorModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fornecedorId;   
    private Long pessoaId;
    private String tipoServico;
    private Date dataCadastro;
    private String obs;
    private String fornecedorContato;
    private String nomeFornecedor;
    private String enderecoFornecedor;
    private String cnpjFornecedor;   
   
}
