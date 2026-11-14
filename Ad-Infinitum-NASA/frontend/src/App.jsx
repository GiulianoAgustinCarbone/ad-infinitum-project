import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [estado, setEstado] = useState('Consultando API del backend...');

  useEffect(() => {
    const consultarAPI = async () => {
      // Toma la URL de producción si existe en Vercel, o usa localhost por defecto
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

      //Esto son valores de ejemplos, se pueden cambiar a lo que vos quieras
      const parametros = new URLSearchParams({
        lat: -33.2948,
        lon: -66.3358,
        start: 1981,
        end: 2025,
        params: 'PRECTOTCORR',
        community: 'ag',
      });

      try {
        const respuesta = await fetch(`${API_URL}/api/serie-punto?${parametros}`);

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const data = await respuesta.json();

        // Imprime tanto el objeto desplegable como el texto en formato JSON puro
        console.log('Respuesta de la API (Objeto):', data);
        console.log('Respuesta en formato JSON:\n', JSON.stringify(data, null, 2));

        setEstado(`Listo (${data.total_registros} registros recibidos). Presioná F12 y mirá la pestaña Console.`);
      } catch (error) {
        console.error('Fallo la conexión con el backend:', error);
        setEstado(`Error al conectar con el backend: ${error.message}`);
      }
    };

    consultarAPI();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Ad Infinitum - Earth System Trend Detective</h1>
      <p>{estado}</p>
    </div>
  );
}

export default App;