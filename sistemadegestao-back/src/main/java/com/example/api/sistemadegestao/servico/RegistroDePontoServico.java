package com.example.api.sistemadegestao.servico;

import com.example.api.sistemadegestao.modelo.FotoModelo;
import com.example.api.sistemadegestao.modelo.RegistroDePontoModelo;
import com.example.api.sistemadegestao.repositorio.FotoRepositorio;
import com.example.api.sistemadegestao.repositorio.RegistroDePontoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class RegistroDePontoServico {

    @Autowired
    private RegistroDePontoRepositorio registroDePontoRepositorio;

    @Autowired
    private FotoRepositorio fotoRepositorio;

    public boolean validarRegistro(int id, String senha) {
        Optional<RegistroDePontoModelo> registro = registroDePontoRepositorio.findByIdAndSenha(id, senha);
        return registro.isPresent();
    }

    public String salvarFoto(Long registroId, MultipartFile arquivo) {
        try {
            Optional<RegistroDePontoModelo> registro = registroDePontoRepositorio.findById(registroId);
            if (!registro.isPresent()) {
                return "Registro de ponto não encontrado.";
            }

            FotoModelo foto = new FotoModelo();
            foto.setRegistroDePonto(registro.get());
            foto.setImagem(arquivo.getBytes());
            fotoRepositorio.save(foto);
            return "Foto salva com sucesso!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Erro ao salvar foto: " + e.getMessage();
        }
    }

    // Método para buscar o registro por ID
    public Optional<RegistroDePontoModelo> findById(Long id) {
        return registroDePontoRepositorio.findById(id);
    }

    // Método para buscar foto associada a um registro de ponto
    public Optional<FotoModelo> findFotoByRegistroDePonto(RegistroDePontoModelo registro) {
        return fotoRepositorio.findByRegistroDePonto(registro);
    }
}
