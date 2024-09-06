package com.example.api.sistemadegestao.servico;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.api.sistemadegestao.modelo.ClienteModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.ClienteRepositorio;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.apache.poi.ss.usermodel.*;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ClienteServico {
    
    @Autowired
    private ClienteRepositorio cr;

    @Autowired
    private RespostaModelo rm;


    //Método para listar todos os clientes
    public Iterable<ClienteModelo> listar() {
        return cr.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(ClienteModelo cm, String acao) {

        if (cm.getDt_nascimento().equals("")) {
            rm.setMensagem("O campo de data de nascimento é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (cm.getObs().equals("")) {
            rm.setMensagem("Observacao é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<ClienteModelo>(cr.save(cm), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<ClienteModelo>(cr.save(cm), HttpStatus.OK);
            }
        }
    }

    // Método para remover
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        System.out.println("Chamando método remover com código: " + codigo);
        cr.deleteById(codigo);

        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

    public ResponseEntity<InputStreamResource> exportarExcel() throws IOException {
        List<ClienteModelo> listaCliente = (List<ClienteModelo>) cr.findAll();
        
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Controle de Gastos");

        // Cabeçalhos
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("nome");
        header.createCell(1).setCellValue("cliente_contato");
        header.createCell(2).setCellValue("dt_cadastro");
        header.createCell(3).setCellValue("dt_nascimento");
        header.createCell(4).setCellValue("endereco_cliente");
        header.createCell(5).setCellValue("genero");
        header.createCell(6).setCellValue("observacao");

        // Dados
        int rowCount = 1;
        for (ClienteModelo cliente : listaCliente) {
            Row row = sheet.createRow(rowCount++);
            row.createCell(0).setCellValue(cliente.getNome());
            row.createCell(1).setCellValue(cliente.getCliente_contato());
            row.createCell(2).setCellValue(cliente.getDt_cadastro());
            row.createCell(3).setCellValue(cliente.getDt_nascimento());
            row.createCell(4).setCellValue(cliente.getEndereco_cliente());
            row.createCell(5).setCellValue(cliente.getGenero());
            row.createCell(6).setCellValue(cliente.getObs());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=clientes.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(inputStream));
    }

}
