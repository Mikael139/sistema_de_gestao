import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../CSS/cameras.css';

function CameraModal() {
  const [videoRef, setVideoRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showModal, setShowModal] = useState(true); // Controla a exibição do modal

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef) {
          videoRef.srcObject = stream;
        }
      } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
      }
    };

    if (showModal) {
      getMediaStream();
    }

    return () => {
      if (videoRef && videoRef.srcObject) {
        const stream = videoRef.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [videoRef, showModal]);

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (videoRef && videoRef.videoWidth && videoRef.videoHeight) {
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
      context.scale(-1, 1); 
      context.drawImage(videoRef, -canvas.width, 0, canvas.width, canvas.height);
      context.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          setPhoto(blob);
        }
      }, 'image/jpeg');
    }
  };

  const handleUpload = async () => {
    if (!(photo instanceof Blob)) {
      alert('Nenhuma foto capturada ou a foto não é um Blob.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('arquivo', photo); // 'arquivo' deve ser o mesmo nome do parâmetro esperado pela API
      formData.append('registroId', 1); // Substitua pelo ID correto

      await axios.post('http://localhost:8080/api/registro/foto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Foto enviada com sucesso!');
    } catch (error) {
      alert('Erro ao enviar foto: ' + error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Oculta o modal e para a câmera
    setPhoto(null);      // Limpa a foto capturada, se houver
  };

  if (!showModal) return null; // Não exibe o modal se `showModal` for false

  return (
    <div className="camera-modal">
      <div className="tirar_foto">
        {/* Exibe o vídeo da câmera */}
        <video ref={setVideoRef} autoPlay></video>

        {/* Exibe a imagem capturada, se houver */}
        {photo && (
          <img src={URL.createObjectURL(photo)} alt="Capturada" />
        )}
      </div>

      <button onClick={capturePhoto} className='btn btn-primary foto'>Capturar Foto</button>
      {photo && (
        <button onClick={handleUpload} className='btn btn-primary foto'>Enviar Foto</button>
      )}
      
      {/* Botão para fechar o modal */}
      <button onClick={closeModal} className='btn btn-secondary'>Cancelar</button>
    </div>
  );
}

export default CameraModal;
