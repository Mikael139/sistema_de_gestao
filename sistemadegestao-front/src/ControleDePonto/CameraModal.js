import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CameraModal() {
  const [videoRef, setVideoRef] = useState(null);
  const [photo, setPhoto] = useState(null);

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

    getMediaStream();

    return () => {
      if (videoRef && videoRef.srcObject) {
        const stream = videoRef.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [videoRef]);

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (videoRef && videoRef.videoWidth && videoRef.videoHeight) {
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
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

  return (
    <div className="camera-modal">
      <video ref={setVideoRef} autoPlay></video>
      <button onClick={capturePhoto}>Capturar Foto</button>
      {photo && (
        <div>
          <img src={URL.createObjectURL(photo)} alt="Capturada" />
          <button onClick={handleUpload}>Enviar Foto</button>
        </div>
      )}
    </div>
  );
}

export default CameraModal;
