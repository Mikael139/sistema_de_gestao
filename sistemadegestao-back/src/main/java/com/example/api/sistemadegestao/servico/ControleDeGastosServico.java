package com.example.api.sistemadegestao.servico;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.apache.poi.ss.usermodel.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;
import java.util.List;

import com.example.api.sistemadegestao.modelo.ControleDeGastosModelo;
import com.example.api.sistemadegestao.modelo.RespostaModelo;
import com.example.api.sistemadegestao.repositorio.ControleDeGastosRepositorio;


@Service
public class ControleDeGastosServico {
    
    @Autowired
    private ControleDeGastosRepositorio cgp;

    @Autowired
    private RespostaModelo rm;


    //Método para listar
    public Iterable<ControleDeGastosModelo> listar() {
        return cgp.findAll();
    }

    //Método para cadastrar ou alterar
    public ResponseEntity<?> cadastrarAlterar(ControleDeGastosModelo cg, String acao) {

        if (cg.getDataGasto().equals("")) {
            rm.setMensagem("O campo de data do gasto é obrigatório!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (cg.getDescricao().equals("")) {
            rm.setMensagem("A descrição é obrigatória!");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                // Se a opção for cadastrar será CREATED
                return new ResponseEntity<ControleDeGastosModelo>(cgp.save(cg), HttpStatus.CREATED);
            } else {
                // Se a opção for Alterar será OK
                return new ResponseEntity<ControleDeGastosModelo>(cgp.save(cg), HttpStatus.OK);
            }
        }
    }

    // Método para remover
    public ResponseEntity<RespostaModelo> remover(long codigo) {
        System.out.println("Chamando método remover com código: " + codigo);
        cgp.deleteById(codigo);

        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

    public ResponseEntity<InputStreamResource> exportarExcel() throws IOException {
        List<ControleDeGastosModelo> listaGastos = (List<ControleDeGastosModelo>) cgp.findAll();
        
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Controle de Gastos");

        // Cabeçalhos
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("codigo");
        header.createCell(1).setCellValue("data_gasto");
        header.createCell(2).setCellValue("descricao");
        header.createCell(3).setCellValue("valor_gasto");

        // Dados
        int rowCount = 1;
        for (ControleDeGastosModelo gasto : listaGastos) {
            Row row = sheet.createRow(rowCount++);
            row.createCell(0).setCellValue(gasto.getCodigo());
            row.createCell(1).setCellValue(gasto.getDataGasto());
            row.createCell(2).setCellValue(gasto.getDescricao());
            row.createCell(3).setCellValue(gasto.getValorGasto());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=controle_gastos.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(inputStream));
    }
}
