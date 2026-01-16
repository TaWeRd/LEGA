import { useState, useCallback } from 'react';
import { Cortina, Cliente, crearCortinaNueva } from '@/types/cortina';
import { Precios } from '@/data/precios';

export const useCotizador = (precios: Precios) => {
  const [cliente, setCliente] = useState<Cliente>({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const [cortinas, setCortinas] = useState<Cortina[]>([crearCortinaNueva(1)]);
  const [cortinaActiva, setCortinaActiva] = useState(0);
  const [porcentajeExtra, setPorcentajeExtra] = useState(0);

  const agregarCortina = useCallback(() => {
    const nuevaCortina = crearCortinaNueva(cortinas.length + 1);
    setCortinas(prev => [...prev, nuevaCortina]);
    setCortinaActiva(cortinas.length);
  }, [cortinas.length]);

  const eliminarCortina = useCallback((index: number) => {
    if (cortinas.length === 1) return;
    setCortinas(prev => prev.filter((_, i) => i !== index));
    setCortinaActiva(prev => Math.min(prev, cortinas.length - 2));
  }, [cortinas.length]);

  const actualizarCortina = useCallback((index: number, campo: keyof Cortina, valor: any) => {
    setCortinas(prev => {
      const nuevas = [...prev];
      nuevas[index] = { ...nuevas[index], [campo]: valor };
      if (campo === 'telaSeleccionada') {
        nuevas[index].colorSeleccionado = '';
      }
      return nuevas;
    });
  }, []);

  const reemplazarCortina = useCallback((index: number, data: Cortina) => {
    setCortinas(prev => {
      const nuevas = [...prev];
      nuevas[index] = data;
      return nuevas;
    });
  }, []);

  const calcularTotalCortina = useCallback((cortina: Cortina): number => {
    if (!cortina.ancho || !cortina.alto || !cortina.telaSeleccionada || !cortina.sistemaSeleccionado) {
      return 0;
    }

    const anchoCm = Math.max(parseFloat(cortina.ancho) || 0, 100);
    const altoCm = Math.max(parseFloat(cortina.alto) || 0, 100);
    const anchoM = anchoCm / 100;
    const altoM = altoCm / 100;

    const tela = precios.telas.find(t => t.id === cortina.telaSeleccionada);
    const sistema = precios.sistemas.find(s => s.id === cortina.sistemaSeleccionado);

    if (!tela || !sistema) return 0;

    const precioTela = anchoM * altoM * tela.precio;
    const precioSistema = anchoM * sistema.precio;
    const precioZocalo = cortina.zocaloForrado ? precios.adicionales.zocaloForrado * anchoM : 0;
    const precioPeso = cortina.conPeso ? precios.adicionales.pesoCadena : 0;

    const subtotal = precioTela + precioSistema + precioZocalo + precioPeso;
    const conPorcentaje = subtotal * (1 + porcentajeExtra / 100);

    return conPorcentaje;
  }, [precios, porcentajeExtra]);

  const calcularTotalGeneral = useCallback((): number => {
    return cortinas.reduce((total, cortina) => total + calcularTotalCortina(cortina), 0);
  }, [cortinas, calcularTotalCortina]);

  const validarCotizacion = useCallback((): { valido: boolean; mensaje?: string } => {
    const minMedida = 100;
    const maxAncho = 300;
    const maxAlto = 450;

    if (!cliente.nombre.trim()) {
      return { valido: false, mensaje: 'Por favor ingresa el nombre del cliente' };
    }
    if (!cliente.direccion.trim()) {
      return { valido: false, mensaje: 'Por favor ingresa la direccion del cliente' };
    }

    for (let i = 0; i < cortinas.length; i++) {
      const c = cortinas[i];
      if (!c.ancho || !c.alto || !c.telaSeleccionada || !c.sistemaSeleccionado) {
        return { valido: false, mensaje: `Completa todos los datos de la cortina ${i + 1}` };
      }

      const ancho = Number(c.ancho);
      const alto = Number(c.alto);
      if (!Number.isFinite(ancho) || !Number.isFinite(alto)) {
        return { valido: false, mensaje: `Medidas invalidas en la cortina ${i + 1}` };
      }
      if (ancho < minMedida || alto < minMedida) {
        return { valido: false, mensaje: `Las medidas minimas son ${minMedida}cm en la cortina ${i + 1}` };
      }
      if (ancho > maxAncho) {
        return { valido: false, mensaje: `El ancho maximo es ${maxAncho}cm en la cortina ${i + 1}` };
      }
      if (alto > maxAlto) {
        return { valido: false, mensaje: `El alto maximo es ${maxAlto}cm en la cortina ${i + 1}` };
      }
      if (!c.colorSeleccionado) {
        return { valido: false, mensaje: `Selecciona el color en la cortina ${i + 1}` };
      }
      if (!c.ladoMando) {
        return { valido: false, mensaje: `Selecciona el lado del mando en la cortina ${i + 1}` };
      }
      if (!c.caidaTela) {
        return { valido: false, mensaje: `Selecciona la caida de tela en la cortina ${i + 1}` };
      }
      if (c.telaSeleccionada && (!c.gramTelaSeleccionado || !c.aperturaSeleccionada)) {
        return { valido: false, mensaje: `Falta gramaje o apertura en la cortina ${i + 1}` };
      }
    }

    return { valido: true };
  }, [cliente, cortinas]);

  return {
    cliente,
    setCliente,
    cortinas,
    cortinaActiva,
    setCortinaActiva,
    agregarCortina,
    eliminarCortina,
    actualizarCortina,
    reemplazarCortina,
    calcularTotalCortina,
    calcularTotalGeneral,
    validarCotizacion,
    porcentajeExtra,
    setPorcentajeExtra
  };
};
