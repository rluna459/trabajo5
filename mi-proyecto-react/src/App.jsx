import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener o crear tus estilos si lo deseas

export default function App() {
  // Estados para almacenar el Blob y el resultado en pantalla
  const [miBlob, setMiBlob] = useState(null);
  const [resultadoTexto, setResultadoTexto] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // 1. Crear Blob de texto
  const crearBlob = () => {
    const contenidoTexto = "Hola! Este es un archivo de texto creado dinámicamente utilizando el concepto de Blob en React para el Trabajo Práctico N°5.";
    
    // Crear el Blob especificando el contenido y el tipo MIME
    const nuevoBlob = new Blob([contenidoTexto], { type: 'text/plain;charset=utf-8' });
    setMiBlob(nuevoBlob);

    // Mostrar la información en la interfaz
    setResultadoTexto(`[ÉXITO] Blob creado correctamente.\nTamaño total: ${nuevoBlob.size} bytes\nTipo MIME: ${nuevoBlob.type}\nContenido: "${contenidoTexto}"`);
    setMostrarResultado(true);
  };

  // 2. Descargar el Blob creado
  const descargarBlob = () => {
    if (!miBlob) return;

    // Generar una URL temporal en memoria que apunta al Blob
    const url = URL.createObjectURL(miBlob);
    
    // Crear un elemento <a> temporal y oculto para forzar la descarga
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'archivo_blob.txt';
    
    document.body.appendChild(enlace);
    enlace.click();
    
    // Limpieza posterior
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
  };

  // 3. Utilizar el concepto de Slice (recortar el Blob)
  const usarSlice = () => {
    if (!miBlob) return;

    // Utilizar el método .slice() para extraer una porción del Blob (desde el byte 0 al 30)
    const blobCortado = miBlob.slice(0, 30, 'text/plain');

    // Leer el fragmento con FileReader para mostrarlo en pantalla
    const lector = new FileReader();
    lector.onload = function(e) {
      setResultadoTexto(prev => prev + `\n\n--- Uso de slice() ---\nFragmento extraído (bytes 0 a 30):\n"${e.target.result}..."\nTamaño del nuevo fragmento: ${blobCortado.size} bytes`);
    };
    lector.readAsText(blobCortado);
  };

  return (
    
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      margin: 0,
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '650px',
        width: '100%'
      }}>
        
        <h2 style={{ color: '#1f2937', marginBottom: '25px', fontSize: '1.5rem' }}>
          Ejemplo de uso de Blobs
        </h2>

        {/* Panel de Botones */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={crearBlob}
            style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
          >
            Crear Blob de texto
          </button>

          <button 
            onClick={descargarBlob}
            disabled={!miBlob}
            style={{ backgroundColor: miBlob ? '#22c55e' : '#9ca3af', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '4px', cursor: miBlob ? 'pointer' : 'not-allowed', fontWeight: '500' }}
          >
            Descargar Blob
          </button>

          <button 
            onClick={usarSlice}
            disabled={!miBlob}
            style={{ backgroundColor: miBlob ? '#22c55e' : '#9ca3af', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '4px', cursor: miBlob ? 'pointer' : 'not-allowed', fontWeight: '500' }}
          >
            Usar slice()
          </button>
        </div>

        {/* Sección de Resultados */}
        {mostrarResultado && (
          <div style={{
            marginTop: '20px',
            textAlign: 'left',
            backgroundColor: '#f1f5f9',
            padding: '15px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            color: '#334155',
            borderLeft: '4px solid #22c55e'
          }}>
            {resultadoTexto}
          </div>
        )}

      </div>
    </div>
  );
}