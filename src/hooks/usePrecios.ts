import { useState, useEffect } from 'react';
import { PRECIOS_LOCALES, Precios } from '@/data/precios';

const URL_PRECIOS_REMOTOS = 'https://1659102.github.io/Precios-Lega/precios.json';

export const usePrecios = () => {
  const [precios, setPrecios] = useState<Precios>(PRECIOS_LOCALES);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarPrecios = async () => {
    try {
      setCargando(true);
      setError(null);
      
      const respuesta = await fetch(URL_PRECIOS_REMOTOS + '?t=' + Date.now());
      
      if (!respuesta.ok) {
        throw new Error('Error al cargar precios remotos');
      }
      
      const preciosRemotos = await respuesta.json();
      
      if (preciosRemotos && preciosRemotos.telas && preciosRemotos.sistemas) {
        setPrecios(preciosRemotos);
      } else {
        throw new Error('Estructura de precios inválida');
      }
    } catch (err) {
      console.log('Usando precios locales:', err);
      setError('Usando precios locales');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPrecios();
  }, []);

  return { precios, cargando, error, recargar: cargarPrecios };
};
